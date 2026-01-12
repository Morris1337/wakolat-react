import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, TimeScale } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { UserContext } from "../../../Context/UserContext";
import Modal from 'react-modal';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import API from './../../../utils/api';
import ChangeMeasurements from "./ChangeMeasurements";
import UserPostProfile from '../Publikacija/UserPost/UserPostProfile';
import Publikacija from '../Publikacija/Publikacija';
import './profile.scss';
const socket = new WebSocket('ws://localhost:3001');

export default function Profile() {
  ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, TimeScale);

  const { id } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [weightHistory, setWeightHistory] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [bodyMeasurementsHistory, setBodyMeasurementsHistory] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false)
  const [justLeveledUp, setJustLeveledUp] = useState(false);
  const [lastLevel, setLastLevel] = useState(null);
  const [tournaments, setTournaments] = useState([]);

  // const userId = id || localStorage.getItem('userId');
  const { user} = useContext(UserContext);
  const userId = user?.id;

useEffect(() => {
  if (!profileData?.id) return;
  (async () => {
    try {
      const r = await API.get(`/activities/users/${profileData.id}/competitions-history`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      setTournaments(r.data || []);
    } catch {}
  })();
}, [profileData?.id]);

useEffect(() => {
  if (id) {
    API.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((response) => {
        console.log("🕓 Базовый профиль загружен:", response.data);
        setProfileData(response.data);
      })
      .catch((error) => console.error("Ошибка загрузки базового профиля:", error));
  }
}, [id]);

// 2. Потом сверху грузим уже enriched профиль с EXP/LEVEL
useEffect(() => {
  if (!user?.id || !id || parseInt(id) !== user.id) return;

  const fetchEnrichedProfile = async () => {
    try {
      const response = await API.get(`/users/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log("💎 Enriched профиль с EXP:", response.data);
      setProfileData(response.data);
    } catch (error) {
      console.error("Ошибка загрузки EXP профиля:", error);
    }
  };

  fetchEnrichedProfile();
}, [user?.id, id]);

  socket.onopen = () => {
    console.log('Подключение к WebSocket установлено');
  };
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'activityFinalized') {
        console.log(`Обновленные данные пользователя:`, data.updatedStats);
        setStatistics(data.updatedStats);
    }
  };

  const fetchData = useCallback(async (url, setter, errorMessage) => {
    try {
      const response = await API.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      setter(response.data);
    } catch (error) {
      console.error(errorMessage, error);
    }
  }, []);

//   useEffect(() => {
//     fetchData(`/users/${id}`, setProfileData, 'Ошибка при загрузке профиля:');
//   }, [id, fetchData]);

//   useEffect(() => {
//     if (user?.id) {
//         fetchData(`/users/${user.id}`, setProfileData, 'Ошибка при загрузке профиля:');
//     }
// }, [user]);

useEffect(() => {
  if (profileData && profileData.id) {
      fetchWeightHistory();
      fetchBodyMeasurementsHistory();
  }
}, [profileData]);  // Теперь загрузка истории происходит ТОЛЬКО после загрузки профиля

  useEffect(() => {
    if (!id) return;
      // fetchWeightHistory();
      // fetchBodyMeasurementsHistory();  // 🆕 Добавляем вызов загрузки истории замеров
      fetchStatistics(null);
      fetchMonthlyStats();
      console.log(`🔍 Загружаем профиль пользователя с ID: ${id}`);
      // fetchData(`/users/${id}`, setProfileData, 'Ошибка при загрузке профиля:');
  }, [id]);

  useEffect(() => {
    if (profileData?.level && lastLevel !== null && profileData.level > lastLevel) {
      setJustLeveledUp(true);
      setTimeout(() => setJustLeveledUp(false), 3000);
    }
    setLastLevel(profileData?.level);
  }, [profileData?.level]);

  const fetchWeightHistory = async () => {
    if (!profileData || !profileData.id) {
        console.warn("⚠️ [DEBUG] `profileData` еще не загружен, пропускаем fetchWeightHistory");
        return;
    }

    try {
        console.log("📌 [DEBUG] Загружаем историю веса для:", profileData.id);
        const response = await API.get(`/users/${profileData.id}/weight-history`);
        setWeightHistory(response.data);
    } catch (error) {
        console.error('❌ Ошибка при загрузке истории веса:', error);
    }
};


  const fetchMeasurements = async () => {
    try {
      const response = await API.get(`/users/${profileData.id}/body-measurements`);
      setMeasurements(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке замеров:', error);
    }
  };

  const fetchBodyMeasurementsHistory = async () => {
    if (!profileData || !profileData.id) {
        console.warn("⚠️ [DEBUG] `profileData` еще не загружен, пропускаем fetchBodyMeasurementsHistory");
        return;
    }

    try {
        console.log("📌 [DEBUG] Загружаем историю замеров для:", profileData.id);
        const response = await API.get(`/users/${profileData.id}/body-measurements-history`);
        console.log("📌 [DEBUG] Полученные данные:", response.data);
        setBodyMeasurementsHistory(response.data);
    } catch (error) {
        console.error("❌ Ошибка при загрузке истории замеров:", error);
    }
};


  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const chartDatasets = bodyMeasurementsHistory.flat().reduce((acc, curr) => {
    const { type, date, value } = curr;
    if (!acc[type]) {
      acc[type] = {
        label: type,
        data: [],
        borderColor: getRandomColor(),
        fill: false,
      };
    }
    acc[type].data.push({ x: new Date(date), y: parseFloat(value) });
    return acc;
  }, {});

  const formattedStats = {
    labels: monthlyStats.map(stat => stat.month.trim()),
    datasets: [
      {
        label: 'Активности',
        data: monthlyStats.map(stat => parseInt(stat.activity_count, 10)),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const handleClaimReward = async (notificationId) => {
    try {
      await API.post('/users/notifications/read', { notificationId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      alert('Награда успешно получена!');
      fetchData('/users/notifications', setNotifications, 'Ошибка при обновлении уведомлений:');
      // fetchData(`/users/${id}`, setProfileData, 'Ошибка при обновлении профиля:');
    } catch (error) {
      console.error('Ошибка при получении награды:', error);
    }
  };

  const openModal = () => {
    fetchWeightHistory();
    fetchMeasurements();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const senModalUpdate = () => {
    setOpenModalUpdate(true);
  };

  const closeModalUpdate = () => {
    setOpenModalUpdate(false);
  };

  // useEffect(() => {
  //   if (id) {
  //     fetchData(`/users/${id}`, setProfileData, 'Ошибка при загрузке профиля:');
  //   }
  // }, [id, fetchData]);

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     const userId = localStorage.getItem('userId');
  //     if (user?.id) {
  //       fetchData(`/users/${user.id}`, setProfileData, 'Ошибка при загрузке профиля:');
  //   }
  //   };
  
  //   fetchProfileData();
  // }, [user]); // Срабатывает при изменении userId

//   useEffect(() => {
//     if (user?.id) {
//         API.get(`/users/${user.id}`)
//             .then((response) => setProfileData(response.data))
//             .catch((error) => console.error("Ошибка загрузки профиля:", error));
//     }
// }, [user]);  // Теперь useEffect перезапустится при смене user
// useEffect(() => {
//   // console.log("🔍 [DEBUG] Загруженные данные профиля:", profileData);
// }, [profileData]);

const fetchStatistics = async (userId) => {
  try {
      console.log(`📡 Загружаем статистику для пользователя ID: ${userId}`);
      const response = await API.get(`/activities/statistics?userId=${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      // Берём именно total (общую статистику), а не весь объект
      setStatistics(response.data.total || response.data);
  } catch (error) {
      console.error(`❌ Ошибка загрузки статистики пользователя ${userId}:`, error);
  }
};

const fetchMonthlyStats = async (userId) => {
  try {
      console.log(`📊 Загружаем месячную статистику для пользователя ID: ${userId}`);
      const response = await API.get(`/activities/statistics/monthly?userId=${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      setMonthlyStats(response.data);
  } catch (error) {
      console.error(`❌ Ошибка загрузки месячной статистики пользователя ${userId}:`, error);
  }
};


useEffect(() => {
  if (!id) return; // Проверяем, что ID есть
  setStatistics(null); // Очищаем старые данные перед загрузкой новых
  fetchStatistics(id);
  fetchMonthlyStats(id);
}, [id]); // useEffect срабатывает при изменении id



  if (!profileData) {
    return <div className="downloads">Loading...</div>;
  }



const handleBarClick = () => {
  if (statistics) {
      alert(`
          Тренировки: ${statistics.trainings_count || 0}
          Мероприятия: ${statistics.events_count || 0}
          Соревнования: ${statistics.competitions_count || 0}
      `);
  } else {
      alert('Статистика не загружена.');
  }
};

const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      console.log("📌 [DEBUG] Отправляемые данные:", formData);

        const response = await API.post('/users/upload-avatar', formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'multipart/form-data',
            },
        });      
        alert('Аватарка успешно обновлена!');
        setProfileData({ ...profileData, profile_picture: response.data.avatarUrl });
    } catch (error) {
        console.error('Ошибка при обновлении аватарки:', error);
        alert('Не удалось обновить аватар. Попробуйте снова.');
    }
};

const avatarPath = profileData?.profile_picture 
  ? `https://fc-server.zapto.org${profileData.profile_picture.replace(/\/{2,}/g, "/")}` 
  : "/static/default-avatar.png";


return (
    <div key={profileData.id} className="profile-container">
      {/* <div className="notifications-section">
        <h3>Оповещения</h3>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map(notification => (
              <li key={notification.id}>
                <p>{notification.message}</p>
                <button onClick={() => handleClaimReward(notification.id)}>Забрать награду</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет новых оповещений.</p>
        )}
      </div> */}

      <header className="header">
        <h1>Lietotāja profils</h1>
      </header>

      <div className="main-content">
        <div className="left-panel">
          <div className="avatar-image">
          <img src={avatarPath} alt="User Profile" className="profile-img" />
            <button onClick={() => document.getElementById('avatarUpload').click()} className="upload-avatar-button">
            Mainīt avataru
            </button>
            <input
                type="file"
                id="avatarUpload"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleAvatarChange}
            />
          </div>
          <div>
            {/* <h3>Reitings: {profileData.rating}</h3> */}
            
            {profileData && (
              
              <div className="exp-panel">
                {typeof profileData.level === 'number' && (
                  <h2>Level: {profileData.level}</h2>
                )}
                <div className="exp-bar-wrapper">
                  <div className="exp-bar">
                    <div
                        className="exp-progress"
                        style={{
                          width: profileData.currentExp && profileData.nextLevelExp
                            ? `${(profileData.currentExp / profileData.nextLevelExp) * 100}%`
                            : "0%",
                        }}
                      >
                      <span className="exp-text">
                        {profileData.currentExp} / {profileData.nextLevelExp}
                      </span>
                      {justLeveledUp && (
                        <div className="level-up-banner">
                          🎉 Уровень повышен до {profileData.level}!
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <p>{profileData.currentExp} / {profileData.nextLevelExp} EXP до следующего уровня</p> */}
                </div>
              </div>
            )}
            {/* <h3>Funs: {profileData.currency} </h3> */}
          </div>
          <div className="user-info">
            <h2>{profileData.username}</h2>
            <p><strong>Klubs:</strong> {profileData.club || "Nav norādīts"}</p> {/* ← ДОБАВЬ ЭТО */}
            <p>Vārds: {profileData.first_name} {profileData.last_name}</p>
            {/* <p>{profileData.role} {profileData.class}</p> */}
            <p>josta: {profileData.belt}</p>
            <p>Tiesnieša kategorija: {profileData.judge_level}</p>
            <p>Dzimšanas datums: {moment(profileData.birth_date).format('DD/MM/YYYY')}</p>
            <p>Tālrunis:{profileData.phone}</p>
            {/* <p>Mācību/darba vieta:{profileData.macibu_darba_vieta}</p> */}
            <p>Dzimums:{profileData.gender}</p>
            <p>Svars: {profileData.weight}</p>
            <div>
                <button onClick={senModalUpdate}>Atjaunināt</button>
                <Modal isOpen={openModalUpdate}>
                  <ChangeMeasurements 
                    closeModal={closeModalUpdate} 
                    updateBodyMeasurementsHistory={fetchBodyMeasurementsHistory}
                  />
                </Modal>
                <button onClick={openModal}>Statistika</button>
                <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                    <h2>Svara vēsture</h2>
                    <Line
                      data={{
                        labels: weightHistory.map(item => new Date(item.recorded_at).toLocaleDateString()),
                        datasets: [
                          {
                            label: "Вес",
                            data: weightHistory.map(item => item.weight),
                            borderColor: "blue",
                            fill: false,
                          },
                        ],
                      }}
                    />

                    <h2>Ķermeņa mērījumi</h2>
                    <Line
                      data={{
                        datasets: Object.values(chartDatasets),
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            type: 'time',
                            time: {
                              unit: 'day',
                            },
                            title: {
                              display: true,
                              text: 'Дата',
                            },
                          },
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Значение',
                            },
                          },
                        },
                      }}
                    />

                    <button onClick={closeModal}>Aizvērt</button>
                </Modal>
            </div>
            <p>Nodarbības: {profileData.nodarbibas}</p>
            <p>ID: {profileData.id}</p>
            <p></p>
          </div>
        </div>

        <div className="right-panel">
        <div className="stats-section">
          <h3>Statistika</h3>
          {statistics ? (
                <ul>
                    {/* <li>Treniņi: {statistics.trainings_count || 0}</li> */}
                    <li>Sacensības: {statistics.competitions_count || 0}</li>
                    <li>Pasākumi: {statistics.events_count || 0}</li>
                    <li>Tiesnesis: {statistics.judge_tournaments_attended || 0}</li>
                    <li>Tiesnešu seminārs: {statistics.seminars_count || 0}</li>

                </ul>
            ) : (
                <p>Ielādē...</p>
            )}
        </div>

        {tournaments.length > 0 && (
        <section className="profile-tournaments" style={{marginTop:16}}>
          <h3>🏆 Turnīri</h3>
          <div className="tournaments-list">
            {tournaments.map(t => (
              <div className="tournament-item" key={t.activity_id}>
                <b>{t.title}</b> — {new Date(t.start_time).toLocaleDateString('lv-LV')}
                <div>
                  {t.categories.map((c,i)=>(
                    <span key={i} style={{marginRight:8}}>
                      {c.role==='athlete' ? `${c.style||c.sport}${c.weight_class?`(${c.weight_class})`:''}` : c.role}
                      {typeof c.place === 'number' ? ` — ${c.place}. vieta` : ''}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}


        {/* <div className="charts-section">
            <h3>Mēneša aktivitāšu statistika</h3>
                {monthlyStats && monthlyStats.length > 0 ? (
                    <Bar
                    data={{
                        labels: monthlyStats.map(stat => stat.month),
                        datasets: [{
                            label: 'Общее количество',
                            data: monthlyStats.map(stat => stat.total_count),
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        }]
                    }}
                    options={{
                        
                        responsive: true,
                        onClick: (evt, elements) => handleBarClick(elements),
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (tooltipItem) => {
                                        const index = tooltipItem.dataIndex;
                                        const details = monthlyStats[index];
                                        return `
                                            Тренировки: ${statistics.trainings_count || 0},
                                            Мероприятия: ${statistics.events_count || 0},
                                            Соревнования: ${statistics.competitions_count || 0}
                                        `;
                                    }
                                }
                            }
                        }
                    }}
                />
                      
                ) : (
                    <p>Nav datu parādīšanai.</p>
                )}
            </div> */}
          <Publikacija />
          <UserPostProfile userId={profileData.id} />
        </div>
      </div>
    </div>
  );
}
