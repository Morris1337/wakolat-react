import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import prifileIcon from '../../profile-icon.svg'
import './passwordLog.scss'

Modal.setAppElement('#root'); // Укажите корневой элемент вашего приложения

const PasswordProtectedLink = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setPassword('');
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const checkPassword = () => {
    const correctPassword = 'mor'; // Замените на ваш пароль
    if (password === correctPassword) {
      closeModal();
      navigate('/admin');
    } else {
      setError('Неверный пароль');
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
            <h2>Enter Password</h2>
            <input
            type="password"
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