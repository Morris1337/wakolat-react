import React, { useState, useEffect } from 'react';
import FighterCard from './FighterCard/FighterCard'; // Импорт вашего компонента
import FilterModal from './FilterModal';
import { useNavigate } from 'react-router-dom';

import './fighter.scss';

export default function Fighter() {
  const [authenticated, setAuthenticated] = useState(false);
  const [users, setUsers] = useState([]); // Данные пользователей
  const [error, setError] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]); // Отфильтрованные данные
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  // Фильтры
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');

  

  // Проверяем аутентификацию
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setAuthenticated(!!token); // Если токен есть, пользователь авторизован
  }, []);

  // Загружаем список пользователей
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://fc-server.zapto.org/api/users/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Ошибка загрузки: ${response.status}`);
        }

        const data = await response.json();
        console.log("📌 Данные пользователей:", data); // Проверяем, какие `nodarbibas` у всех

        // Какие роли нам нужны
        const allowedRoles = ['Athlete', 'Coach', 'Judge'];

        // Фильтрация пользователей по nodarbibas на фронте
        const filteredByRole = data.filter(user => {
          let nodarbibas = [];

          // Обычно с бэка для jsonb уже приходит массив
          if (Array.isArray(user.nodarbibas)) {
            nodarbibas = user.nodarbibas;
          } else if (typeof user.nodarbibas === 'string') {
            // На всякий случай, если придёт строкой
            try {
              nodarbibas = JSON.parse(user.nodarbibas);
            } catch (e) {
              console.warn('Невозможно распарсить nodarbibas у пользователя', user.id, user.nodarbibas);
              nodarbibas = [];
            }
          }

          // Оставляем только тех, у кого есть хотя бы одна из ролей
          return nodarbibas.some(item => allowedRoles.includes(item));
        });

        console.log('✅ Пользователи после фильтрации по роли:', filteredByRole);

        // В стейте храним уже ОТФИЛЬТРОВАННЫХ пользователей
        setUsers(filteredByRole);
        // И сразу сортируем их по активности
        setFilteredUsers(
          [...filteredByRole].sort((a, b) => b.activity_rate - a.activity_rate)
        );

      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Не удалось загрузить список пользователей.');
      }
    };

    fetchUsers();
  }, []);

  // Функция фильтрации
  // Функция фильтрации
  const applyFilters = () => {
    let updatedUsers = [...users];
  
    // Фильтрация по дисциплинам
    if (selectedDisciplines.length > 0) {
      updatedUsers = updatedUsers.filter(user => {
        const userDisciplines = user.nodarbibas || []; // Используем `nodarbibas`
  
        return userDisciplines.some(d =>
          selectedDisciplines.some(selected => d.toLowerCase() === selected.toLowerCase())
        );
      });
    }
  
    // Фильтрация по весу
    if (minWeight) updatedUsers = updatedUsers.filter(user => parseFloat(user.weight) >= minWeight);
    if (maxWeight) updatedUsers = updatedUsers.filter(user => parseFloat(user.weight) <= maxWeight);
  
    // Применяем сортировку по рейтингу
    setFilteredUsers(updatedUsers);
  };
  
  


  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setAuthenticated(false);
  };
  return (
    <div className="fighter-category-container">
      {!authenticated ? (
        <div>
          <p>Lai piekļūtu informācijai, ir jāielogojas
          .</p>
        </div>
      ) : (
        <div>
          <h2>Reģistrēto lietotāju saraksts</h2>
          <button onClick={() => setIsFilterModalOpen(true)}>Фильтр</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {filteredUsers.length === 0 ? (
            <p>Nav reģistrētu lietotāju.</p>
          ) : (
            <div className="fighter-card-block">
              {filteredUsers.map((fighter, index) => (
                <FighterCard
                  key={index}
                  id={fighter.id}
                  img={fighter.img}
                  fighter={fighter.first_name + ' ' + fighter.last_name}
                  discipline={fighter.discipline}
                  activityRate={fighter.activity_rate}
                  wight={fighter.weight}
                  role={fighter.role}
                  fighterClass={fighter.class}
                  club={fighter.club} // ← добавь
                  nodarbibas={fighter.nodarbibas}
                />
              ))}
            </div>
          )}
        </div>
      )}
     {/* Модальное окно для фильтра */}
     {isFilterModalOpen && (
      <FilterModal
        onClose={() => setIsFilterModalOpen(false)}
        selectedDisciplines={selectedDisciplines}
        setSelectedDisciplines={setSelectedDisciplines}
        minWeight={minWeight}
        setMinWeight={setMinWeight}
        maxWeight={maxWeight}
        setMaxWeight={setMaxWeight}
        applyFilters={applyFilters}
      />
    )}
        </div>
  );
}
