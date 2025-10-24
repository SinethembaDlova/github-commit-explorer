// Zustand store for managing GitHub app state (equivalent to Pinia in Vue)

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Repository, Commit, FavoriteCommit, SortOrder, GitHubStore } from '../types/github';
import * as githubApi from '../services/githubApi';

export const useGitHubStore = create<GitHubStore>()(
  persist(
    (set, get) => ({
      // Initial state
      repositories: [],
      commits: [],
      favorites: [],
      selectedRepo: null,
      selectedCommitDetails: null,
      currentPage: 1,
      hasMoreCommits: true,
      sortOrder: 'newest',
      loading: false,
      error: null,

      // Fetch user repositories from GitHub API
      fetchRepositories: async (username: string) => {
        set({ loading: true, error: null, repositories: [] });
        try {
          const repos = await githubApi.fetchUserRepositories(username);
          set({ repositories: repos, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch repositories',
            loading: false 
          });
        }
      },

      // Fetch commits for a specific repository with pagination
      fetchCommits: async (username: string, repoName: string, page: number = 1) => {
        set({ loading: true, error: null });
        try {
          const newCommits = await githubApi.fetchRepositoryCommits(username, repoName, page, 10);
          
          // If we get less than 10 commits, there are no more pages
          const hasMore = newCommits.length === 10;
          
          // If it's page 1, replace commits; otherwise append
          const commits = page === 1 ? newCommits : [...get().commits, ...newCommits];
          
          set({ 
            commits,
            currentPage: page,
            hasMoreCommits: hasMore,
            loading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch commits',
            loading: false 
          });
        }
      },

      // Fetch detailed commit information including file changes
      fetchCommitDetails: async (username: string, repoName: string, sha: string) => {
        set({ loading: true, error: null });
        try {
          const details = await githubApi.fetchCommitDetails(username, repoName, sha);
          set({ selectedCommitDetails: details, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch commit details',
            loading: false 
          });
        }
      },

      // Add a commit to favorites (stored in localStorage via persist middleware)
      addFavorite: (commit: Commit, repoName: string, username: string) => {
        const favorite: FavoriteCommit = {
          sha: commit.sha,
          message: commit.commit.message,
          author: commit.commit.author.name,
          date: commit.commit.author.date,
          repoName,
          username,
          avatarUrl: commit.author?.avatar_url,
        };
        
        const favorites = get().favorites;
        
        // Prevent duplicates
        if (!favorites.some(fav => fav.sha === commit.sha)) {
          set({ favorites: [...favorites, favorite] });
        }
      },

      // Remove a commit from favorites
      removeFavorite: (sha: string) => {
        set({ favorites: get().favorites.filter(fav => fav.sha !== sha) });
      },

      // Set the currently selected repository
      setSelectedRepo: (repo: Repository | null) => {
        set({ selectedRepo: repo });
      },

      // Set the sort order for commits (newest or oldest)
      setSortOrder: (order: SortOrder) => {
        set({ sortOrder: order });
      },

      // Clear any error messages
      clearError: () => {
        set({ error: null });
      },

      // Reset commits state (used when switching repos)
      resetCommits: () => {
        set({ commits: [], currentPage: 1, hasMoreCommits: true });
      },

      // Clear selected commit details
      clearSelectedCommitDetails: () => {
        set({ selectedCommitDetails: null });
      },
    }),
    {
      name: 'github-favorites-storage',
      // Only persist favorites, not the entire state
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
