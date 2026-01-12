import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../../../../utils/api';

export default function Gym() {
  const [gymState, setGymState] = useState(null);
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGymState();
    fetchParticipants();
  }, []);

  const fetchGymState = async () => {
    try {
      const response = await API.get('/activities/gym-state');
      setGymState(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке состояния зала:', error);
    }
  };

  const toggleGymState = async () => {
    try {
      const newState = !gymState?.is_gym_open;
      const response = await API.post('/activities/toggle-gym', { isOpen: newState });
      setGymState(response.data.gym);
      alert(`Зал ${response.data.gym.is_gym_open ? 'открыт' : 'закрыт'}.`);
    } catch (error) {
      console.error('Ошибка при переключении состояния зала:', error);
      alert('Не удалось переключить состояние зала.');
    }
  };
  

  const fetchParticipants = async () => {
    try {
      const response = await API.get('/activities/gym-participants');
      setParticipants(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке посетителей зала:', error);
    }
  };

  const removeParticipant = async (userId) => {
    try {
      await API.post('/activities/remove-gym-participant', { userId });
      setParticipants(participants.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
      alert('Не удалось удалить пользователя.');
    }
  };

  return (
    <div className="gym-management">
      <h2>Управление залом</h2>
      <button onClick={toggleGymState}>
        {gymState?.is_gym_open ? 'Закрыть зал' : 'Открыть зал'}
      </button>
      <p>Зал сейчас: {gymState?.is_gym_open ? 'Открыт' : 'Закрыт'}</p>

      <h3>Текущие посетители:</h3>
      <ul>
        {participants.length > 0 ? (
          participants.map((user) => (
            <li key={user.id}>
              <img src={user.profile_picture} alt={user.username} width="30" height="30" />
              {user.username}
              <button onClick={() => removeParticipant(user.id)}>Удалить</button>
            </li>
          ))
        ) : (
          <p>Посетителей в зале нет.</p>
        )}
      </ul>
      <div>
            <h1>Aktivitātes</h1>

            {/* Добавляем кнопку перехода к печати QR-кода */}
            <button onClick={() => navigate('/account/qrCodeGym')} style={{ padding: '10px', fontSize: '16px' }}>
                📄 Открыть и распечатать QR-код
            </button>

            {/* Тут уже ваш код страницы */}
        </div>
    </div>
  );
}
