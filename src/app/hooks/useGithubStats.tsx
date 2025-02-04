// src/hooks/useGithubStats.ts
import { useState, useEffect } from 'react';

interface GithubStats {
  stars: number;
  forks: number;
  issues: number;
  lastFetched: number;
}

export function useGithubStats(owner: string, repo: string) {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const CACHE_KEY = `github_stats_${owner}_${repo}`;
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

        if (!response.ok) {
          throw new Error('Failed to fetch repository stats');
        }

        const data = await response.json();

        const newStats = {
          stars: data.stargazers_count,
          forks: data.forks_count,
          issues: data.open_issues_count,
          lastFetched: Date.now(),
        };

        localStorage.setItem(CACHE_KEY, JSON.stringify(newStats));
        setStats(newStats);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch stats');
        // Try to fall back to cached data even if fetch fails
        const cachedStats = localStorage.getItem(CACHE_KEY);
        if (cachedStats) {
          setStats(JSON.parse(cachedStats));
        }
      } finally {
        setLoading(false);
      }
    }

    // Try to get cached stats first
    const cachedStats = localStorage.getItem(CACHE_KEY);
    if (cachedStats) {
      const parsed = JSON.parse(cachedStats);
      if (Date.now() - parsed.lastFetched < CACHE_DURATION) {
        setStats(parsed);
        setLoading(false);
        return;
      }
    }

    // Fetch new stats if cache is missing or stale
    fetchStats();
  }, [owner, repo]);

  return { stats, loading, error };
}
