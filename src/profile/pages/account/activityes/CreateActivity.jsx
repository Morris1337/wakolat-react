// WAKOLAT

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DatePicker from "react-multi-date-picker";
import ReactQuill from 'react-quill';
import axios from 'axios';
import API from '../../../utils/api';



const CreateActivity = () => {
  const navigate = useNavigate();
    
    // const [gymState, setGymState] = useState(null);
    const [publishWakolat, setPublishWakolat] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        start_time: '',
        end_time: '',
        max_participants: '',
        exp_points: '',
        currency_reward: '',
        status: '',
        coach: '',
        is_marathon: false, // ✅ Теперь оно всегда будет либо true, либо false
        show_on_main: false
    });
    const [templates, setTemplates] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    // const [imageFile, setImageFile] = useState(null);
    const [selectedTemplateId, setSelectedTemplateId] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [registration_deadline, setRegistrationDeadline] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [image_second, setImageSecond] = useState(null);
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value // Обрабатываем чекбокс
        }));
    };

      const handleDescriptionChange = (html) => {
        setFormData(prev => ({ ...prev, description: html }));
    };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!selectedDates || selectedDates.length === 0) {
//     alert('Пожалуйста, выберите хотя бы одну дату.');
//     return;
//   }

//   const [sh, sm] = (formData.start_time || '').split(':').map(Number);
//   const [eh, em] = (formData.end_time   || '').split(':').map(Number);
//   const duration = (eh * 60 + em) - (sh * 60 + sm);
//   if (!Number.isFinite(duration) || duration <= 0) {
//     alert('⛔ Время окончания должно быть позже начала.');
//     return;
//   }

//   const datesISO = selectedDates.map(d => {
//     const base = new Date(d.toDate ? d.toDate() : d);
//     base.setHours(sh, sm, 0, 0);
//     return base.toISOString();
//   });

//   // -------- FunCatchers payload --------
//   const fc = new FormData();
//   fc.append('title',             formData.title || '');
//   fc.append('description',       formData.description || '');
//   fc.append('location',          formData.location || '');
//   fc.append('coach',             formData.coach || '');
//   fc.append('exp_points',        formData.exp_points || 0);
//   fc.append('currency_reward',   formData.currency_reward || 0);
//   fc.append('max_participants',  formData.max_participants || '');
//   fc.append('duration',          String(duration));
//   fc.append('status',            (formData.status || 'events').toLowerCase());
//   fc.append('competition_level', formData.competition_level || '');
//   fc.append('is_marathon',       formData.is_marathon ? 'true' : 'false');
//   fc.append('show_on_main',      formData.show_on_main ? 'true' : 'false');
//   fc.append('dates',             JSON.stringify(datesISO));

//   // контакты / коммерция
//   fc.append('country',               country || '');
//   fc.append('city',                  city || '');
//   fc.append('contact_email',         email || '');
//   fc.append('contact_phone',         phone_number || '');
//   fc.append('registration_deadline', registration_deadline || '');
//   if (price !== undefined && price !== null && String(price) !== '')
//     fc.append('price', String(price));

//   if (publishWakolat) fc.append('wakolat', 'true');

//   if (image)        fc.append('image', image);
//   if (image_second) fc.append('image_second', image_second);

//   // -------- WAKOLAT payload --------
//   const wak = new FormData();
//   wak.append('header',            formData.title || '');
//   wak.append('country',           country || '');
//   wak.append('city',              city || '');
//   wak.append('email',             email || '');
//   wak.append('phone_number',      phone_number || '');
//   wak.append('date_start',        datesISO[0]);
//   wak.append('date_end',          datesISO[datesISO.length - 1]);
//   wak.append('date_registration', registration_deadline || '');
//   if (price !== undefined && price !== null && String(price) !== '')
//     wak.append('price', String(price));
//   wak.append('text',              formData.description || '');
//   if (image)        wak.append('image', image);
//   if (image_second) wak.append('image_second', image_second);

//   try {
//     // Не указывай Content-Type вручную для FormData!
//     const sendFc  = API.post('/activities/create-multiple', fc);
//     const sendWak = publishWakolat
//       ? fetch('https://myproject123.zapto.org/api/competitions', { method: 'POST', body: wak })
//       : Promise.resolve({ ok: true });

//     const [fcRes, wakRes] = await Promise.allSettled([sendFc, sendWak]);

//     const fcOk  = fcRes.status === 'fulfilled';
//     const wakOk = publishWakolat
//       ? (wakRes.status === 'fulfilled' && (wakRes.value.ok !== false))
//       : true;

//     if (fcOk && wakOk) {
//       alert('Сохранено: FunCatchers + WAKOLAT ✅');
//       setFormData({
//         title:'', description:'', location:'', coach:'',
//         start_time:'', end_time:'', max_participants:'',
//         exp_points:'', currency_reward:'', status:'',
//         competition_level:'', is_marathon:false, show_on_main:false,
//       });
//       setSelectedDates([]);
//       setImage(null);
//       setImageSecond(null); // <- правильный сеттер
//       return;
//     }

//     let msg = 'Сохранено частично:\n';
//     if (!fcOk)  msg += '— FunCatchers: ошибка\n';
//     if (!wakOk) msg += '— WAKOLAT: ошибка\n';
//     alert(msg);

//     if (!fcOk)  console.error('FC error:',  fcRes.reason?.response?.data || fcRes.reason);
//     if (!wakOk) console.error('WAK error:', wakRes.reason || await wakRes.value?.text?.());
//   } catch (err) {
//     console.error(err);
//     alert('Не удалось отправить данные.');
//   }
// };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedDates || selectedDates.length === 0) {
    alert('Пожалуйста, выберите хотя бы одну дату.');
    return;
  }

  const [sh, sm] = (formData.start_time || '').split(':').map(Number);
  const [eh, em] = (formData.end_time   || '').split(':').map(Number);
  const duration = (eh * 60 + em) - (sh * 60 + sm);
  if (!Number.isFinite(duration) || duration <= 0) {
    alert('⛔ Время окончания должно быть позже начала.');
    return;
  }

  const datesISO = selectedDates.map(d => {
    const base = new Date(d.toDate ? d.toDate() : d);
    base.setHours(sh, sm, 0, 0);
    return base.toISOString();
  });

  // -------- FunCatchers payload --------
  const fc = new FormData();
  fc.append('title',             formData.title || '');
  fc.append('description',       formData.description || '');
  fc.append('location',          formData.location || '');
  fc.append('coach',             formData.coach || '');
  fc.append('exp_points',        formData.exp_points || 0);
  fc.append('currency_reward',   formData.currency_reward || 0);
  fc.append('max_participants',  formData.max_participants || '');
  fc.append('duration',          String(duration));
  fc.append('status',            (formData.status || 'events').toLowerCase());
  fc.append('competition_level', formData.competition_level || '');
  fc.append('is_marathon',       formData.is_marathon ? 'true' : 'false');
  fc.append('show_on_main',      formData.show_on_main ? 'true' : 'false');
  fc.append('dates',             JSON.stringify(datesISO));

  // контакты / коммерция
  fc.append('country',               country || '');
  fc.append('city',                  city || '');
  fc.append('contact_email',         email || '');
  fc.append('contact_phone',         phone_number || '');
  fc.append('registration_deadline', registration_deadline || '');
  if (price !== undefined && price !== null && String(price) !== '')
    fc.append('price', String(price));

  if (publishWakolat) fc.append('wakolat_events_permission', 'true');

  if (image)        fc.append('image', image);
  if (image_second) fc.append('image_second', image_second);

  // -------- WAKOLAT / Seminars payload --------
  const wak = new FormData();
  wak.append('header',            formData.title || '');
  wak.append('country',           country || '');
  wak.append('city',              city || '');
  wak.append('email',             email || '');
  wak.append('phone_number',      phone_number || '');
  wak.append('date_start',        datesISO[0]);
  wak.append('date_end',          datesISO[datesISO.length - 1]);
  wak.append('date_registration', registration_deadline || '');
  if (price !== undefined && price !== null && String(price) !== '')
    wak.append('price', String(price));
  wak.append('text',              formData.description || '');
  if (image)        wak.append('image', image);
  if (image_second) wak.append('image_second', image_second);

  const statusLower = (formData.status || '').toLowerCase();
  const isCompetition = ['competitions', 'competition'].includes(statusLower);
  const isSeminar     = ['seminars', 'seminar'].includes(statusLower);

  try {
    // Всегда отправляем в FunCatchers
    const sendFc = API.post('/activities/create-multiple', fc);

    // В WAKOLAT:
    // - если competitions → /api/competitions (как раньше)
    // - если seminars    → /api/seminars
    // - иначе            → ничего не шлём (только FC)
    let sendWakOrSem;

    if (publishWakolat && (isCompetition || isSeminar)) {
      const url = isCompetition
        ? 'https://myproject123.zapto.org/api/competitions'
        : 'https://myproject123.zapto.org/api/seminars';

      sendWakOrSem = fetch(url, {
        method: 'POST',
        body: wak,
      });
    } else {
      sendWakOrSem = Promise.resolve({ ok: true });
    }

    const [fcRes, wakRes] = await Promise.allSettled([sendFc, sendWakOrSem]);

    const fcOk  = fcRes.status === 'fulfilled';
    const wakOk = publishWakolat && (isCompetition || isSeminar)
      ? (wakRes.status === 'fulfilled' && (wakRes.value?.ok !== false))
      : true;

    if (fcOk && wakOk) {
      alert('Сохранено ✅');
      setFormData({
        title:'', description:'', location:'', coach:'',
        start_time:'', end_time:'', max_participants:'',
        exp_points:'', currency_reward:'', status:'',
        competition_level:'', is_marathon:false, show_on_main:false,
      });
      setSelectedDates([]);
      setImage(null);
      setImageSecond(null);
      return;
    }

    let msg = 'Сохранено частично:\n';
    if (!fcOk)  msg += '— FunCatchers: ошибка\n';
    if (!wakOk) msg += '— WAKOLAT: ошибка\n';
    alert(msg);

    if (!fcOk)  console.error('FC error:',  fcRes.reason?.response?.data || fcRes.reason);
    if (!wakOk) console.error('WAK error:', wakRes.reason || await wakRes.value?.text?.());
  } catch (err) {
    console.error(err);
    alert('Не удалось отправить данные.');
  }
};


    const trainers = [
        'Darja Strutinska',
        'Anastasija Kožukovska',
        'Iļja Kožukovskis',
        'Aleksandrs Maslovs',
        'Linda Abele',
    ];

    const handleSaveTemplate = async () => {
        try {
            await API.post('/activities/save-template', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            alert('Шаблон сохранён!');
        } catch (error) {
            console.error('Ошибка сохранения шаблона:', error);
            alert('Ошибка при сохранении шаблона');
        }
    };
    
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await API.get('/activities/templates', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                });
                setTemplates(response.data);
            } catch (error) {
                console.error('Ошибка загрузки шаблонов:', error);
            }
        };
    
        fetchTemplates();
    }, []);
    
    const applyTemplate = (template) => {
  const hhmm = (t) => (t ? String(t).slice(0,5) : ''); // 'HH:MM'
  setFormData({
    title: template.title || '',
    description: template.description || '',
    start_time: hhmm(template.start_time),
    end_time: hhmm(template.end_time),
    max_participants: template.max_participants ?? '',
    exp_points: template.exp_points ?? '',
    currency_reward: template.currency_reward ?? '',
    status: template.status || '',
    coach: template.coach || '',
    is_marathon: !!template.is_marathon,
    show_on_main: !!template.show_on_main
  });
};

    // те же modules/formats, что и в ShopPanel.jsx
  const quillModules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ header: 1 }, { header: 2 }],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['clean']
    ]
  };

  const quillFormats = [
    'font','size','bold','italic','underline','strike',
    'color','background','script','header','align',
    'list','bullet','blockquote','code-block'
  ];

    return (
        <div className="create-activity">
            <h2>Create Activity</h2>
            <Link to="/account/createNews">Tiesnešu teorētiskais tests</Link>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title/Название"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <label>Описание:</label>
                <div className="editor-wrap">
                <ReactQuill
                    theme="snow"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    modules={quillModules}
                    formats={quillFormats}

                    placeholder="Оформите описание: заголовки, списки, выделение..."
                />
                </div>
                <input type="text" value={country} onChange={e=>setCountry(e.target.value)} placeholder="Country" />
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
                <input type="tel" value={phone_number} onChange={e=>setPhoneNumber(e.target.value)} placeholder="Phone" />
                <input type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price EUR" />

                <input
                    type="text"
                    name="location"
                    placeholder="Norises vieta/Место(необязательно)"
                    value={formData.location || ''}
                    onChange={handleChange}
                />
                <input
                type="text"
                value={city}
                onChange={e=>setCity(e.target.value)}
                placeholder="City"
                required={publishWakolat}
                />
                <input
                    type="time"
                    name="start_time"
                    placeholder="Start Time"
                    value={formData.start_time}
                    onChange={handleChange}
                    required
                />
                <input
                    type="time"
                    name="end_time"
                    placeholder="End Time"
                    value={formData.end_time}
                    onChange={handleChange}
                    required
                />
                <DatePicker
                    className='date-picker'
                    multiple
                    value={selectedDates}
                    onChange={setSelectedDates}
                    format="YYYY-MM-DD"
                    placeholder='YYYY-MM-DD'
                />
                <input
                    type="number"
                    name="max_participants"
                    placeholder="Max Participants"
                    value={formData.max_participants}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="exp_points"
                    placeholder="EXP Points"
                    value={formData.exp_points}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="currency_reward"
                    placeholder="FUNS Currency Reward"
                    value={formData.currency_reward}
                    onChange={handleChange}
                    required
                />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                >
                    <option value="">Выберите категорию</option>
                    <option value="trainings">Тренировки</option>
                    <option value="competitions">Соревнования</option>
                    <option value="events">Мероприятия</option>
                    <option value="seminars">Семинары</option>
                    <option value="Others">Другое</option>
                </select>
                {['competitions','competition'].includes((formData.status || '').toLowerCase()) && (
                <label>
                    Тип соревнований:
                    <select
                    name="competition_level"
                    value={formData.competition_level || ''}
                    onChange={handleChange}
                    >
                    <option value="">— выбрать —</option>
                    <option value="open_ring">Открытый ринг</option>
                    <option value="championship">Чемпионат</option>
                    <option value="world_cup">Кубок мира</option>
                    <option value="eu_world_championship">Чемпионат Европы/Мира</option>
                    </select>
                </label>
                )}


                <select name="coach" value={formData.coach} onChange={handleChange} required>
                <option value="">Выберите тренера</option>
                {trainers.map(trainer => (
                    <option key={trainer} value={trainer}>{trainer}</option>
                ))}
            </select>
            {/* ✅ Чекбокс для выбора марафона */}
            <input type="file" accept="image/*" onChange={e=>setImage(e.target.files?.[0] || null)} />
            <input type="file" accept="image/*" onChange={e=>setImageSecond(e.target.files?.[0] || null)} />
            <label className='create_marathon'>
                <input type="checkbox" name="is_marathon" checked={formData.is_marathon} onChange={handleChange} />
                Это марафон?
            </label>
            <label className='main_page_news'>
                <input
                    type="checkbox"
                    name="show_on_main"
                    checked={formData.show_on_main || false}
                    onChange={handleChange}
                />
                Parādīt galvenajā lapā/На главной странице?
            </label>
            {/* <input
            className='image_upload'
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            /> */}
            <label>
                <input type="checkbox"
                        checked={publishWakolat}
                        onChange={(e)=>setPublishWakolat(e.target.checked)} />
                Публикация от WAKOLAT
            </label>

            <button className='button' type="submit"><b>Create</b></button>
            <button className='button' type="button" onClick={handleSaveTemplate}><b>Сохранить как шаблон</b></button>
            </form>

            <div className="template-select" style={{ marginTop: 16 }}>
                <h3>Выберите шаблон:</h3>
                <select
                    value={selectedTemplateId}
                    onChange={(e) => {
                    const id = Number(e.target.value);
                    setSelectedTemplateId(e.target.value);
                    const tpl = templates.find(t => t.id === id);
                    if (tpl) applyTemplate(tpl); // применяем сразу при выборе
                    }}
                    style={{ minWidth: 280, padding: '6px 8px', borderRadius: 8 }}
                >
                    <option value="" disabled>— Выберите —</option>
                    {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                </select>
                {!!selectedTemplateId && (
                    <button
                    type="button"
                    className="button"
                    onClick={() => setSelectedTemplateId('')}
                    style={{ marginLeft: 8 }}
                    >
                    Сбросить выбор
                    </button>
                )}
                </div>
        </div>
    );
};

export default CreateActivity;
