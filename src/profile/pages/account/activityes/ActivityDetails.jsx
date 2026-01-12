// src/Pages/public/activity/ActivityDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import API from '../../../utils/api';
import { UserContext } from '../../../Context/UserContext';
import CompetitionJoinModal from './CompetitionJoinModal';
import ParticipantsModal from './participantsModal/ParticipantsModal';
import './activities.scss';


export default function ActivityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [busy, setBusy] = useState(false);
  const [openCompModal, setOpenCompModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState(null);

 useEffect(() => {
  let cancelled = false;

  (async () => {
    try {
      // 1) грузим саму активность
      const res = await API.get(`/activities/${id}`);
      if (cancelled) return;
      const base = res.data || {};
      setActivity(base);
    } catch (e) {
      if (!cancelled) setError(e.response?.data?.message || 'Neizdevās ielādēt aktivitāti');
      if (!cancelled) setLoading(false);
      return;
    }

    try {
      // 2) грузим участников (чтобы показать count и понять, присоединился ли пользователь)
      const token = localStorage.getItem('accessToken');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const resp = await API.get(`/activities/participants/${id}`, { headers });

      if (!cancelled) {
        const list = Array.isArray(resp.data) ? resp.data : [];
        // обновляем счётчик участников в стейте активности
        setActivity(prev => (prev ? { ...prev, participants_count: list.length } : prev));
        // если пользователь авторизован — отмечаем, присоединился ли он
        if (user?.id) setIsJoined(list.some(p => p.id === user.id));
      }
    } catch {
      // если participants недоступен без токена — просто оставим то, что пришло из /activities/:id
    } finally {
      if (!cancelled) setLoading(false);
    }
  })();

  return () => {
    cancelled = true;
  };
}, [id, user?.id]);

  if (loading) return <div className="activity-details container">Ielāde…</div>;
  if (error)   return <div className="activity-details container">❌ {error}</div>;
  if (!activity) return <div className="activity-details container">Aktivitāte nav atrasta</div>;

  const {
    title, description, coach, start_time, end_time,
    exp_points, currency_reward, location, image_url,
    max_participants, participants_count = 0
  } = activity;

  const fmt = (iso) => new Date(iso).toLocaleString('lv-LV', { dateStyle: 'long', timeStyle: 'short' });
  const imgSrc = image_url ? (image_url.startsWith('http') ? image_url : `https://fc-server.zapto.org${image_url}`) : null;

  const startsInMs = new Date(start_time) - new Date();
  const isFull = max_participants > 0 && participants_count >= max_participants;
  const startsSoon = startsInMs <= 60 * 60 * 1000; // < 1 часа до начала
  const finished = new Date(end_time) <= new Date();

  const canJoin = !isJoined && !isFull && !startsSoon && !finished;
  const canLeave = isJoined && !finished;

  const join = async () => {
  if (!user) {
    navigate(`/login?redirect=/activity/${id}`);
    return;
  }

  const status = (activity?.status || '').trim().toLowerCase();
  console.log('JOIN CLICK, status =', status); // 👉 посмотри в консоли

  const isCompetition = status === 'competition' || status === 'competitions';

  if (isCompetition) {
    // просто открываем модалку регистрации на соревнования
    setOpenCompModal(true);
    return;
  }

  // обычные активности (тренировки/мероприятия) — старый путь
  await API.post(
    '/activities/participate',
    { activity_id: Number(id) },
    { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
  );

  setIsJoined(true);
  setActivity(prev =>
    prev ? { ...prev, participants_count: (prev.participants_count || 0) + 1 } : prev
  );
  alert('✅ Вы успешно присоединились!');
};


  const submitCompetitionEntries = async (entries) => {
    try {
      await API.post('/activities/competitions/register',
        { activity_id: Number(id), entries },
        { headers:{ Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
      );
      setOpenCompModal(false);
      setIsJoined(true);
      setActivity(prev => prev ? { ...prev, participants_count: (prev.participants_count || 0) + 1 } : prev);
      alert('✅ Заявка на соревнования сохранена!');
    } catch (e) {
      alert(e.response?.data?.message || 'Не удалось сохранить заявку');
    }
  };

  const leave = async () => {
    setBusy(true);
    try {
      await API.post('/activities/leave', { activity_id: Number(id) }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      setIsJoined(false);
      setActivity((prev) => prev ? { ...prev, participants_count: Math.max((prev.participants_count || 1) - 1, 0) } : prev);
      alert('Вы вышли из участия.');
    } catch (error) {
      const msg = error.response?.data?.message || '❌ Не удалось выйти.';
      alert(msg);
    } finally {
      setBusy(false);
    }
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

    // Подтверждение или отклонение участия
    const updateParticipation = async (userId, activityId, isChecked) => {
        console.log('Отправляем данные:', { userId, activityId, attended: isChecked }); // ✅ Проверяем данные перед отправкой
        try {
            // Отправляем запрос на сервер
            const response = await API.post('/activities/confirm',{
                activityId,
                userId,
                attended: isChecked, // Состояние чекбокса
            });
              setParticipants((prevParticipants) =>
                prevParticipants.map((participant) =>
                    participant.id === userId
                        ? { ...participant, attended: isChecked }
                        : participant
                )
            );
            // Обновляем статистику
        } catch (error) {
            console.error('Ошибка при обновлении участия:', error);
            alert('Ошибка при обновлении участия');
        }
    };

  return (
    <article className="activity-details container" style={{maxWidth: 920, margin: '0 auto', padding: 16}}>
      <div className="head-activities-details">
        <h1>{title}</h1>
        <div className="meta" style={{marginBottom: 12}}>
          <div><strong>🕒</strong> {fmt(start_time)} — {fmt(end_time)}</div>
          {location && <div><strong>📍</strong> {location}</div>}
          {coach && <div><strong>👤</strong> {coach}</div>}
          <div><strong>👥</strong> {participants_count}/{max_participants || '∞'} &nbsp; | &nbsp;
        <strong>EXP:</strong> {exp_points} &nbsp; <strong>FUNS:</strong> {currency_reward}</div>
                  <button onClick={() => fetchParticipants(activity.id)}>Dalibnieki</button>

        </div>
      </div>

      {imgSrc && (
        <div className="cover" style={{margin: '12px 0'}}>
          <img src={imgSrc} alt={title} style={{width: '100%', height: 'auto', borderRadius: 12}} />
        </div>
      )}

      <section
        className="description"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description || '') }}
      />

      <div style={{display: 'flex', gap: 12, marginTop: 16}}>
        <Link to="/" className="btn">← Atpakaļ</Link>
         <Link to={`/activity/${id}/categories`} className="btn">
          Dalībnieki pa kategorijām
        </Link>

        {!finished && (
          <>
            {canJoin && (
              <button disabled={busy} onClick={join} className="btn join">
                ✅ Pievienoties
              </button>
            )}
            {canLeave && (
              <button disabled={busy} onClick={leave} className="btn leave">
                🚫 Atcelt dalību
              </button>
            )}
            {!canJoin && !isJoined && (
              <button className="btn" disabled>
                {isFull ? 'Pilns' : startsSoon ? 'Drīz sāksies' : 'Nav pieejams'}
              </button>
            )}
          </>
        )}
        {openCompModal && (
        <CompetitionJoinModal
            open={openCompModal}
            onClose={() => setOpenCompModal(false)}
            onSubmit={submitCompetitionEntries}
        />
        )}
        {showModal && (
         <ParticipantsModal
           activityId={selectedActivityId}
           participants={participants}
           onClose={() => setShowModal(false)}
           updateParticipation={updateParticipation}
         />
         
       )}
      </div>
    </article>
  );
}
