const apiUrl = 'https://test-task.test211.workers.dev';

export const authorizationUser = async ({ method, email, password }) => {
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


export const handleImageOnServer = async (method, base64Image, token) => {
  const url = `${apiUrl}/account/image`;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'token-tt': token,
    },
    body: JSON.stringify({ image: base64Image }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Ошибка загрузки изображения: ${JSON.stringify(errorData)}`);
  }

  return response.json();
};
