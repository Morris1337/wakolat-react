import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// ✅ Функция-колбэк, чтобы передавать `logout` в `api.js`
let logoutCallback = () => {};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showReauthModal, setShowReauthModal] = useState(false); // Модальное окно
  const [password, setPassword] = useState(""); // Поле пароля

  const navigate = useNavigate();

  const login = (username, id, accessToken) => {
    setUser({ username, id });
    localStorage.setItem('user', JSON.stringify({ username, id }));
    localStorage.setItem('accessToken', accessToken);
    navigate(`/profile/${id}`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate('/login'); // ✅ Теперь корректно
  };

  // ✅ Устанавливаем `logout` как глобальную функцию
  useEffect(() => {
    logoutCallback = logout;
  }, []);

  React.useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      let token = localStorage.getItem("accessToken");

      try {
        await API.get("/test-token", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthenticated(true);
      } catch (err) {
        if (err.response?.status === 401) {
          try {
            console.log("Access token истёк. Обновляем...");
            setIsAuthenticated(true);
          } catch {
            console.error("Не удалось обновить токен.");
            setIsAuthenticated(false);
          }
        }
      }
    };

    checkAuth();
  }, []);

// ✅ Функция повторного входа
const reauthenticate = async () => {
  try {
    const response = await API.post("/users/relogin", { password });
    localStorage.setItem("accessToken", response.data.accessToken);
    setShowReauthModal(false); // Закрываем модальное окно
    setPassword(""); // Очищаем поле
  } catch (error) {
    alert("Ошибка повторной авторизации. Проверьте пароль.");
  }
};
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
      {/* ✅ Модальное окно повторной авторизации */}
      {showReauthModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Введите пароль</h2>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
            <button onClick={reauthenticate}>Подтвердить</button>
            <button onClick={() => setShowReauthModal(false)}>Отмена</button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

// ✅ Экспортируем `logoutCallback` для использования в `api.js`
export const getLogoutCallback = () => logoutCallback;