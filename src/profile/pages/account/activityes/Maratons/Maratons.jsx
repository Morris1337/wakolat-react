import React, { useState, useEffect } from 'react';
import API from '../../../../utils/api';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css'; // Подключаем стили Plyr
import './maratons.scss'
import { useContext } from 'react';
import { UserContext } from '../../../../Context/UserContext.js';
import YoutubeStream from './YoutubeStream.jsx';

export default function Maratons() {
  const { user } = useContext(UserContext);
  const userId = user?.id; // Если user не загружен, избежать ошибки

  const [streams, setStreams] = useState([]);
  const [streamUrl, setStreamUrl] = useState("");

  const [recordings, setRecordings] = useState([]);
  const [meals, setMeals] = useState([]);
  const [activeTab, setActiveTab] = useState('streams');
  const [dailyTasks, setDailyTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem("completedTasks");
    return saved ? JSON.parse(saved) : {};
});
  const filterByTime = (items) => {
    const now = new Date();
    return items.filter(item => item.publish_at && new Date(item.publish_at) <= now);
  };

  useEffect(() => {
    setStreamUrl("https://www.youtube.com/embed/live_stream?channel=UCZo0FXzlnMcSSa1XDvpG3NQ");
}, []);

  useEffect(() => {
    fetchDailyTasks();
    fetchData();
    // const interval = setInterval(fetchData, 30000); // Автообновление каждые 30 секунд

    // return () => clearInterval(interval);
}, []);

useEffect(() => {
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}, [completedTasks]);


