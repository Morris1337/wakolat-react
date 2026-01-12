import React, { useState, useEffect, useCallback, useContext } from 'react';
import API from '../../../../utils/api';
import { useNavigate } from 'react-router-dom';
import { hasPermission, hasRole, hasClass } from '../../../../utils/authUtils'; // ✅ Импорт функций
import { UserContext } from '../../../../Context/UserContext';

import '../fighter.scss';

export default function FighterCard({ img, fighter, category, discipline, activityRate, wight, id, club}) {
  const navigate = useNavigate();
  const { permissions } = useContext(UserContext);

  const handleProfileClick = () => {
    navigate(`/account/profile/${id}`); // Перенаправление на профиль пользователя
};  
  const [openFighterInfo, setOpenFighterInfo] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const ALLOWED_NODARBIBAS = ['Athlete', 'Coach', 'Judge', 'Support'];

  
  let nodarbibasForDisplay = [];
  const rawNodarbibas = profileData?.nodarbibas;

  if (Array.isArray(rawNodarbibas)) {
    // Если с бэка пришёл массив
    nodarbibasForDisplay = rawNodarbibas.filter((item) =>
      ALLOWED_NODARBIBAS.includes(item)
    );
  } else if (typeof rawNodarbibas === 'string') {
    // Если вдруг строка — режем по запятой/пробелу
    nodarbibasForDisplay = rawNodarbibas
      .split(/[,\s]+/)
      .map((s) => s.trim())
      .filter((item) => ALLOWED_NODARBIBAS.includes(item));
  }
  // const can = (permission) => permissions.includes(permission);


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

  useEffect(() => {
    fetchData(`/users/${id}`, setProfileData, 'Ошибка при загрузке профиля:');
  }, [id, fetchData]);
  
  // useEffect(() => {
  //   fetchData('/users/permissions', setPermissions, 'Ошибка при загрузке разрешений:');
  // }, []);

  useEffect(() => {
    console.log("✅ [DEBUG] Разрешения загружены:", permissions);
  }, [permissions]);

  const handleFighterInfo = (e) => {
    e.stopPropagation(); // Останавливаем всплытие события
    setOpenFighterInfo(!openFighterInfo);
  };

  const closeFighterInfo = (e) => {
    e.stopPropagation(); // Останавливаем всплытие события
    setOpenFighterInfo(false);
  };

  console.log("profileData:", profileData);

  const BACKEND = 'https://fc-server.zapto.org';

const resolveAvatarUrl = (raw) => {
  if (!raw) return '/static/default-avatar.png';            // общий запасной дефолт (лежит во фронте)

  let pp = String(raw).trim();

  // уже полный URL
  if (/^https?:\/\//i.test(pp)) return pp;

  // нормализуем лидирующий слэш
  if (!pp.startsWith('/')) pp = `/${pp}`;

  // все пути, которые отдаёт БЭКЕНД (их нужно префиксовать доменом сервера)
  const backendPrefixes = ['/uploads/', '/static/avatars/', '/static/avata-img/'];
  if (backendPrefixes.some(pref => pp.startsWith(pref))) {
    return `${BACKEND}${pp}`;
  }

  // иначе это фронтовый ассет
  return pp;
};


  return (
    <div
      className={`fighter-card ${openFighterInfo ? 'active' : ''}`}
      onClick={() => setOpenFighterInfo(true)} // Открываем окно при клике на карточку
    >
      <div className="fighter-img">
        <img
          // onClick={handleProfileClick} 
          src={resolveAvatarUrl(profileData?.profile_picture)}
          alt="User Profile"
          className="profile-img"
        />      
      </div>
      <div className="fighter-about">
        <h4>{fighter}</h4>
        <div className={`fighter-about-more ${openFighterInfo ? 'visible' : ''}`}>
          {/* Кнопка закрытия */}
          <div className="close-btn" onClick={closeFighterInfo}>X</div>
          {/* Информация о спортсмене */}
          <div className="fighter-img">
            <img
              onClick={handleProfileClick} 
              src={resolveAvatarUrl(profileData?.profile_picture)}
              alt="User Profile"
              className="profile-img"
            />     
          </div>
          
          <div>
          <p className="fighter-weight"> {profileData?.first_name || "Nav datu"}</p>
          <p className="fighter-club">Klubs: {club || "Nav norādīts"}</p>
          <p>{profileData?.role || "Нет данных"} ({profileData?.["class"] || ""})</p>
          <p className="fighter-discipline">{discipline || "Vēl nav piedalījusies"}</p>
          <p className='fighter-activity-rate'>
            Уровень: {profileData?.level ?? 'Нет данных'} ({profileData?.exp ?? 0} EXP)
          </p>
          {permissions.length > 0 && hasPermission(permissions, 'view_weight') && (
            <p className="fighter-weight">Svars: {wight || "Nav datu"}</p>
           )}
          {nodarbibasForDisplay.length > 0 ? (
            <p className="fighter-activity-rate">
              nodarbibas: {nodarbibasForDisplay.join(', ')}
            </p>
          ) : (
            <p className="fighter-activity-rate">nodarbibas: Нет данных</p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
