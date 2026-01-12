import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from "../../Context/UserContext"; // Импортируем контекст
import { Link } from 'react-router-dom';
import API from '../../utils/api.js';
import './account.scss';
// import CardsHub from '../cards/CardsHub.jsx';
// import TrainerTesting from '../cards/TrainerTesting.jsx';
// import '../cards/cards.module.scss'; // единый SCSS для всего модуля карточек
// import PostComponent from '../../Components/Main/MainComponents/Admin/PostComponent/PostComponent'

export default function Account() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    // const [userRole, setUserRole] = useState('');
    const [linkedAccounts, setLinkedAccounts] = useState([]);
    const [showAccountList, setShowAccountList] = useState(false); // 🔹 Управление списком аккаунтов
    const [showAddAccount, setShowAddAccount] = useState(false); // 🔹 Управление формой
    const [childUsername, setChildUsername] = useState('');
    const [childPassword, setChildPassword] = useState('');
    const [isTrainerMenuOpen, setIsTrainerMenuOpen] = useState(false);
    const [isAktivitiesMenuOpen, setIsAktivitiesMenuOpen] = useState(false);
    const [userRole, setUserRole] = useState('user');
    const { switchUser } = useContext(UserContext);
    const { user, setUser } = useContext(UserContext); // Контекст пользователя
    const [permissions, setPermissions] = useState([]);
    const location = useLocation();
    const [isCardsMenuOpen, setIsCardsMenuOpen] = useState(false);
    const [isCardsOpen, setIsCardsOpen] = useState(false);
    const [isTrainerOpen, setIsTrainerOpen] = useState(false);
    const [isGamesMenuOpen, setIsGamesMenuOpen] = useState(false);
    const toggleCards = () => setIsCardsOpen(v => !v);
    const toggleTrainer = () => setIsTrainerOpen(v => !v);
    const toggleGamesMenu = () => setIsGamesMenuOpen(v => !v);
    

    // какой “внутренний” экран показывать в основной панели аккаунта
    const [activeAccountView, setActiveAccountView] = useState(null); 
    // варианты: 'cards', 'trainer-testing', null === обычный контент аккаунта


    useEffect(() => {
        if (!user?.id) return;
    
        const fetchPermissions = async () => {
            try {
                const response = await API.get('/users/permissions', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
                });
    
                console.log("🔍 [DEBUG] Полученные разрешения с API:", response.data);
                setPermissions(response.data.permissions);
            } catch (error) {
                console.error('Ошибка загрузки разрешений:', error);
            }
            console.log("🔍 [DEBUG] Загруженные permissions:", permissions);
        };
    
        fetchPermissions();
    }, [user?.id]);

    // закрывать подпункт при смене страницы (как у тренерского меню)
useEffect(() => {
  setIsGamesMenuOpen(false);
}, [location.pathname]);

    const can = (permission) => {
        return Array.isArray(permissions) && permissions.includes(permission);
      };      
    const userExtraRoles = user?.extra_roles || [];
    console.log("🔍 userExtraRoles:", userExtraRoles);
    
    useEffect(() => {
        if (!user?.id) return;
        
        console.log("🔍 [DEBUG] Загруженные permissions:", permissions);
    }, [permissions]);
    
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    const toggleTrainerMenu = () => {
        setIsTrainerMenuOpen(!isTrainerMenuOpen);
    };

    const toggleActivitiesMenu = () => {
        setIsAktivitiesMenuOpen(!isAktivitiesMenuOpen);
    };

    const toggleCardsMenu = () => setIsCardsMenuOpen(prev => !prev);

    useEffect(() => {
        // const role = localStorage.getItem('role');
        // setUserRole(user?.role || 'user');
        // setUserRole(role || 'user');
        const role = localStorage.getItem('role');
        setUserRole(role || 'user'); // Считываем роль из локального хранилища
    }, [user]);

    useEffect(() => {
        const cachedAccounts = localStorage.getItem('linkedAccounts');
        if (cachedAccounts) {
            setLinkedAccounts(JSON.parse(cachedAccounts));
        } else {
            fetchLinkedAccounts();
        }
    }, []);
    useEffect(() => {
        setIsTrainerMenuOpen(false); // Закрываем подменю при смене маршрута
    }, [location.pathname]); // Запускается при каждом изменении пути

    const switchAccount = async (accountId) => {
        try {
            const response = await API.post('/users/switch-account', { accountId }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
    
            const { accessToken, role } = response.data;
    
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userId', accountId);
            localStorage.setItem('role', role);
    
            switchUser(accountId, role);
            setUserRole(role); // ✅ Устанавливаем новую роль сразу
    
            navigate(`/account/profile/${accountId}`);
        } catch (error) {
            console.error('Ошибка переключения аккаунта:', error);
            alert('Не удалось переключить аккаунт.');
        }
    };
    
      useEffect(() => {
        const role = localStorage.getItem('role');
        setUserRole(role || 'user');  // Теперь меню обновится при смене роли
        fetchLinkedAccounts();
    }, []);  // Следим за изменением user, чтобы обновлять меню
    
    const fetchLinkedAccounts = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('❌ Ошибка: accessToken отсутствует');
          return;
        }
    
        try {
          const response = await API.get('/users/linked-accounts', {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
          });
          setLinkedAccounts(response.data);
          localStorage.setItem('linkedAccounts', JSON.stringify(response.data));
        } catch (error) {
          console.error('Ошибка загрузки аккаунтов:', error);
        }
      };

