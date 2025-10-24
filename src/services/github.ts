// Helper function to handle API responses and errors
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    if (response.status === 404) {
      throw new Error('User or repository not found');
    } else if (response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    } else {
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
  }
  
  return response.json();
}

export { handleResponse };