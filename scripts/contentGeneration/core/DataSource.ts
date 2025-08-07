import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { DataSourceConfig, RawContent } from './types';

export class DataSource {
  private config: DataSourceConfig;
  private tempDir?: string;

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
    const cloneCmd = this.config.token 
      ? `git clone --depth 1 --branch ${branch} https://${this.config.token}@${this.config.repo.replace('https://', '')} ${this.tempDir}`
      : `git clone --depth 1 --branch ${branch} ${this.config.repo} ${this.tempDir}`;

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
}