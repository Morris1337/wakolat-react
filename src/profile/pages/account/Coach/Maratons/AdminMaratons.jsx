import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../../../utils/api';

export default function AdminMaratons() {
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [streamTitle, setStreamTitle] = useState('');
    const [recordingUrl, setRecordingUrl] = useState('');
    const [dailyTasks, setDailyTasks] = useState([{ task: '', amount: '', unit: 'раз' }]);
    const [fetchedTasks, setFetchedTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState({});    
    const [recordingTitle, setRecordingTitle] = useState('');
    const [publishAt, setPublishAt] = useState('');
    const [meals, setMeals] = useState({
      breakfast: [{ name: '', weight: '' }],
      lunch: [{ name: '', weight: '' }],
      dinner: [{ name: '', weight: '' }],
      snack: [{ name: '', weight: '' }], // Новый прием пищи
    });
    
  
    const handleStreamSubmit = async () => {
      try {
        await API.post('/marathons/stream', { bunny_url: youtubeUrl, title: streamTitle });
        alert('Трансляция опубликована');
        setYoutubeUrl('');
        setStreamTitle('');
      } catch (error) {
        console.error('Ошибка при публикации трансляции:', error);
      }
    };
  
    const handleRecordingSubmit = async () => {
      try {
        await API.post('/marathons/recording', { bunny_url: recordingUrl, title: recordingTitle, publish_at: publishAt});
        alert('Запись тренировки добавлена');
        setRecordingUrl('');
        setRecordingTitle('');
        setPublishAt('');
      } catch (error) {
        console.error('Ошибка при публикации записи:', error);
      }
    };
  
    const handleMealSubmit = async () => {
      try {
        const mealData = {
          id: Number(new Date().getTime()), // Преобразуем в число
          publish_at: publishAt,
          meals,
        };
    
        console.log("📌 Отправка данных на сервер:", mealData);
    
        await API.post('/marathons/meal', mealData);
    
        alert('Питание опубликовано');
        setMeals({
          breakfast: [{ name: '', weight: '' }],
          lunch: [{ name: '', weight: '' }],
          dinner: [{ name: '', weight: '' }],
          snack: [{ name: '', weight: '' }], // Полдник
        });
        setPublishAt('');
      } catch (error) {
        console.error('❌ Ошибка при публикации питания:', error.response?.data || error);
      }
    };
    
  
    const addMealField = (mealType) => {
      setMeals({ ...meals, [mealType]: [...meals[mealType], { name: '', weight: '' }] });
    };
  
    const updateMealField = (mealType, index, field, value) => {
      const updatedMeals = meals[mealType].map((meal, i) => (
        i === index ? { ...meal, [field]: value } : meal
      ));
      setMeals({ ...meals, [mealType]: updatedMeals });
    };

    const addTaskField = () => {
      setDailyTasks([...dailyTasks, { task: '', amount: '', unit: 'раз' }]);
  };

  const fetchDailyTasks = async () => {
    try {
        const response = await API.get('/marathons/daily-tasks');
        setFetchedTasks(response.data);
    } catch (error) {
        console.error('Ошибка при получении заданий:', error);
    }
};

const updateTaskField = (index, field, value) => {
    const updatedTasks = dailyTasks.map((task, i) => (
        i === index ? { ...task, [field]: value } : task
    ));
    setDailyTasks(updatedTasks);
};

const handleTaskSubmit = async () => {
    try {
        await API.post('/marathons/daily-task', { 
          tasks: dailyTasks, 
          publish_at: publishAt
        });
        alert('Задания опубликованы!');
        setDailyTasks([{ task: '', amount: '', unit: 'раз' }]);
        fetchDailyTasks();
        setPublishAt('');
    } catch (error) {
        console.error('Ошибка при публикации заданий:', error);
    }
};

const toggleTaskCompletion = (index) => {
    setCompletedTasks(prev => ({
        ...prev,
        [index]: !prev[index]
    }));
};
  
    return (
      <>
        <div>
          <h2>Трансляция</h2>
          <input type="text" placeholder='Название' value={streamTitle} onChange={(e) => setStreamTitle(e.target.value)} />
          <input type="text" placeholder='Ссылка на YouTube' value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} />
          <button onClick={handleStreamSubmit}>Опубликовать</button>
        </div>
        
        <div>
          <h2>Записи тренировок</h2>
          <input type="text" placeholder='Название' value={recordingTitle} onChange={(e) => setRecordingTitle(e.target.value)} />
          <input type="text" placeholder='Ссылка на запись' value={recordingUrl} onChange={(e) => setRecordingUrl(e.target.value)} />
          <input type="datetime-local" value={publishAt} onChange={(e) => setPublishAt(e.target.value)} />
          <button onClick={handleRecordingSubmit}>Опубликовать</button>
        </div>
        
        <div>
          <h2>Питание</h2>
          {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
            <div key={mealType}>
              <h3>
                {mealType === 'breakfast' ? 'Завтрак' :
                mealType === 'lunch' ? 'Обед' :
                mealType === 'dinner' ? 'Ужин' :
                'Полдник'}
              </h3>
              {meals[mealType].map((meal, index) => (
                <div key={index}>
                  <input type="text" placeholder='Блюдо' value={meal.name} onChange={(e) => updateMealField(mealType, index, 'name', e.target.value)} />
                  <input type="number" placeholder='Грамм' value={meal.weight} onChange={(e) => updateMealField(mealType, index, 'weight', e.target.value)} />
                </div>
              ))}
              <button onClick={() => addMealField(mealType)}>Добавить блюдо</button>
            </div>
          ))}
          <input type="datetime-local" value={publishAt} onChange={(e) => setPublishAt(e.target.value)} />
          <button onClick={handleMealSubmit}>Опубликовать</button>
        </div>
        <div>
            <h2>Ежедневные задания</h2>
            {dailyTasks.map((task, index) => (
                <div key={index}>
                    <input type="text" placeholder='Задание' value={task.task} onChange={(e) => updateTaskField(index, 'task', e.target.value)} />
                    <input type="number" placeholder='Количество' value={task.amount} onChange={(e) => updateTaskField(index, 'amount', e.target.value)} />
                    <select value={task.unit} onChange={(e) => updateTaskField(index, 'unit', e.target.value)}>
                        <option value="раз">Раз</option>
                        <option value="часов">Часов</option>
                        <option value="минут">Минут</option>
                        <option value="секунд">Секунд</option>
                    </select>
                </div>
            ))}
            <button onClick={addTaskField}>Добавить задание</button>
            <input type="datetime-local" value={publishAt} onChange={(e) => setPublishAt(e.target.value)} />
            <button onClick={handleTaskSubmit}>Опубликовать задания</button>

            {/* <h2>Опубликованные задания</h2>
            {fetchedTasks.length > 0 ? (
                fetchedTasks.map((task, index) => (
                    <div key={index}>
                        <p>{task.task} - {task.amount} {task.unit}</p>
                        <input type="checkbox" checked={!!completedTasks[index]} onChange={() => toggleTaskCompletion(index)} />
                    </div>
                ))
            ) : (
                <p>Нет опубликованных заданий</p>
            )} */}
        </div>
      </>
    );
  }
  