import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, AlertCircle } from 'lucide-react';
import { useGitHubStore } from '../store/githubStore';
import RepositoryList from '../components/RepositoryList';
import CommitList from '../components/CommitList';
import FavoritesList from '../components/FavoritesList';
import CommitDetails from '../components/CommitDetails';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Skeleton } from '../components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import type { SortOrder } from '../types/github';

export default function RepoView() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  
  // Zustand store state and actions
  const {
    repositories,
    commits,
    favorites,
    selectedRepo,
    selectedCommitDetails,
    currentPage,
    hasMoreCommits,
    sortOrder,
    loading,
    error,
    fetchRepositories,
    fetchCommits,
    fetchCommitDetails,
    addFavorite,
    removeFavorite,
    setSelectedRepo,
    setSortOrder,
    clearError,
    resetCommits,
    clearSelectedCommitDetails,
  } = useGitHubStore();

  // Fetch repositories when component mounts or username changes
  useEffect(() => {
    if (username) {
      fetchRepositories(username);
      resetCommits();
      setSelectedRepo(null);
    }
  }, [username]);

  // Handle repository selection
  const handleSelectRepo = async (repo: typeof selectedRepo) => {
    if (repo && username) {
      setSelectedRepo(repo);
      resetCommits();
      await fetchCommits(username, repo.name, 1);
    }
  };

  // Handle viewing commit details
  const handleViewDetails = async (commit: typeof commits[0]) => {
    if (username && selectedRepo) {
      await fetchCommitDetails(username, selectedRepo.name, commit.sha);
    }
  };

  // Handle adding commit to favorites
  const handleAddFavorite = (commit: typeof commits[0]) => {
    if (selectedRepo && username) {
      addFavorite(commit, selectedRepo.name, username);
    }
  };

  // Handle loading more commits (pagination)
  const handleLoadMore = () => {
    if (username && selectedRepo && !loading) {
      fetchCommits(username, selectedRepo.name, currentPage + 1);
    }
  };

  // Create a set of favorite commit SHAs for quick lookup
  const favoriteIds = useMemo(() => {
    return new Set(favorites.map(fav => fav.sha));
  }, [favorites]);

  // Loading skeleton for repositories
  const renderRepositorySkeleton = () => (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
        </Card>
      ))}
    </div>
  );

  // Loading skeleton for commits
  const renderCommitSkeleton = () => (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-md border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="hover:bg-accent px-2 sm:px-3"
            >
              <ArrowLeft className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline text-sm">Back</span>
            </Button>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
                <Github className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-base md:text-lg lg:text-xl truncate tracking-tight">
                  {username}'s Repositories
                </h1>
                <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">
                  Explore commits and manage favorites
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
        {/* Error alert */}
        {error && (
          <Alert variant="destructive" className="mb-3 sm:mb-4 md:mb-6">
            <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="text-xs sm:text-sm">{error}</span>
              <Button variant="ghost" size="sm" onClick={clearError} className="shrink-0 text-xs sm:text-sm h-7 sm:h-8">
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-6">
          {/* Left column - Repositories */}
          <div className="md:col-span-2 lg:col-span-3">
            <Card className="shadow-lg">
              <CardHeader className="border-b bg-muted/50 px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                <CardTitle className="text-sm sm:text-base md:text-lg tracking-tight">Repositories</CardTitle>
              </CardHeader>
              <CardContent className="pt-3 sm:pt-4 px-3 sm:px-4 md:px-6">
                {loading && repositories.length === 0 ? (
                  renderRepositorySkeleton()
                ) : (
                  <RepositoryList
                    repositories={repositories}
                    selectedRepo={selectedRepo}
                    onSelectRepo={handleSelectRepo}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Middle column - Commits */}
          <div className="md:col-span-2 lg:col-span-5">
            <Card className="shadow-lg">
              <CardHeader className="border-b bg-muted/50 px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <CardTitle className="text-sm sm:text-base md:text-lg truncate tracking-tight">
                      {selectedRepo ? `Commits - ${selectedRepo.name}` : 'Commits'}
                    </CardTitle>
                    {selectedRepo && commits.length > 0 && (
                      <Badge variant="secondary" className="shrink-0 px-1.5 sm:px-2.5 py-0.5 text-[10px] sm:text-xs">
                        {commits.length}
                      </Badge>
                    )}
                  </div>
                  {selectedRepo && commits.length > 0 && (
                    <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
                      <SelectTrigger className="w-[100px] sm:w-[110px] md:w-[140px] h-7 sm:h-8 text-[10px] sm:text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest" className="text-xs sm:text-sm">Newest First</SelectItem>
                        <SelectItem value="oldest" className="text-xs sm:text-sm">Oldest First</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-3 sm:pt-4 px-3 sm:px-4 md:px-6">
                {!selectedRepo ? (
                  <div className="text-center py-8 sm:py-12 md:py-16 text-muted-foreground">
                    <div className="p-3 sm:p-4 bg-muted/50 rounded-full w-fit mx-auto mb-3 sm:mb-4">
                      <Github className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-muted-foreground/60" />
                    </div>
                    <p className="text-xs sm:text-sm md:text-base">Select a repository to view commits</p>
                  </div>
                ) : loading && commits.length === 0 ? (
                  renderCommitSkeleton()
                ) : (
                  <CommitList
                    commits={commits}
                    favoriteIds={favoriteIds}
                    sortOrder={sortOrder}
                    onAddFavorite={handleAddFavorite}
                    onRemoveFavorite={removeFavorite}
                    onViewDetails={handleViewDetails}
                    onLoadMore={handleLoadMore}
                    hasMoreCommits={hasMoreCommits}
                    loading={loading}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right column - Favorites */}
          <div className="md:col-span-2 lg:col-span-4">
            <FavoritesList
              favorites={favorites}
              onRemoveFavorite={removeFavorite}
            />
          </div>
        </div>
      </main>

      {/* Commit details modal */}
      {selectedCommitDetails && (
        <CommitDetails
          commitDetails={selectedCommitDetails}
          onClose={clearSelectedCommitDetails}
        />
      )}
    </div>
  );
}