const fetchData = async () => {
  try {
    // const streamResponse = await API.get('/marathons/streams');
    const recordingResponse = await API.get('/marathons/recordings');
    const mealResponse = await API.get('/marathons/meals');
    const taskResponse = await API.get('/marathons/daily-tasks');

    // setStreams((streamResponse.data));
    console.log("Полученные данные о питании:", mealResponse.data);
    
    setRecordings((recordingResponse.data));
    setMeals((mealResponse.data));
    setDailyTasks((taskResponse.data));
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
};


  const isYouTubeUrl = (url) => url.includes('youtube.com') || url.includes('youtu.be');
  
//   const getEmbedUrl = (youtubeUrl) => {
//     const url = new URL(youtubeUrl);
//     const videoId = url.searchParams.get("v") || youtubeUrl.split('/').pop();
//     return `https://www.youtube-nocookie.com/embed/${videoId}?playsinline=1&controls=1&modestbranding=1&rel=0&fs=0&showinfo=0&iv_load_policy=3&disablekb=1`;
//   };

const getEmbedUrl = (url) => {
    if (url.includes('youtu.be')) {
      const videoId = url.split('/').pop();
      return `https://www.youtube-nocookie.com/embed/${videoId}`;
    } else {
      const videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube-nocookie.com/embed/${videoId}`;
    }
  };

  const playVideo = (id) => {
    const iframe = document.getElementById(`video-${id}`).contentWindow;
    iframe.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  };

  const fetchDailyTasks = async () => {
    try {
        const response = await API.get('/marathons/daily-tasks');
        setDailyTasks(filterByTime(response.data));

        // setDailyTasks(response.data);
    } catch (error) {
        console.error('Ошибка при получении ежедневных заданий:', error);
    }
};

const toggleTaskCompletion = async (taskId) => {
  if (!userId) {
      console.error("Ошибка: userId не найден");
      return;
  }

  try {
      // Отправляем запрос на сервер
      const response = await API.post('/marathons/complete-task', { 
          user_id: userId, 
          task_id: taskId 
      });

      if (response.status === 200) {
          setCompletedTasks(prev => ({
              ...prev,
              [taskId]: !prev[taskId]
          }));
      } else {
          console.error("Ошибка при отметке выполнения задания:", response.data);
      }
  } catch (error) {
      console.error("Ошибка при отметке выполнения задания:", error);
  }
};


const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};

const groupedTasks = dailyTasks.reduce((acc, task) => {
  const date = formatDate(task.publish_at);
  if (!acc[date]) acc[date] = [];
  acc[date].push(task);
  return acc;
}, {});

useEffect(() => {
  const fetchCompletedTasks = async () => {
      const userId = localStorage.getItem("userId"); // Или получи его из `context`
      if (!userId) return console.error("userId не найден");

      try {
          const response = await API.get(`/marathons/completed-tasks?user_id=${userId}`);
          setCompletedTasks(Object.fromEntries(response.data.map(task => [task.task_id, {
              completedAt: task.completed_at,
              firstName: task.first_name,
              lastName: task.last_name
          }])));
      } catch (error) {
          console.error('Ошибка при загрузке выполненных задач:', error);
      }
  };

  fetchCompletedTasks();
}, []);



  return (
    <>
<div className="tabs">
  <button className={activeTab === 'streams' ? 'active' : ''} onClick={() => setActiveTab('streams')}>Трансляция</button>
  <button className={activeTab === 'recordings' ? 'active' : ''} onClick={() => setActiveTab('recordings')}>Записи тренировок</button>
  <button className={activeTab === 'meals' ? 'active' : ''} onClick={() => setActiveTab('meals')}>Питание</button>
  <button className={activeTab === 'daily-tasks' ? 'active' : ''} onClick={() => setActiveTab('daily-tasks')}>Daily task</button>

</div>

      
      <div>
        {activeTab === 'streams' && (
          // <div>
          //   <h2>Текущие трансляции</h2>
          //   {streams.length > 0 ? (
          //     streams.map((stream, index) => (
          //       <div key={index} className="video-container">
          //       {isYouTubeUrl(stream.bunny_url) ? (
          //         <iframe
          //           width="100%"
          //           height="500"
          //           src={getEmbedUrl(stream.bunny_url)}
          //           title={stream.title}
          //           frameBorder="0"
          //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          //           allowFullScreen
          //         ></iframe>
          //       ) : (
          //         <Plyr
          //           source={{
          //             type: 'video',
          //             sources: [{ src: stream.bunny_url, type: 'video/mp4' }],
          //           }}
          //         />
          //       )}
          //     </div>
          //   ))
          //   ) : (
          //     <p>Нет активных трансляций</p>
          //   )}
          // </div>
          <div>
            {/* <h2>Текущая трансляция</h2>
            {streamUrl ? (
                <iframe
                    width="100%"
                    height="500"
                    src={streamUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <p>Загрузка...</p>
            )} */}
            <iframe 
                width="100%" 
                height="500" 
                src="https://player.kick.com/funcatcherslv" 
                allowfullscreen>
            </iframe>
        </div>
          
        )}

        {activeTab === 'recordings' && (
          <div className='recordings'>
            <h2>Записи тренировок</h2>
            {recordings.length > 0 ? (
              recordings.map((recording, index) => (
                <div key={index} className="video-container">
                  <h3>Дата публикации: {new Date(recording.publish_at).toLocaleDateString()}</h3>
                  <Plyr
                  source={{
                    type: 'video',
                    sources: [{ src: recording.bunny_url, type: 'video/mp4' }],
                  }}
                />
                </div>
              ))
            ) : (
              <p>Нет записей</p>
            )}
          </div>
        )}

        {activeTab === 'meals' && (
          <div className="meals">
            <h2>Питание</h2>
            {meals.length > 0 ? (
              meals.map((meal, index) => (
                <div key={index} className="meal-container">
                  <h3>Дата публикации: {meal.publish_at ? new Date(meal.publish_at).toLocaleString() : "Неизвестно"}</h3>

                  <table>
                    <thead>
                      <tr>
                        <th>Прием пищи</th>
                        <th>Блюдо</th>
                        <th>Вес (г)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {['breakfast', 'snack', 'lunch', 'dinner'].map((mealType) => {
                        const mealItems = meal[mealType] || [];
                        return mealItems.map((item, i) => (
                          <tr key={`${mealType}-${index}-${i}`}>
                            {i === 0 ? (
                              <td rowSpan={mealItems.length}>
                                {mealType === 'breakfast' ? 'Завтрак' :
                                mealType === 'snack' ? 'Полдник' :
                                mealType === 'lunch' ? 'Обед' :
                                'Ужин'}
                              </td>
                            ) : null}
                            <td>{item.name}</td>
                            <td>{item.weight}</td>
                          </tr>
                        ));
                      })}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <p>Нет данных о питании</p>
            )}
          </div>
        )}
        {activeTab === 'daily-tasks' && (
    <div className="daily-tasks-container">
        <h2 className="daily-title">Дейлики</h2>
        <div className="daily-tasks-list">
            {Object.entries(groupedTasks).map(([date, tasks]) => (
                <div key={date}>
                    <h3 className="task-date">{date}</h3>
                    {tasks.map((task, index) => (
                        <tr key={index} className="task-row">
                            <td>{task.task} - {task.amount} {task.unit}</td>
                            <td>
                              <input
                                  type="checkbox"
                                  className="task-checkbox"
                                  checked={!!completedTasks[task.id]}
                                  onChange={() => toggleTaskCompletion(task.id)}
                              />
                            </td>
                            {completedTasks[task.id] && (
                              <td>
                                <p className="task-completed-info">
                                    {/* Выполнил: {completedTasks[task.id].firstName} {completedTasks[task.id].lastName} <br /> */}
                                    Дата: {new Date(completedTasks[task.id].completedAt).toLocaleString()}
                                </p>
                              </td>
                            )}
                        </tr>
                    ))}
                </div>
            ))}
        </div>
    </div>
        )}

      </div>
    </>
  );
}
