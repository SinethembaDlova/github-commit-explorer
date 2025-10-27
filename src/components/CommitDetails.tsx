// Component to display detailed commit information with file diffs

import { X, FileText, FilePlus, FileMinus, FileEdit, Plus, Minus } from 'lucide-react';
import type { CommitDetails as CommitDetailsType } from '../types/github';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface CommitDetailsProps {
  commitDetails: CommitDetailsType;
  onClose: () => void;
}

export default function CommitDetails({ commitDetails, onClose }: CommitDetailsProps) {
  // Get icon for file status
  const getFileIcon = (status: string) => {
    switch (status) {
      case 'added':
        return <FilePlus className="w-4 h-4 text-green-500" />;
      case 'removed':
        return <FileMinus className="w-4 h-4 text-red-500" />;
      case 'modified':
        return <FileEdit className="w-4 h-4 text-blue-500" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  // Get badge color for file status
  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      added: 'bg-green-500/10 text-green-500 border-green-500/30',
      removed: 'bg-red-500/10 text-red-500 border-red-500/30',
      modified: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
      renamed: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    };
    
    return (
      <Badge variant="outline" className={colors[status] || ''}>
        {status}
      </Badge>
    );
  };

  // Format date
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

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-3 md:p-4 z-50" onClick={onClose}>
      <Card className="w-full max-w-4xl max-h-[96vh] sm:max-h-[94vh] md:max-h-[90vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="flex-shrink-0 p-3 sm:p-4 md:p-6 border-b">
          <div className="flex items-start justify-between gap-2 sm:gap-3 md:gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="mb-1.5 sm:mb-2 break-words text-sm sm:text-base md:text-lg text-foreground leading-snug">
                {commitDetails.commit.message.split('\n')[0]}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                <span className="truncate max-w-[100px] sm:max-w-[120px] md:max-w-none">{commitDetails.commit.author.name}</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">{formatDate(commitDetails.commit.author.date)}</span>
                <span className="sm:hidden text-[9px]">{new Date(commitDetails.commit.author.date).toLocaleDateString()}</span>
                <span className="hidden sm:inline">•</span>
                <Badge variant="outline" className="font-mono text-[8px] sm:text-[10px] md:text-xs bg-muted/60 border-border px-1 sm:px-1.5 md:px-2 py-0 sm:py-0.5">
                  {commitDetails.sha.substring(0, 7)}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="shrink-0 h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 p-0 hover:bg-accent">
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </CardHeader>

        <Separator />

        {/* Commit stats */}
        <CardContent className="pt-2.5 pb-2.5 sm:pt-3 sm:pb-3 md:pt-4 md:pb-4 flex-shrink-0 px-3 sm:px-4 md:px-6 bg-muted/30">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-4 text-center">
            <div className="p-2 sm:p-2.5 md:p-3 rounded-lg bg-background border shadow-sm">
              <div className="text-lg sm:text-xl md:text-2xl mb-0.5 sm:mb-1 text-foreground font-semibold">{commitDetails.files.length}</div>
              <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Files Changed</div>
            </div>
            <div className="p-2 sm:p-2.5 md:p-3 rounded-lg bg-background border shadow-sm">
              <div className="text-lg sm:text-xl md:text-2xl text-green-500 mb-0.5 sm:mb-1 flex items-center justify-center gap-0.5 sm:gap-1 font-semibold">
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                {commitDetails.stats.additions}
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Additions</div>
            </div>
            <div className="p-2 sm:p-2.5 md:p-3 rounded-lg bg-background border shadow-sm">
              <div className="text-lg sm:text-xl md:text-2xl text-red-500 mb-0.5 sm:mb-1 flex items-center justify-center gap-0.5 sm:gap-1 font-semibold">
                <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                {commitDetails.stats.deletions}
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Deletions</div>
            </div>
          </div>
        </CardContent>

        <Separator />

        {/* Files changed */}
        <CardContent className="flex-1 overflow-hidden pt-2.5 sm:pt-3 md:pt-4 px-3 sm:px-4 md:px-6">
          <h3 className="mb-2 sm:mb-2.5 md:mb-3 text-xs sm:text-sm md:text-base font-semibold text-foreground">Files Changed</h3>
          <ScrollArea className="h-full">
            <div className="space-y-2 sm:space-y-2.5 md:space-y-3 pr-2 sm:pr-3 md:pr-4">
              {commitDetails.files.map((file, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-2.5 sm:p-3 md:p-4">
                    <div className="flex items-start gap-1.5 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2">
                      <div className="shrink-0">{getFileIcon(file.status)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-1.5 sm:mb-2">
                          <code className="text-[10px] sm:text-xs md:text-sm break-all text-foreground bg-muted/50 px-1.5 sm:px-2 py-0.5 rounded leading-tight">{file.filename}</code>
                          {getStatusBadge(file.status)}
                        </div>
                        
                        {file.previous_filename && file.status === 'renamed' && (
                          <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground mb-1.5 sm:mb-2">
                            Renamed from: <code className="bg-muted/50 px-1 sm:px-1.5 py-0.5 rounded">{file.previous_filename}</code>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 text-[9px] sm:text-[10px] md:text-xs">
                          <span className="text-green-500 flex items-center gap-0.5 sm:gap-1 font-medium">
                            <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            {file.additions}
                          </span>
                          <span className="text-red-500 flex items-center gap-0.5 sm:gap-1 font-medium">
                            <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            {file.deletions}
                          </span>
                          <span className="text-muted-foreground hidden sm:inline">
                            {file.changes} change{file.changes !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Show patch/diff if available */}
                    {file.patch && (
                      <div className="mt-2 sm:mt-2.5 md:mt-3">
                        <ScrollArea className="h-[100px] sm:h-[120px] md:h-[150px] rounded border bg-muted/30">
                          <pre className="p-1.5 sm:p-2 md:p-3 text-[9px] sm:text-[10px] md:text-xs font-mono overflow-x-auto">
                            {file.patch.split('\n').map((line, i) => {
                              let lineClass = '';
                              if (line.startsWith('+') && !line.startsWith('+++')) {
                                lineClass = 'text-green-400 bg-green-500/10';
                              } else if (line.startsWith('-') && !line.startsWith('---')) {
                                lineClass = 'text-red-400 bg-red-500/10';
                              } else if (line.startsWith('@@')) {
                                lineClass = 'text-blue-400 bg-blue-500/10 font-medium';
                              } else {
                                lineClass = 'text-muted-foreground';
                              }
                              
                              return (
                                <div key={i} className={lineClass}>
                                  {line || ' '}
                                </div>
                              );
                            })}
                          </pre>
                        </ScrollArea>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
