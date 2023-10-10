import useSWR from 'swr';

const apiUrl = 'https://test-task.test211.workers.dev';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useUser() {
  const { data, error } = useSWR(`${apiUrl}/user`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export async function authorizationUser({ method, email, password }) {
  const response = await fetch(`${apiUrl}/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.errors);
  }

  const data = await response.json();
  return data;
}
