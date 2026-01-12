import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminpanel.scss'
import API from '../../../utils/api';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [statuses, setStatuses] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedExtraRoles, setSelectedExtraRoles] = useState([]);
    const [userPerms, setUserPerms] = useState([]); // массив строк
    const [selectedClass, setSelectedClass] = useState('');
    const [exp, setExp] = useState(0);
    const [currency, setCurrency] = useState(0);
    const [roles, setRoles] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedNodarbibas, setSelectedNodarbibas] = useState([]);
    const nodarbibasOptions = ['Athlete', 'Coach', 'Judge', 'Support'];
    const [selectedBelt, setSelectedBelt] = useState('');
const [selectedJudgeLevel, setSelectedJudgeLevel] = useState('');

const beltOptions = [
  'Белый',
  'Желтый',
  'Оранжевый',
  'Зелёный',
  'Синий',
  'Красный',
  'Коричневый',
  'Чёрный 1 дан',
  'Чёрный 2 дан',
  'Чёрный 3 дан',
  'Чёрный 4 дан',
  'Чёрный 5 дан',
  'Чёрный 6 дан',
  'Чёрный 7 дан',
  'Чёрный 8 дан',
  'Чёрный 9 дан',
];

const judgeLevelOptions = [
  'Stāžiers',
  'Nacionālā D',
  'Nacionālā C',
  'Nacionālā B',
  'Nacionālā A',
  'Starptautiskā C',
  'Starptautiskā B',
  'Starptautiskā A',
];


    // Текущий пользователь (чтобы знать его основную роль и дизейблить её)
    const currentUser = users.find(u => u.id === selectedUser);

    const navigate = useNavigate();

    // Переключение чекбокса роли
    const toggleExtraRole = (role) => {
    setSelectedExtraRoles(prev =>
        prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
    };

    // Сохранить подроли
    const saveExtraRoles = async () => {
    if (!selectedUser) return alert('Выберите пользователя');
    await axios.post(
        'https://fc-server.zapto.org/api/users/update-extra-roles',
        { userId: selectedUser, extraRoles: selectedExtraRoles },
        { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
    );
    alert('Подроли обновлены');
    fetchUsers();
    };

    const toggleNodarbiba = (value) => {
    setSelectedNodarbibas((prev) =>
        prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
    };

    const saveNodarbibas = async () => {
    if (!selectedUser) return alert('Выберите пользователя');

    try {
        await axios.post(
        'https://fc-server.zapto.org/api/users/update-nodarbibas',
        {
            userId: selectedUser,
            nodarbibas: selectedNodarbibas,
        },
        {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        }
        );
        alert('Nodarbības обновлены');
        fetchUsers(); // чтобы обновить список с сервера
    } catch (error) {
        console.error('Ошибка обновления nodarbibas:', error);
        alert('Ошибка при обновлении nodarbibas');
    }
    };


    const fetchStatuses = async () => {
        try {
            const response = await API.get('/admin/statuses', {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            setStatuses(response.data);
        } catch (error) {
            console.error('Error fetching statuses:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://fc-server.zapto.org/api/users/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Ошибка загрузки пользователей:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('https://fc-server.zapto.org/api/users/roles', {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            setRoles(response.data);
        } catch (error) {
            console.error('Ошибка загрузки ролей:', error);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await axios.get('https://fc-server.zapto.org/api/users/classes', {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
    
            const classesData = response.data?.classes || [];
            setClasses(classesData);
        } catch (error) {
            console.error('Ошибка загрузки классов:', error);
            setClasses([]);
        }
    };

    useEffect(() => {
        fetchRoles();
        fetchClasses();
        fetchStatuses();
        fetchUsers();
    }, []);

    const handleRoleChange = async () => {
        if (!selectedUser || !selectedRole) {
            return alert('Выберите пользователя и роль');
        }

        try {
            const response = await axios.post(
                'https://fc-server.zapto.org/api/users/update-role',
                { userId: selectedUser, newRole: selectedRole },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                }
            );
            alert(response.data.message);
            fetchUsers();
        } catch (error) {
            console.error('Ошибка обновления роли пользователя:', error);
        }
    };

    const handleClassChange = async () => {
        if (!selectedUser || !selectedClass) {
            return alert('Выберите пользователя и класс');
        }

        try {
            const response = await axios.post(
                'https://fc-server.zapto.org/api/users/update-class',
                { userId: selectedUser, newClass: selectedClass },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                }
            );
            alert(response.data.message);
            fetchUsers();
        } catch (error) {
            console.error('Ошибка обновления класса пользователя:', error);
        }
    };

    const handleSubmit = async () => {
        if (!selectedUser) {
            return alert('Выберите пользователя.');
        }

        try {
            const response = await axios.post('https://fc-server.zapto.org/api/users/update-stats', {
                userId: selectedUser,
                expPoints: parseInt(exp, 10) || 0,
                currency: parseInt(currency, 10) || 0,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Ошибка обновления данных пользователя:', error);
        }
    };

    const saveBelt = async () => {
  if (!selectedUser || !selectedBelt) {
    return alert('Выберите пользователя и пояс');
  }

  try {
    await axios.post(
      'https://fc-server.zapto.org/api/users/update-belt',
      { userId: selectedUser, belt: selectedBelt },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    alert('Пояс обновлён');
    fetchUsers();
  } catch (error) {
    console.error('Ошибка обновления пояса:', error);
    alert('Ошибка при обновлении пояса');
  }
};

const saveJudgeLevel = async () => {
  if (!selectedUser || !selectedJudgeLevel) {
    return alert('Выберите пользователя и судейский уровень');
  }

  try {
    await axios.post(
      'https://fc-server.zapto.org/api/users/update-judge-level',
      { userId: selectedUser, judgeLevel: selectedJudgeLevel },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    alert('Судейский уровень обновлён');
    fetchUsers();
  } catch (error) {
    console.error('Ошибка обновления судейского уровня:', error);
    alert('Ошибка при обновлении судейского уровня');
  }
};


    return (
        <div className='conteiner-admin-panel'>
            <div>
                <h1>Administrācijas panelis</h1>
                {/* <h2>Statuses</h2>
                <ul>
                    {statuses.map(status => <li key={status}>{status}</li>)}
                </ul>
                <input
                    type="text"
                    placeholder="Add new status"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') addStatus(e.target.value);
                    }}
                /> */}
            </div>
            <div>
                <button className="fc-pos-btn" onClick={() => navigate('/account/refereeTestAdmin')}>
                    Referee Panel
                </button>
            </div>
            <div>
                <h2>Points</h2>
                <div>
                    <label htmlFor="userSelect">Choose User</label>
                    <select
                        id="userSelect"
                        onChange={(e) => {
                            const uid = Number(e.target.value);
                            setSelectedUser(uid);
                            const u = users.find(x => x.id === uid);
                            setSelectedExtraRoles(Array.isArray(u?.extra_roles) ? u.extra_roles : []);
                            setUserPerms(Array.isArray(u?.user_permissions) ? u.user_permissions : []);
                            if (Array.isArray(u?.nodarbibas)) {
                                setSelectedNodarbibas(u.nodarbibas);
                            } else {
                                setSelectedNodarbibas([]);
                            }
                            setSelectedBelt(u?.belt || '');
                            setSelectedJudgeLevel(u?.judge_level || '');
                        }}
                    >
                        <option value="">--Select User--</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.username} ({user.email})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Пояс */}
                <div>
                <label>Пояс пользователя:</label>
                <select
                    value={selectedBelt}
                    onChange={(e) => setSelectedBelt(e.target.value)}
                >
                    <option value="">--Выберите пояс--</option>
                    {beltOptions.map((b) => (
                    <option key={b} value={b}>
                        {b}
                    </option>
                    ))}
                </select>
                <button type="button" onClick={saveBelt}>
                    Сохранить пояс
                </button>
                </div>

                {/* Судейский уровень */}
                <div>
                <label>Судейский уровень:</label>
                <select
                    value={selectedJudgeLevel}
                    onChange={(e) => setSelectedJudgeLevel(e.target.value)}
                >
                    <option value="">--Выберите уровень--</option>
                    {judgeLevelOptions.map((lvl) => (
                    <option key={lvl} value={lvl}>
                        {lvl}
                    </option>
                    ))}
                </select>
                <button type="button" onClick={saveJudgeLevel}>
                    Сохранить судейский уровень
                </button>
                </div>


                {/* Выбор роли */}
                <div>
                    <label>Выберите новую роль:</label>
                    <select onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="">--Выберите роль--</option>
                        {roles.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleRoleChange}>Сменить роль</button>

                <div>
                    <label>Подроли (чекбоксы):</label>
                    <div className="roles-checkboxes" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:8, margin:'6px 0 8px' }}>
                    {roles.map((r) => {
                        const isMain = currentUser?.role === r; // основную роль нельзя назначать как подроль
                        const checked = selectedExtraRoles.includes(r);
                        return (
                        <label key={r} style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 8px', border:'1px solid rgba(255,255,255,.25)', borderRadius:8 }}>
                            <input
                            type="checkbox"
                            disabled={isMain}
                            checked={checked}
                            onChange={() => toggleExtraRole(r)}
                            />
                            <span>{r}{isMain ? ' (основная)' : ''}</span>
                        </label>
                        );
                    })}
                    </div>

                    <div style={{ display:'flex', gap:8 }}>
                    <button onClick={saveExtraRoles}>Сохранить подроли</button>
                    <button type="button" onClick={() => setSelectedExtraRoles([])}>Очистить</button>
                    </div>
                </div>

                {/* Nodarbības */}
                <div>
                <label>Nodarbības (Athlete / Coach / Judge / Support):</label>
                <div
                    className="nodarbibas-checkboxes"
                    style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))',
                    gap: 8,
                    margin: '6px 0 8px',
                    }}
                >
                    {nodarbibasOptions.map((opt) => {
                    const checked = selectedNodarbibas.includes(opt);
                    return (
                        <label
                        key={opt}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '6px 8px',
                            border: '1px solid rgba(255,255,255,.25)',
                            borderRadius: 8,
                        }}
                        >
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleNodarbiba(opt)}
                        />
                        <span>{opt}</span>
                        </label>
                    );
                    })}
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" onClick={saveNodarbibas}>
                    Сохранить nodarbības
                    </button>
                    <button type="button" onClick={() => setSelectedNodarbibas([])}>
                    Очистить
                    </button>
                </div>
                </div>



                {/* Выбор класса */}
                <div>
                    <label>Выберите новый класс:</label>
                    <select onChange={(e) => setSelectedClass(e.target.value)}>
                        <option value="">--Выберите класс--</option>
                        {Array.isArray(classes) ? (
                            classes.map(classItem => (
                                <option key={classItem} value={classItem}>{classItem}</option>
                            ))
                        ) : (
                            <option disabled>Ошибка загрузки классов</option>
                        )}
                    </select>
                </div>
                <button onClick={handleClassChange}>Сменить класс</button>

                {/* Обновление рейтинга и валюты */}
                <div>
                    <label htmlFor="expInput">Exp Points</label>
                    <input
                        type="number"
                        id="expInput"
                        value={exp}
                        onChange={(e) => setExp(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="currencyInput">Currency</label>
                    <input
                        type="number"
                        id="currencyInput"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    />
                </div>

                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default AdminPanel;
