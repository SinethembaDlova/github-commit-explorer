// Component to display list of repositories

import { GitBranch, Star, Check } from 'lucide-react';
import type { Repository } from '../types/github';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

interface RepositoryListProps {
  repositories: Repository[];
  selectedRepo: Repository | null;
  onSelectRepo: (repo: Repository) => void;
}

export default function RepositoryList({ repositories, selectedRepo, onSelectRepo }: RepositoryListProps) {
  if (repositories.length === 0) {
    return (
      <div className="text-center py-6 sm:py-8 text-muted-foreground text-xs sm:text-sm">
        No repositories found for this user
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {repositories.map((repo) => (
        <Card
          key={repo.id}
          className={`cursor-pointer transition-all duration-200 overflow-hidden ${
            selectedRepo?.id === repo.id 
              ? 'border-primary/70 bg-primary/5 shadow-lg ring-2 ring-primary/20' 
              : 'hover:border-primary/30 hover:bg-accent/50 hover:shadow-md'
          }`}
          onClick={() => onSelectRepo(repo)}
        >
          <CardHeader className="pb-2 sm:pb-3 p-2.5 sm:p-3 md:p-4 relative">
            {selectedRepo?.id === repo.id && (
              <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 md:top-3 md:right-3">
                <div className="bg-primary text-primary-foreground rounded-full p-0.5 sm:p-1">
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                </div>
              </div>
            )}
            <div className="flex items-start justify-between gap-1.5 sm:gap-2 md:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 mb-0.5 sm:mb-1">
                  <GitBranch className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0 ${selectedRepo?.id === repo.id ? 'text-primary' : 'text-primary'}`} />
                  <h4 className={`text-xs sm:text-sm md:text-base break-words font-medium ${selectedRepo?.id === repo.id ? 'text-primary' : 'text-foreground'}`}>
                    {repo.name}
                  </h4>
                </div>
                {repo.description && (
                  <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground break-words line-clamp-2">
                    {repo.description}
                  </p>
                )}
              </div>
              {repo.stargazers_count > 0 && (
                <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs md:text-sm text-muted-foreground shrink-0 mr-5 sm:mr-6">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 fill-yellow-500/20 text-yellow-500" />
                  <span>{repo.stargazers_count}</span>
                </div>
              )}
            </div>
          </CardHeader>
          {(repo.language || selectedRepo?.id === repo.id) && (
            <CardContent className="pt-0 p-2.5 sm:p-3 md:p-4">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                {repo.language && (
                  <Badge variant="secondary" className="text-[10px] sm:text-xs font-medium px-1.5 sm:px-2.5">{repo.language}</Badge>
                )}
                {selectedRepo?.id === repo.id && (
                  <Badge variant="default" className="text-[10px] sm:text-xs font-medium bg-primary/20 text-primary border-primary/30 hover:bg-primary/20 px-1.5 sm:px-2.5">
                    Selected
                  </Badge>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
