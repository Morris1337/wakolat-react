import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../../../../utils/api';

// const ToggleGym = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         const params = new URLSearchParams(location.search);
//         const userId = params.get('userId');

//         if (!userId) {
//             alert("Ошибка: пользователь не авторизован.");
//             navigate('/');
//             return;
//         }

//         // Проверяем, записан ли пользователь в зал
//         API.get('/activities/gym-state', {
//             headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
//         }).then((response) => {
//             alert("🔍 Данные от API:", response.data); // ✅ Логируем API-ответ
//             alert("🔍 API-ответ от /activities/gym-state:", response.data); // ✅ Логируем API-ответ

//             if (!response.data || !response.data.participants) {
//                     console.log("📡 API-ответ от /activities/gym-state:", response.data);
//                     alert("Ошибка: данные о зале не загружены. Посмотрите консоль (F12 → Console).");
//                 navigate('/');
//                 return;
//             }

//             const isJoined = response.data.participants.some(participant => participant.id.toString() === userId);

//             if (isJoined) {
//                 // Пользователь записан → удаляем его
//                 API.post('/activities/leave', { activity_id: response.data.id }, {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
//                 }).then(() => {
//                     alert("Вы покинули зал.");
//                     navigate('/');
//                 }).catch(err => {
//                     console.error('Ошибка при выходе из зала:', err);
//                     alert("Не удалось выйти из зала.");
//                     navigate('/');
//                 });
//             } else {
//                 // Пользователь не записан → записываем его
//                 API.post('/activities/gym-visit', {}, {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
//                 }).then(() => {
//                     alert("Вы записаны в зал.");
//                     navigate('/');
//                 }).catch(err => {
//                     console.error('Ошибка при записи в зал:', err);
//                     alert("Не удалось записаться в зал.");
//                     navigate('/');
//                 });
//             }
//         }).catch(err => {
//             console.error('Ошибка при проверке статуса зала:', err);
//             alert("Ошибка при проверке статуса зала.");
//             navigate('/');
//         });

//     }, [location, navigate]);

//     return <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Обработка QR-кода...</h2>;
// };

const ToggleGym = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("🔍 QR-код отсканирован, перенаправляем...");
        
        // Через 1 секунду перенаправляем на страницу активностей
        setTimeout(() => {
            navigate("/account/activities");
        }, 1000);
    }, []);

    return (
        <div className="qr-processing">
            <h2>Обработка QR-кода...</h2>
        </div>
    );
};

export default ToggleGym;
