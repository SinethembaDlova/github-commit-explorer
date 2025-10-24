// GitHub API service layer for making API calls
import type { Repository, Commit, CommitDetails } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

// Helper function to handle API responses and errors
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    if (response.status === 404) {
      throw new Error('User or repository not found');
    } else if (response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    } else {
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
  }
  
  return response.json();
}

// Fetch user's public repositories
export async function fetchUserRepositories(username: string): Promise<Repository[]> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`);
  return handleResponse<Repository[]>(response);
}

// Fetch commits for a specific repository with pagination
export async function fetchRepositoryCommits(
  username: string,
  repoName: string,
  page: number = 1,
  perPage: number = 10
): Promise<Commit[]> {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${username}/${repoName}/commits?page=${page}&per_page=${perPage}`
  );
  return handleResponse<Commit[]>(response);
}

// Fetch detailed information about a specific commit including file changes
export async function fetchCommitDetails(
  username: string,
  repoName: string,
  sha: string
): Promise<CommitDetails> {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${username}/${repoName}/commits/${sha}`
  );
  return handleResponse<CommitDetails>(response);
}