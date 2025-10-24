export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  language: string | null;
}

export interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
  html_url: string;
}

export interface CommitFile {
  sha: string;
  filename: string;
  status: 'added' | 'removed' | 'modified' | 'renamed';
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
  blob_url: string;
  raw_url: string;
  previous_filename?: string;
}

export interface CommitDetails {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
  html_url: string;
  files: CommitFile[];
  stats: {
    total: number;
    additions: number;
    deletions: number;
  };
}

export interface FavoriteCommit {
  sha: string;
  message: string;
  author: string;
  date: string;
  repoName: string;
  username: string;
  avatarUrl?: string;
}

export type SortOrder = 'newest' | 'oldest';

export interface GitHubApiError {
  message: string;
  documentation_url?: string;
  status?: number;
}
