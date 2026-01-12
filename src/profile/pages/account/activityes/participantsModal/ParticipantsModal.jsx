import React, {useState, useEffect} from 'react';
import '../activities.scss';
import API from '../../../../utils/api';
import { useNavigate } from 'react-router-dom';

export default function ParticipantsModal({
  activityId,
  participants = [],
  onClose = () => {},
  updateParticipation = () => {},
  id
}) {

    const [profiles, setProfiles] = useState([]); // [{id, profile_picture, ...}]


    const navigate = useNavigate();
    
    const userRole = localStorage.getItem('role'); // Роль пользователя

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


    const handleAttendanceChange = async (userId, isChecked) => {
        try {
            updateParticipation(userId, activityId, isChecked);
        } catch (error) {
            console.error('Ошибка при обновлении статуса участия:', error);
        }
    };

    const handleProfileClick = (userId) => {
        navigate(`/account/profile/${userId}`);
    };
    console.log("Participants:", participants);

      useEffect(() => {
        const fetchProfiles = async () => {
        try {
            const responses = await Promise.all((participants || []).map(p => API.get(`/users/${p.id}`)));
            setProfiles(responses.map(res => res.data));
        } catch (error) {
            console.error('Ошибка загрузки профилей:', error);
        }
        };
        if (participants.length > 0) fetchProfiles();
    }, [participants]);

    const getPic = (p) => {
        const fromList = p?.profile_picture;
        const fromProfile = profiles.find(x => x.id === p.id)?.profile_picture;
        return resolveAvatarUrl(fromList || fromProfile);
    };

    
    

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Dalībnieki</h3>
                    <ul>
                    {(participants || []).map((participant) => (
                        <li key={participant.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                            onClick={() => handleProfileClick(participant.id)}
                            className="participant-avatar"
                            src={getPic(participant)}
                            alt="Profile"
                        />
                        <span>{participant.first_name}</span>
            {/* <span className='participant-role-class'>{participant.role} ({participant.class})</span> */}
                        {/* Отображение чекбокса для администраторов */}
                            {['superadmin', 'admin', 'moderator', 'coach'].includes(userRole) && (
                                <input
                                    type="checkbox"
                                    checked={participant.attended || false} // Отображение значения из API
                                    onChange={(e) => handleAttendanceChange(participant.id, e.target.checked)} // Обновление по клику
                                />
                                                       
                            )}

                        </li>
                    ))}
                    </ul>
                <button onClick={onClose}>Aizvērt</button>
            </div>
        </div>
    );
}

