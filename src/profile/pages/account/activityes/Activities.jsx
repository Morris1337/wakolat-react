import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import ParticipantsModal from './participantsModal/ParticipantsModal';
import DOMPurify from 'dompurify';
import API from '../../../utils/api';

const Activities = () => {
    const [isLoadingParticipants, setIsLoadingParticipants] = useState(false);
    const [activities, setActivities] = useState([]);
    const [statistics, setStatistics] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedActivityId, setSelectedActivityId] = useState(null);
    const [activeTab, setActiveTab] = useState('upcoming'); // По умолчанию "Предстоящие"

    const { user } = useContext(UserContext);
    const userId = user?.id;

    const navigate = useNavigate();

    const fetchStatistics = async () => {
        try {
          const response = await API.get('/activities/statistics', {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
          });
        //   console.log('Статистика обновлена:', response.data);
          // Вы можете использовать setStatistics, если нужно сохранить статистику в состоянии
        } catch (error) {
          console.error('Ошибка при загрузке статистики:', error);
        }
      };
      
    // Получение списка активностей
    // Загрузка активностей
    const fetchActivities = async () => {
        try {
            const response = await API.get('/activities', {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
        const data = response.data ?? [];
        const onlyEventsAndComps = data.filter(a => {
        const s = String(a.status || '').toLowerCase();
        const isEventOrComp = ['event','events','competition','competitions', 'seminar', 'seminars' ].includes(s);
        return isEventOrComp && a.wakolat_events_permission === true;
      });
      setActivities(onlyEventsAndComps);
        } catch (error) {
            console.error('Ошибка при загрузке активностей:', error);
        }
    };


    const formatDateHeader = (date) => {
        const days = ['Svētdiena', 'Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'Sestdiena'];
        const dayOfWeek = days[date.getDay()];
        return `${dayOfWeek}, ${date.toLocaleDateString()}`;
    };


    // Автоматическое завершение активности
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            activities.forEach(activity => {
                const endTime = new Date(activity.end_time);
    
                // Проверяем, завершена ли активность
                if (!activity.isFinalized && now >= endTime) {
                    finalizeActivity(activity.id);
                }
            });
        }, 60000); // Проверка каждые 60 секунд
    
        return () => clearInterval(interval);
    }, [activities]);
    
    const finalizeActivity = async (activityId) => {
        if (!activityId) {
            console.error('activityId не указан.');
            return;
        }
        try {
            await API.post(`/activities/finalize/${activityId}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            // console.log(`Активность ${activityId} успешно завершена`);
    
            // Обновляем статистику
            fetchStatistics();
            // fetchMonthlyStats();
            fetchActivities(); // Обновляем список активностей
        } catch (error) {
            // console.error(`Ошибка при завершении активности ${activityId}:`, error.response?.data?.message || error.message);
        }
    };
    //   useEffect(() => {
    //     const interval = setInterval(() => {
    //       activities.forEach(activity => {
    //         if (!activity.isFinalized && new Date(activity.end_time) < new Date()) {
    //             // console.log(`Активность ${activity.id} уже завершена.`);
    //             finalizeActivity(activity.id).then(() => {
    //                 // Обновляем статистику после завершения активности
    //                 fetchStatistics();
    //                 fetchMonthlyStats(); // Если есть отдельная функция для месячной статистики
    //                 // console.log(`Активность ${activity.id} успешно завершена.`);
    //               });
    //         }
    //       });
    //     }, 60000); // Каждые 60 секунд
      
    //     return () => clearInterval(interval);
    //   }, [activities]);

    useEffect(() => {
    fetchActivities();
    }, []);


    const groupedActivities = activities.reduce((acc, activity) => {
        const date = new Date(activity.start_time).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(activity);
        return acc;
    }, {});

    // Фильтрация активностей по вкладке
    const filteredActivities = () => {
        const now = new Date();
        let filtered = [];

        if (activeTab === 'upcoming') {
            // Предстоящие активности
            filtered = activities.filter(activity => new Date(activity.end_time) > now);
        } else if (activeTab === 'myActivities') {
            // Мои активности
            filtered = activities.filter(activity => activity.userJoined);
        } else if (activeTab === 'completed') {
            // Завершенные активности
            filtered = activities.filter(activity => new Date(activity.end_time) <= now);
        }

        // Сортировка по времени начала (ближайшие сверху)
        return filtered.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
    };

    const fetchParticipants = async (activityId) => {
        try {
            setSelectedActivityId(activityId); // Устанавливаем ID текущей активности
            const response = await API.get(`/activities/participants/${activityId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            setParticipants(response.data); // Обновляем состояние участников
            setShowModal(true);
        } catch (error) {
            console.error('Ошибка при получении участников:', error);
            alert(error.response?.data?.message || 'Не удалось загрузить список участников');
        }
    };

    return (
        <div className='activities-conteiner'>
            <h1>Aktivitātes</h1>
            {/* {gymState && (
                <div
                    className='gym-block'
                    style={{
                        background: `
                            linear-gradient(
                                rgba(${isJoined ? "0,128,0,0.6" : gymState.is_gym_open ? "255,255,255,0.6" : "255,0,0,0.6"}),
                                rgba(${isJoined ? "0,128,0,0.6" : gymState.is_gym_open ? "255,255,255,0.6" : "255,0,0,0.6"})
                            ),
                            url(${imgGym1})
                        `,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundColor: isJoined
                            ? "linear-gradient(rgba(0, 128, 0, 0.6), rgba(0, 128, 0, 0.6)), url(${imgGym})"
                            : gymState.is_gym_open
                            ? `url(${imgGym})`
                            : "linear-gradient(rgba(255, 0, 0, 0.6), rgba(255, 0, 0, 0.6)), url(${imgGym})",
                        padding: '20px',
                        borderRadius: '8px',
                    }}
                >
                    <img src={imgGym} alt="" />
                    <div>
                    <h2 onClick={() => fetchParticipants(gymState.id)}>Gym</h2>

                    <h3 style={{ color: gymState.is_gym_open ? 'black' : 'red' }}>
                            {gymState.is_gym_open ? 'Open' : 'Close'}
                        </h3>
                    </div>

                    <p>Zāle: {gymState.participants_count}</p>
                    {isJoined ? (
                        <button className="activity-button leave" onClick={unjoinGym}>Atcelt dalību</button>
                    ) : (
                        <button className="activity-button join" onClick={joinGym} disabled={!gymState.is_gym_open}>
                            Pievienoties
                        </button>
                    )}
                </div>
            )} */}
            {showModal && (
            <ParticipantsModal
                    participants={participants}
                    onClose={() => setShowModal(false)}
                />
            )}
            <div className="tabs">
                <button className={activeTab === 'upcoming' ? 'active' : ''} onClick={() => setActiveTab('upcoming')}>Gaidāmās</button>
                <button className={activeTab === 'myActivities' ? 'active' : ''} onClick={() => setActiveTab('myActivities')}>Manas aktivitātes</button>
                <button className={activeTab === 'completed' ? 'active' : ''} onClick={() => setActiveTab('completed')}>Pabeigtās</button>
            </div>
            {/* Список активностей с заголовками дат */}
            {/* Список активностей */}
            {/* Список активностей с заголовками дат */}
            {/* Список активностей с разделением по дням */}
            <div>
            {Object.entries(
                filteredActivities().reduce((acc, activity) => {
                    const date = new Date(activity.start_time).toDateString();
                    if (!acc[date]) acc[date] = [];
                    acc[date].push(activity);
                    return acc;
                }, {})
            ).map(([date, activitiesForDate]) => (
                <div key={date}>
                    <h2 className='Activities-day'>{formatDateHeader(new Date(date))}</h2>
                    <ul>
                        {activitiesForDate.map(activity => (
                            <div key={activity.id} style={{ /*backgroundColor: getStatusColor(activity)*/ margin: '10px', padding: '10px', borderRadius: '5px' }}>
                                <h2 onClick={() => fetchParticipants(activity.id)}>{activity.title}</h2>
                                <p>Atbildiga persona: {activity.coach}</p>
                                {/* <div>
                                    <p>Exp: {activity.exp_points}</p>
                                    <p>Funs: {activity.currency_reward}</p>
                                </div> */}
                                <div
                                    className="activity-desc"
                                    style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                    }}
                                    dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(activity.description || '')
                                    }}
                                />
                                <p>Pievienojas {activity.participants_count}/{activity.max_participants || '∞'}</p>
                                <p>Sākums: {new Date(activity.start_time).toLocaleString()}</p>
                                <p>Beigas: {new Date(activity.end_time).toLocaleString()}</p>
                                <div className="activity-actions" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    {activity.userJoined ? (
                                        <button
                                        className="activity-button leave"
                                        // onClick={() => leaveActivity(activity.id)}
                                        >
                                        Atcelt dalību
                                        </button>
                                    ) : (
                                        <>
                                        {/* Для тренировок — показываем кнопку "Pievienoties" */}
                                        
                                        </>
                                    )}

                                    {/* "Vairāk" показываем всегда, чтобы перейти на страницу детали */}
                                    <button
                                        className="activity-button more"
                                        onClick={() => navigate(`/activity/${activity.id}`)}
                                    >
                                        Vairāk
                                    </button>
                                    </div>

                            </div>
                        ))}
                    </ul>
                </div>
            ))}
            </div>


            {showModal && (
                <ParticipantsModal
                    activityId={selectedActivityId} // Передаём корректный ID
                    participants={participants}
                    onClose={() => setShowModal(false)}
                    // updateParticipation={updateParticipation}
                />
            )}

        </div>
    );
};

export default Activities;