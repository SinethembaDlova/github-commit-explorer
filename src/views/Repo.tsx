import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github } from 'lucide-react';
import { useGitHubStore } from '../store/githubStore';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function RepoView() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const { repositories, fetchRepositories, loading } = useGitHubStore();

  useEffect(() => {
    if (username) {
      fetchRepositories(username);
    }
  }, [username]);

  return (
    <div className="min-h-screen">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="flex items-center gap-2 p-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold">{username}'s Repositories</h1>
        </div>
      </header>

      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Repositories</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul className="space-y-2">
                {repositories.map((repo) => (
                  <li key={repo.id} className="border-b pb-1">
                    {repo.name}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
