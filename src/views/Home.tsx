import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';

export default function HomeView() {
  // State Management
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validation Logic
  const validateUsername = (value: string): boolean => {
    if (!value.trim()) {
      setError('Username is required');
      return false;
    }
    const usernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
    if (!usernameRegex.test(value)) {
      setError('Invalid GitHub username format');
      return false;
    }
    if (value.length > 39) {
      setError('Username must be 39 characters or less');
      return false;
    }
    setError('');
    return true;
  };

  // Form Handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateUsername(username)) {
      navigate(`/repos/${username}`);
    }
  };

  // UI Rendering
  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardContent className="pt-6 pb-5 sm:pt-8 sm:pb-6 px-4 sm:px-6">
            {/*Header Section*/}
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="p-2.5 sm:p-3 bg-primary rounded-xl shadow-lg">
                  <Github className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl tracking-tight mb-1.5 sm:mb-2">
                GitHub Commit Explorer
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Enter a GitHub username to explore their repositories and commits
              </p>
            </div>

            {/*Form Section*/}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">
                  GitHub Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="e.g., octocat"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError('');
                  }}
                  className={error ? 'border-destructive focus-visible:ring-destructive' : ''}
                />
                {error && <p className="text-sm text-destructive font-medium">{error}</p>}
              </div>

              <Button type="submit" className="w-full">
                Explore Repositories
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
