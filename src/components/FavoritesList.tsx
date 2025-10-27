// Component to display favorite commits

import { Heart, Trash2, Calendar, User, GitBranch } from 'lucide-react';
import type { FavoriteCommit } from '../types/github';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface FavoritesListProps {
  favorites: FavoriteCommit[];
  onRemoveFavorite: (sha: string) => void;
}

export default function FavoritesList({ favorites, onRemoveFavorite }: FavoritesListProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  if (favorites.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b bg-muted/50">
          <CardTitle className="text-sm sm:text-base md:text-lg tracking-tight">
            Favorite Commits
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
          <div className="text-center py-6 sm:py-8 md:py-12 text-muted-foreground">
            <div className="p-3 sm:p-4 bg-muted/50 rounded-full w-fit mx-auto mb-3 sm:mb-4">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-muted-foreground/60" />
            </div>
            <p className="text-xs sm:text-sm">No favorite commits yet</p>
            <p className="text-[10px] sm:text-xs mt-1">Mark commits as favorites to see them here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b bg-muted/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm sm:text-base md:text-lg tracking-tight">
            Favorite Commits
          </CardTitle>
          <Badge variant="secondary" className="ml-1.5 sm:ml-2 text-[10px] sm:text-xs px-1.5 sm:px-2.5">
            {favorites.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
        <ScrollArea className="h-[280px] sm:h-[350px] md:h-[400px] pr-2 sm:pr-3 md:pr-4">
          <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
            {favorites.map((favorite) => (
              <Card key={favorite.sha} className="hover:border-primary/30 hover:bg-accent/50 hover:shadow-md transition-all duration-200">
                <CardContent className="p-2.5 sm:p-3 md:p-4">
                  <div className="flex items-start justify-between gap-2 sm:gap-2.5 md:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] sm:text-xs md:text-sm mb-1 sm:mb-1.5 md:mb-2 break-words line-clamp-2 text-foreground leading-snug">
                        {favorite.message.split('\n')[0]}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">
                        <div className="flex items-center gap-0.5 sm:gap-1 min-w-0">
                          <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                          <span className="truncate max-w-[70px] sm:max-w-[80px] md:max-w-none">{favorite.author}</span>
                        </div>
                        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                          <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span className="hidden sm:inline">{formatDate(favorite.date)}</span>
                          <span className="sm:hidden">{new Date(favorite.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-0.5 sm:gap-1 min-w-0 hidden sm:flex">
                          <GitBranch className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                          <span className="truncate text-[9px] sm:text-[10px]">{favorite.repoName}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveFavorite(favorite.sha)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 p-0 transition-colors"
                    >
                      <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    </Button>
                  </div>
                  
                  <Badge variant="outline" className="text-[8px] sm:text-[9px] md:text-xs font-mono px-1 sm:px-1.5 md:px-2 py-0 sm:py-0.5 bg-muted/60 border-border">
                    {favorite.sha.substring(0, 7)}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
