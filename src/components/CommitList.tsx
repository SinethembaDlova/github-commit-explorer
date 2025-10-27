// Component to display list of commits with sorting functionality

import { useMemo } from 'react';
import { GitCommit, Heart, Info, Calendar, User } from 'lucide-react';
import type { Commit, SortOrder } from '../types/github';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
interface CommitListProps {
  commits: Commit[];
  favoriteIds: Set<string>;
  sortOrder: SortOrder;
  onAddFavorite: (commit: Commit) => void;
  onRemoveFavorite: (sha: string) => void;
  onViewDetails: (commit: Commit) => void;
  onSortChange: (order: SortOrder) => void;
  onLoadMore?: () => void;
  hasMoreCommits: boolean;
  loading: boolean;
}

export default function CommitList({
  commits,
  favoriteIds,
  sortOrder,
  onAddFavorite,
  onRemoveFavorite,
  onViewDetails,
  onSortChange,
  onLoadMore,
  hasMoreCommits,
  loading,
}: CommitListProps) {
  // Sort commits based on selected order
  const sortedCommits = useMemo(() => {
    return [...commits].sort((a, b) => {
      const dateA = new Date(a.commit.author.date).getTime();
      const dateB = new Date(b.commit.author.date).getTime();
      
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [commits, sortOrder]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (commits.length === 0 && !loading) {
    return (
      <div className="text-center py-6 sm:py-8 text-muted-foreground text-xs sm:text-sm">
        No commits found for this repository
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Commits list */}
      <div className="space-y-2 sm:space-y-3">
        {sortedCommits.map((commit) => {
          const isFavorite = favoriteIds.has(commit.sha);
          
          return (
            <Card key={commit.sha} className="hover:border-primary/30 hover:bg-accent/50 hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2 sm:pb-3 p-2.5 sm:p-3 md:p-4">
                <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                  <Avatar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 shrink-0 border border-border/60">
                    <AvatarImage src={commit.author?.avatar_url} />
                    <AvatarFallback className="bg-muted">
                      <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] sm:text-xs md:text-sm mb-1 sm:mb-1.5 md:mb-2 break-words line-clamp-2 text-foreground leading-snug">
                      {commit.commit.message.split('\n')[0]}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">
                      <div className="flex items-center gap-0.5 sm:gap-1 min-w-0">
                        <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                        <span className="truncate max-w-[80px] sm:max-w-[100px] md:max-w-none">{commit.commit.author.name}</span>
                      </div>
                      <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                        <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">{formatDate(commit.commit.author.date)}</span>
                        <span className="sm:hidden">{new Date(commit.commit.author.date).toLocaleDateString()}</span>
                      </div>
                      <Badge variant="outline" className="text-[8px] sm:text-[9px] md:text-xs font-mono px-1 sm:px-1.5 md:px-2 py-0 sm:py-0.5 bg-muted/60 border-border">
                        {commit.sha.substring(0, 7)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 p-2.5 sm:p-3 md:p-4">
                <div className="flex gap-1.5 sm:gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(commit)}
                    className="flex-1 sm:flex-none h-7 sm:h-8 text-[10px] sm:text-xs md:text-sm hover:bg-accent px-2 sm:px-3"
                  >
                    <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 sm:mr-1" />
                    <span className="hidden sm:inline ml-0.5 sm:ml-1">View Details</span>
                    <span className="sm:hidden ml-0.5">Details</span>
                  </Button>
                  
                  <Button
                    variant={isFavorite ? "default" : "outline"}
                    size="sm"
                    onClick={() => isFavorite ? onRemoveFavorite(commit.sha) : onAddFavorite(commit)}
                    className={`flex-1 sm:flex-none h-7 sm:h-8 text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 ${!isFavorite ? 'hover:bg-accent' : ''}`}
                  >
                    <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 sm:mr-1 ${isFavorite ? 'fill-current' : ''}`} />
                    <span className="hidden sm:inline ml-0.5 sm:ml-1">{isFavorite ? 'Favorited' : 'Favorite'}</span>
                    <span className="sm:hidden ml-0.5">{isFavorite ? 'Saved' : 'Save'}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Load more button */}
      {hasMoreCommits && onLoadMore && (
        <div className="flex justify-center pt-1.5 sm:pt-2">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={loading}
            className="w-full sm:w-auto text-[11px] sm:text-xs md:text-sm h-8 sm:h-9 px-4 sm:px-6"
          >
            {loading ? 'Loading...' : 'Load More Commits'}
          </Button>
        </div>
      )}
    </div>
  );
}
