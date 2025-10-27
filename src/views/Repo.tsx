import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github } from 'lucide-react';
import { useGitHubStore } from '../store/githubStore';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function RepoView() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const {
    repositories,
    commits,
    selectedRepo,
    fetchRepositories,
    fetchCommits,
    setSelectedRepo,
    loading,
  } = useGitHubStore();

  useEffect(() => {
    if (username) {
      fetchRepositories(username);
    }
  }, [username]);

  const handleSelectRepo = async (repo: any) => {
    setSelectedRepo(repo);
    if (username) await fetchCommits(username, repo.name, 1);
  };

  return (
    <div className="min-h-screen">
      <header className="border-b bg-card sticky top-0 z-10 p-4 flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <h1 className="text-lg font-semibold">{username}'s Repositories</h1>
      </header>

      <main className="grid grid-cols-2 gap-4 p-4">
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
                  <li
                    key={repo.id}
                    className="cursor-pointer hover:underline"
                    onClick={() => handleSelectRepo(repo)}
                  >
                    {repo.name}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commits</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedRepo ? (
              commits.length > 0 ? (
                <ul className="space-y-2">
                  {commits.map((commit) => (
                    <li key={commit.sha}>{commit.commit.message}</li>
                  ))}
                </ul>
              ) : (
                <p>No commits yet.</p>
              )
            ) : (
              <p>Select a repository to view commits.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
