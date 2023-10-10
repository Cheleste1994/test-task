// pages/api/login.js

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Проведите аутентификацию пользователя здесь
    // Вместо этого примера, здесь должен быть код для проверки пользователя и генерации JWT токена

    // Если аутентификация успешна, отправьте токен
    const token = 'your_generated_jwt_token'; // Замените эту строку на генерацию вашего JWT токена
    res.status(200).json({ ok: true, token });
  } else {
    // Если метод запроса не POST, верните ошибку
    res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }
}
