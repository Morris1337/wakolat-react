import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import prifileIcon from '../../profile-icon.svg';
import './passwordLog.scss';

Modal.setAppElement('#root'); // Укажите корневой элемент вашего приложения

const PasswordProtectedLink = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setLogin('');
    setPassword('');
    setError('');
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const checkPassword = async () => {
    try {
      console.log("Отправляю:", { username: login, password });
  
      const response = await fetch("https://myproject123.zapto.org/api/auth/login", {
        method: "POST", // ✅ обязательно POST!
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: login,
          password: password
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // если сервер возвращает token
        closeModal();
        navigate('/admin');
      } else {
        setError('Неверные логин или пароль');
      }
    } catch (error) {
      setError('Ошибка при отправке данных');
      console.error(error);
    }
  };
  
  

  return (
    <div>
      <img
        onClick={openModal}
        src={prifileIcon}
        alt="Logo"
        height={20}
        width={20}
        className="d-inline-block align-top"
      />
      <Modal
        className='modal-log'
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Password Modal"
      >
        <div className='value-log'>
          <h2>Enter Login and Password</h2>
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={handleLoginChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className='buttons'>
            <button onClick={checkPassword}>Submit</button>
            <button onClick={closeModal}>Close</button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </Modal>
    </div>
  );
};

export default PasswordProtectedLink;
