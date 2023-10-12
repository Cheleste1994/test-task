export const apiUrl = 'https://test-task.test211.workers.dev';

export const fetcher = (url) =>
  fetch(`${apiUrl}/account/image`, {
    headers: { 'token-tt': localStorage.getItem('token') },
  }).then((res) => res.json());

export const authorizationUser = async ({ url, email, password }) => {
  const response = await fetch(`${apiUrl}${url}`, {
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
};

export const sendImageOnServer = async (base64Image, token) => {
  const url = `${apiUrl}/account/image`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'token-tt': token,
    },
    body: JSON.stringify({ image: base64Image }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Ошибка загрузки изображения: ${JSON.stringify(errorData)}`
    );
  }

  return response.json();
};