// ✅ Перемещаем handleSwitchAccount выше, чтобы оно было определено до его вызова
const handleSwitchAccount = async (accountId) => {
    handleCloseMenu(); // ✅ Закрываем меню после выбора аккаунта
    if (!accountId) {
        console.error('❌ Ошибка: `accountId` отсутствует.');
        return;
    }

    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('❌ Ошибка: accessToken отсутствует.');
            alert('Ошибка: необходимо заново авторизоваться.');
            return;
        }

        // console.log(`🔄 Переключение на аккаунт ID: ${accountId}`);

        const response = await API.post('/users/switch-account', { accountId }, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        // console.log('✅ Успешное переключение:', response.data);

        const { accessToken: newAccessToken, role, username } = response.data;

        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('userId', accountId);
        localStorage.setItem('role', role);
        localStorage.setItem('username', username);

        switchUser(accountId, role, newAccessToken, username);

        const userProfileResponse = await API.get(`/users/${accountId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        setUser(userProfileResponse.data);
        localStorage.setItem('user', JSON.stringify(userProfileResponse.data));

        fetchLinkedAccounts();
        navigate(`/account/profile/${accountId}`);
    } catch (error) {
        console.error('Ошибка переключения аккаунта:', error);
        alert('Не удалось переключить аккаунт.');
    }
};

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        navigate('/');
        handleCloseMenu()
      };
      
      const handleLinkAccount = async () => {
        if (!childUsername || !childPassword) {
          alert('Введите логин и пароль для привязки аккаунта.');
          return;
        }
    
        try {
            const response = await API.post('/users/link-account', { childUsername, childPassword }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });          
            setChildUsername('');
            setChildPassword('');
            fetchLinkedAccounts();
            alert('Аккаунт успешно привязан!');
            setShowAddAccount(false); // 🔹 Скрываем форму после добавления 
            } catch (error) {
            console.error('Ошибка привязки аккаунта:', error);
            }
      };

    const handleUnlinkAccount = async (accountId) => {
        try {
            await API.post('/users/unlink-account', { accountId }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });

            setLinkedAccounts(prev => prev.filter(acc => acc.id !== accountId));
            alert('Аккаунт отвязан.');
        } catch (error) {
            console.error('Ошибка отвязки аккаунта:', error);
        }
    };

        // ✅ Обработчик клика по заголовку "Переключение аккаунтов"
        const toggleAccountList = () => {
            setShowAccountList((prev) => {
                if (!prev) setShowAddAccount(false);
                return !prev;
            });
        };
        

        useEffect(() => {
            if (!user?.id) return;
        
            const fetchUserData = async () => {
                try {
                    const response = await API.get(`/users/${user.id}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                    });
        
                    console.log("🔍 [DEBUG] Получен пользователь:", response.data);
                    setUser(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                } catch (error) {
                    console.error('Ошибка загрузки профиля:', error);
                }
            };
        
            fetchUserData();
        }, [user?.id]);
        
        console.log("🔍 user.extra_roles:", user?.extra_roles);
        console.log("🔍 userRole:", userRole);
        console.log("🔍 permissions:", permissions);
        console.log("🔍 [DEBUG] Загруженные permissions:", permissions);

        console.log("🔍 user.class", user?.class);
        

      return (
        <div className="container-account">
            {/* Кнопка теперь двигается вместе с меню */}
            <div className={`menu-container ${isOpen ? 'open' : ''}`}>
                <button className="button-account-menu" onClick={handleToggle}>
                    {isOpen ? '⨉' : '📒'}
                </button>

                <div className="block-profile-menu">
                    <ul>
                        {/* Меню для переключения аккаунтов */}
                        <li>
                            {/* Заголовок с кнопкой скрытия списка аккаунтов */}
                            <div className="account-switch-header" onClick={() => toggleAccountList(!showAccountList)}>
                                <h3>🔄 Profilu pārslēgšana</h3>
                            </div>

                {/* Список аккаунтов (скрывается/показывается) */}
                {/* {showAccountList && ( */}
                    <div className={`account-switch-section ${showAccountList ? 'open' : ''}`}>
                        {linkedAccounts.map(account => (
                            <div key={account.id} className="account-item">
                                <button className="switch-button" onClick={() => handleSwitchAccount(account.id)}>
                                    🔁 {account.username}
                                </button>
                                <button className="remove-button" onClick={() => handleUnlinkAccount(account.id)}>❌</button>
                            </div>
                        ))}

                        {/* Кнопка для отображения формы добавления */}
                        <button className="add-account-button" onClick={() => setShowAddAccount(!showAddAccount)}>
                            {showAddAccount ? "➖ Скрыть" : "➕ Добавить аккаунт"}
                        </button>

                        {/* Форма ввода логина и пароля (скрыта по умолчанию) */}
                        {/* {showAddAccount && ( */}
                            <div className={`add-account-form ${showAddAccount ? 'open' : ''}`}>
                                <input type="text" value={childUsername} onChange={e => setChildUsername(e.target.value)} placeholder="Логин" />
                                <input type="password" value={childPassword} onChange={e => setChildPassword(e.target.value)} placeholder="Пароль" />
                                <button onClick={handleLinkAccount}>Pievienot profilu</button>
                            </div>
                        {/* )} */}
                    </div>
                {/* )} */}

                        </li>
                        <li onClick={() => {navigate(`/account/profile/${localStorage.getItem('userId')}`);handleCloseMenu();}  }>Profils</li>
                        {permissions.length > 0 && can('view_trainer_panel') && (
                            <li onClick={toggleTrainerMenu} className="trainer-menu">Treneru kabinets</li>
                            )}
                             {permissions.length > 0 && can('view_trainer_panel') && (
                            <li onClick={() => {navigate(`/account/createActivity`);handleCloseMenu();}} className={`submenu-coach ${isTrainerMenuOpen ? 'open' : ''}`}>⚪️ Izveidot aktivitāti</li>
                            )}
                             {/* {permissions.length > 0 && can('view_trainer_panel') && (
                            <li onClick={() => {navigate(`/account/gym`);handleCloseMenu();}} className={`submenu-coach ${isTrainerMenuOpen ? 'open' : ''}`}>⚪️ Gym</li>
                            )} */}
                            {permissions.length > 0 && can('view_trainer_panel') && (
                            <li onClick={() => {navigate(`/account/athleteL ist`);handleCloseMenu();}} className={`submenu-coach ${isTrainerMenuOpen ? 'open' : ''}`}>⚪️ Athlete list</li>
                            )}
                            {/* {permissions.length > 0 && can('view_maratons_panel') && (
                                <li onClick={() => {navigate('/account/adminMaratons');handleCloseMenu();}} className={`submenu-coach ${isTrainerMenuOpen ? 'open' : ''}`}>⚪️ Admin Maratons</li>
                            )} */}
                            {permissions.length > 0 && can('view_maratons_panel') && (
                                <li onClick={() => {navigate('/account/sacensibasWako');handleCloseMenu();}} className={`submenu-coach ${isTrainerMenuOpen ? 'open' : ''}`}>⚪️ Sacensibas</li>
                            )}
                            {/* {permissions.length > 0 && can('view_trainer_panel') && (
                            <li onClick={() => { navigate('/account/trainer-testing'); handleCloseMenu(); }} className={`submenu-coach ${isTrainerMenuOpen ? 'open' : ''}`}>🟡 Testēšana (batči)</li>
                            )} */}
                            {/* {permissions.length > 0 && can('view_trainer_panel') && (
                                <li onClick={() => { navigate('/account/batch-editor'); handleCloseMenu(); }} className={`submenu-coach ${isTrainerMenuOpen ? 'open' : ''}`}>🟡 Batča redaktors</li>
                            )} */}
                        {permissions.length > 0 && can('view_admin_panel') && (
                        <li onClick={() => {navigate(`/account/AdminPanel`);handleCloseMenu();}}>Admin panelis</li>
                        )}
                        {/* {permissions.includes('manage_shop') && (
                        <li onClick={() => {navigate(`/account/shopPanel`);handleCloseMenu();}}>🛍 Shop Panel</li>
                        )} */}

                            <li onClick={toggleActivitiesMenu} className='activities-menu'>Aktivitātes</li>
                            <li onClick={() => {navigate(`/account/Activities`);handleCloseMenu();}} className={`submenu-activities ${isAktivitiesMenuOpen ? 'open' : ''}`}>🟢 Nodarbības saraksts</li>
                            <li onClick={() => {navigate(`/account/Testesana`);handleCloseMenu();}} className={`submenu-activities ${isAktivitiesMenuOpen ? 'open' : ''}`}>🟢 Jostu eksamenacija</li>
                            <li onClick={() => {navigate(`/referee-test`);handleCloseMenu();}} className={`submenu-activities ${isAktivitiesMenuOpen ? 'open' : ''}`}>🟢Tiesnešu teorētiskais tests</li>
                            {/* {permissions.length > 0 && (can('view_maratons_panel') || userExtraRoles?.includes('marathon_user')) && (
                            <li onClick={() => {navigate('/account/maratons');handleCloseMenu();}} className={`submenu-activities ${isAktivitiesMenuOpen ? 'open' : ''}`}>🟢Maratons</li>)} */}
                            {/* Тогглер раздела Games */}
                            <li onClick={toggleGamesMenu} className={`submenu-activities games-menu ${isAktivitiesMenuOpen ? 'open' : ''}`}> 🎮 Games </li>
                            {/* Подпункты Games */}
                            <li onClick={() => { navigate(`/account/minecraft/profile/${user.id}`); handleCloseMenu(); }} className={`submenu-activities ${isAktivitiesMenuOpen && isGamesMenuOpen ? 'open' : ''}`} > 🟢 Minecraft </li>
                            {/* <li onClick={() => { navigate(`/account/intel`); handleCloseMenu(); }} className={`submenu-activities ${isAktivitiesMenuOpen && isGamesMenuOpen ? 'open' : ''}`}>🧠 Intel</li> */}
                            {/* <li onClick={() => { navigate(`/account/intel/sprint`); handleCloseMenu(); }} className={`submenu-activities ${isAktivitiesMenuOpen && isGamesMenuOpen ? 'open' : ''}`}> ▶️ Решать (Math Sprint)</li> */}
                            {/* ===== Карточки / Cards ===== */}
                            {/* <li onClick={toggleCardsMenu} className='activities-menu'>Kartiņas</li> */}
                            {/* <li onClick={() => { navigate('/account/cards'); handleCloseMenu(); }} className={`submenu-activities ${isCardsMenuOpen ? 'open' : ''}`}>🟡 Kartiņu modulis</li> */}

                            {/* Тренер: редактор батча */}
                            {/* {permissions.length > 0 && can('view_trainer_panel') && (
                            <li onClick={() => { navigate('/batch-edi   tor'); handleCloseMenu(); }} className={`submenu-activities ${isCardsMenuOpen ? 'open' : ''}`}>🟡 Редактор батча</li>)} */}
                            {/* Общие пункты для всех авторизованных */}
                            {/* <li
                            onClick={() => { setActiveAccountView('cards'); handleCloseMenu(); }}
                            className={`submenu-activities ${isCardsMenuOpen ? 'open' : ''}`}
                            >
                            🟢 Лидерборды / История / Паки / Инвентарь
                            </li> */}

                        <li onClick={() => {navigate(`/account/settings`);handleCloseMenu();}}>Iestatījumi</li>
                        <li onClick={() => {navigate(`/account/fighter`);handleCloseMenu();}}>Federācija biedri</li>
                        {/* <Link to="/referee-test">Tiesnešu teorētiskais tests</Link> */}
                        <li onClick={handleLogout} className="logout">Iziet</li>
                    </ul>
                </div>
            </div>

            <div className="block-profile-content">
                <Outlet />
            </div>

            
        </div>
    );
}
