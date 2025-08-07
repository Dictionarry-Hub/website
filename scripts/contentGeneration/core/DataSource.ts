import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { DataSourceConfig, RawContent, CommitLog, CommitInfo } from './types';

export class DataSource {
  private config: DataSourceConfig;
  private tempDir?: string;
  private commitLogCache: Map<string, CommitLog | null> = new Map();

  constructor(config: DataSourceConfig) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    if (this.config.type === 'github') {
      await this.cloneRepository();
    }
  }

  async cleanup(): Promise<void> {
    if (this.tempDir && fs.existsSync(this.tempDir)) {
      fs.rmSync(this.tempDir, { recursive: true, force: true });
    }
  }

  private async cloneRepository(): Promise<void> {
    if (!this.config.repo) {
      throw new Error('Repository URL is required for GitHub source');
    }

    const tempBase = this.config.cacheDir || '/tmp';
    this.tempDir = path.join(tempBase, `dictionarry-content-${Date.now()}`);
    
    if (this.config.cache && this.config.cacheDir && fs.existsSync(this.config.cacheDir)) {
      const cachedRepo = path.join(this.config.cacheDir, 'repo');
      if (fs.existsSync(cachedRepo)) {
        console.log('Using cached repository');
        this.tempDir = cachedRepo;
        
        execSync('git fetch', { 
          cwd: this.tempDir,
          stdio: this.config.verbose ? 'inherit' : 'pipe'
        });
        
        if (this.config.branch) {
          execSync(`git checkout ${this.config.branch}`, {
            cwd: this.tempDir,
            stdio: this.config.verbose ? 'inherit' : 'pipe'
          });
          execSync(`git pull origin ${this.config.branch}`, {
            cwd: this.tempDir,
            stdio: this.config.verbose ? 'inherit' : 'pipe'
          });
        }
        return;
      }
    }

    fs.mkdirSync(this.tempDir, { recursive: true });

    const branch = this.config.branch || 'main';
    // Clone with full history to get all commits
    const cloneCmd = this.config.token 
      ? `git clone --branch ${branch} https://${this.config.token}@${this.config.repo.replace('https://', '')} ${this.tempDir}`
      : `git clone --branch ${branch} ${this.config.repo} ${this.tempDir}`;

    console.log(`Cloning repository from ${this.config.repo} (branch: ${branch})`);
    
    execSync(cloneCmd, { 
      stdio: this.config.verbose ? 'inherit' : 'pipe',
      encoding: 'utf-8'
    });

    if (this.config.cache && this.config.cacheDir) {
      const cachedRepo = path.join(this.config.cacheDir, 'repo');
      fs.mkdirSync(this.config.cacheDir, { recursive: true });
      fs.renameSync(this.tempDir, cachedRepo);
      this.tempDir = cachedRepo;
    }
  }

  getBasePath(): string {
    if (this.config.type === 'local') {
      return this.config.localPath || './public/database';
    }
    // GitHub repos have content at root
    return this.tempDir || '';
  }

  async readFile(relativePath: string): Promise<RawContent | null> {
    const fullPath = path.join(this.getBasePath(), relativePath);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const stats = fs.statSync(fullPath);
      
      return {
        path: relativePath,
        content,
        stats: {
          size: stats.size,
          mtime: stats.mtime.toISOString()
        }
      };
    } catch (error) {
      console.warn(`Error reading file ${fullPath}:`, error);
      return null;
    }
  }

  async listFiles(directory: string, pattern?: RegExp): Promise<string[]> {
    const fullPath = path.join(this.getBasePath(), directory);
    
    if (!fs.existsSync(fullPath)) {
      return [];
    }

    try {
      const files = fs.readdirSync(fullPath);
      
      if (pattern) {
        return files.filter(file => pattern.test(file))
          .map(file => path.join(directory, file));
      }
      
      return files.map(file => path.join(directory, file));
    } catch (error) {
      console.warn(`Error listing directory ${fullPath}:`, error);
      return [];
    }
  }

  async exists(relativePath: string): Promise<boolean> {
    const fullPath = path.join(this.getBasePath(), relativePath);
    return fs.existsSync(fullPath);
  }

  async getFileCommitLog(relativePath: string, maxCommits: number = 1000): Promise<CommitLog | null> {
    // Check cache first
    const cacheKey = `${relativePath}-${maxCommits}`;
    if (this.commitLogCache.has(cacheKey)) {
      return this.commitLogCache.get(cacheKey) || null;
    }

    try {
      const basePath = this.getBasePath();
      const fullPath = path.join(basePath, relativePath);
      
      // Check if file exists
      if (!fs.existsSync(fullPath)) {
        this.commitLogCache.set(cacheKey, null);
        return null;
      }

      // Check if we're in a git repository
      const isGitRepo = fs.existsSync(path.join(basePath, '.git'));
      if (!isGitRepo) {
        // For local non-git sources, return null
        this.commitLogCache.set(cacheKey, null);
        return null;
      }

      // Get commit log with structured format (get all commits)
      const logFormat = '%H|%aI|%an|%s';
      const gitLogCommand = `git log --follow --format="${logFormat}" -- "${relativePath}"`;
      
      let logOutput: string;
      try {
        logOutput = execSync(gitLogCommand, {
          cwd: basePath,
          encoding: 'utf-8',
          stdio: 'pipe'
        }).trim();
      } catch (error) {
        // File might be new or have no commits
        this.commitLogCache.set(cacheKey, null);
        return null;
      }

      if (!logOutput) {
        this.commitLogCache.set(cacheKey, null);
        return null;
      }

      // Parse all commits
      const commits: CommitInfo[] = [];
      const lines = logOutput.split('\n').filter(line => line.trim());
      
      for (const line of lines) {
        const [hash, date, author, ...messageParts] = line.split('|');
        if (hash && date && author) {
          // Transform author names
          let authorName = author.trim();
          const lowerAuthor = authorName.toLowerCase();
          
          // Check for variations of Samuel/Sam Chau
          if (lowerAuthor.includes('samuel') || lowerAuthor.includes('sam')) {
            if (lowerAuthor.includes('chau')) {
              authorName = 'santiagosayshey';
            }
          }
          
          commits.push({
            hash: hash.trim(),
            date: date.trim(),
            author: authorName,
            message: messageParts.join('|').trim()
          });
        }
      }

      if (commits.length === 0) {
        this.commitLogCache.set(cacheKey, null);
        return null;
      }

      // Get total commit count
      let totalCommits = commits.length;
      try {
        const countCommand = `git rev-list --count --follow HEAD -- "${relativePath}"`;
        const countOutput = execSync(countCommand, {
          cwd: basePath,
          encoding: 'utf-8',
          stdio: 'pipe'
        }).trim();
        totalCommits = parseInt(countOutput, 10) || commits.length;
      } catch {
        // Use the count we have
      }

      // Get first commit if we need it
      let firstCommit: { date: string; hash: string } | undefined;
      if (totalCommits > commits.length) {
        try {
          const firstCommitCommand = `git log --follow --format="${logFormat}" --reverse -- "${relativePath}" | head -1`;
          const firstOutput = execSync(firstCommitCommand, {
            cwd: basePath,
            encoding: 'utf-8',
            stdio: 'pipe',
            shell: true
          }).trim();
          
          if (firstOutput) {
            const [hash, date] = firstOutput.split('|');
            if (hash && date) {
              firstCommit = {
                hash: hash.trim(),
                date: date.trim()
              };
            }
          }
        } catch {
          // Ignore errors getting first commit
        }
      }

      // Extract GitHub repo URL if available
      let repoUrl: string | undefined;
      let branch: string | undefined;
      
      if (this.config.type === 'github' && this.config.repo) {
        // Clean up the repo URL
        repoUrl = this.config.repo.replace('.git', '');
        if (!repoUrl.startsWith('http')) {
          repoUrl = `https://github.com/${repoUrl}`;
        }
        branch = this.config.branch || 'main';
      }
      
      const commitLog: CommitLog = {
        commits,
        totalCommits,
        firstCommit: firstCommit || (commits.length > 0 ? {
          date: commits[commits.length - 1].date,
          hash: commits[commits.length - 1].hash
        } : undefined),
        lastCommit: commits.length > 0 ? {
          date: commits[0].date,
          hash: commits[0].hash
        } : undefined,
        repoUrl,
        branch,
        filePath: relativePath
      };

      this.commitLogCache.set(cacheKey, commitLog);
      return commitLog;
    } catch (error: any) {
      console.warn(`Error getting commit log for ${relativePath}:`, error.message);
      this.commitLogCache.set(cacheKey, null);
      return null;
    }
  }

  // Batch fetch commit logs for multiple files
  async getFileCommitLogs(relativePaths: string[], maxCommits: number = 1000): Promise<Map<string, CommitLog | null>> {
    const results = new Map<string, CommitLog | null>();
    
    for (const path of relativePaths) {
      const commitLog = await this.getFileCommitLog(path, maxCommits);
      results.set(path, commitLog);
    }
    
    return results;
  }
}