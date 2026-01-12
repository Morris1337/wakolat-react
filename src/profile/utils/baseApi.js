import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

const baseAPI = axios.create({
  baseURL: 'https://fc-server.zapto.org/',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// ✅ Перехватчик запросов: добавляет accessToken в заголовок
baseAPI.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  } else {
      console.warn('⚠️ Access token отсутствует.');
  }
  return config;
},
(error) => Promise.reject(error)
);

// ✅ Перехватчик ответов: если токен невалиден (401), разлогиниваем пользователя
baseAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error('❌ Access token недействителен. Требуется повторный вход.');
      // const { setShowReauthModal } = useAuth();
      // setShowReauthModal(true); // Открываем модальное окно      logout(); // ✅ Теперь корректно вызываем logout
      localStorage.removeItem('accessToken'); // Удаляем токен
      // window.location.href = '/account/login'; // Перенаправляем на страницу входа

    }

    return Promise.reject(error);
  }
);

export default baseAPI;
