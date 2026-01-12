import React, { useState } from 'react';
import API from '../../../utils/api';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/users/forgot-password', { username, email });
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Ошибка сервера');
    }
  };

  return (
    <div>
      <h2>Восстановление пароля</h2>
      <form 
      onSubmit={handleForgotPassword}
      className="settings-container"
      >
        <div>
          <label>Логин</label>
          <input
            type="text"
            placeholder="Введите ваш логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Введите ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Восстановить пароль</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
