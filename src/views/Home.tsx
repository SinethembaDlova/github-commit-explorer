import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';

export default function HomeView() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    navigate(`/repos/${username}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg p-6">
        <div className="text-center mb-6">
          <Github className="w-8 h-8 mx-auto mb-2" />
          <h1 className="text-2xl font-bold">GitHub Commit Explorer</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">GitHub Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g., octocat"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <Button type="submit" className="w-full">
            Explore Repositories
          </Button>
        </form>
      </Card>
    </div>
  );
}
