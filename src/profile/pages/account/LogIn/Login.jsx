import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../../../utils/api';
import { UserContext } from '../../../Context/UserContext';
import './login.scss'

const Login = ({ closeModal, redirectPath = '/account' }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useContext(UserContext); // ✅ Используем loginUser


    // Получаем путь, с которого пользователь был перенаправлен, или по умолчанию на "/account"
    // const redirectPath = location.state?.from || "/account";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await API.post('/users/login', { username, password });  
        const { token, role, id, minecraft_uuid } = response.data;

        loginUser(id, role, token, minecraft_uuid); // ✅ Обновляем UserContext без перезагрузки


        if (!token) {
          console.warn("⚠️ Сервер не отправил accessToken, но продолжаем...");
        }
        
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userId', id);
        localStorage.setItem('role', role);

      // Если пользователь пришел с определенной страницы — возвращаем его туда
      // Если нет — отправляем его в профиль
      const redirectPath = location.state?.from || `/account/profile/${id}`;

        navigate(redirectPath, { replace: true }); // ✅ Перенаправление после авторизации
        closeModal?.();
    } catch (err) {
        console.error('Ошибка при входе:', err.response?.data || err.message);
        alert('Не удалось войти. Проверьте логин и пароль.');
    }
};

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div>
      </div>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
         <button
          type="button"
          className="modal-close"
          onClick={() => closeModal?.()}
          aria-label="Close"
          style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '24px', lineHeight: 1 }}
        >
          ×
        </button>
        <h2>Ieeja kontā</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Lietotājvārds</label>
            <input
              type="text"
              placeholder="Введите логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Parole</label>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Ielogoties</button>
        </form>
        <p>Es aizmirsu savu paroli!{" "}
          <button
            onClick={() => {
              if (closeModal) closeModal(); // Закрываем модальное окно
              navigate('/forgotPassword'); // Переход на страницу восстановления пароля
            }}
            style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            Atjaunot paroli
          </button>
        </p>
        <p>
        Nav konta?{" "}
          <button
            onClick={() => {
              if (closeModal) closeModal(); // Закрываем модальное окно
              navigate('/register'); // Переход на страницу регистрации
            }}
            style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            Reģistrēties
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;