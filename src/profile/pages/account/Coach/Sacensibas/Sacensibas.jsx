import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../../Context/UserContext';
import { Link } from 'react-router-dom';
import API from '../../../../utils/api';
import DOMPurify from 'dompurify';
import './Sacensibas.scss';

export default function Sacensibas() {
  const { user } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [sel, setSel] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(false);

  const canCoach = Boolean(
  user?.permissions?.includes('FC_Coach') ||
  ['coach','admin','superadmin','moderator'].includes((user?.role||'').toLowerCase())
);

  useEffect(() => {
    (async () => {
      const res = await API.get('/activities', {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      const all = (res.data || []).filter(a => ['competition','competitions'].includes((a.status||'').toLowerCase()));
      const now = Date.now();
      const upcoming = all.filter(a => new Date(a.start_time).getTime() >= now).sort((a,b)=>new Date(a.start_time)-new Date(b.start_time));
      const past     = all.filter(a => new Date(a.start_time).getTime() <  now).sort((a,b)=>new Date(b.start_time)-new Date(a.start_time));
      setList([...upcoming, ...past]);
    })();
  }, []);

  const pick = async (act) => {
    setSel(act);
    setLoadingEntries(true);
    try {
      const r = await API.get(`/activities/${act.id}/competitions/entries`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      setEntries(r.data.entries || []);
    } finally { setLoadingEntries(false); }
  };

  const refresh = () => sel && pick(sel);

  const saveResults = async (userId, myResults) => {
    await API.post(`/activities/${sel.id}/competitions/results`, {
      user_id: userId,
      results: myResults
    }, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }});
    alert('Сохранено');
    refresh();
  };

return (
  <div className="sacensibas">
    <h1 className="sacensibas__title">Sacensības (Treneriem)</h1>

    <div className="sacensibas__grid">
      {/* левая колонка — список турниров */}
      <aside className="sacensibas__left sacensibas__card">
        <div className="sacensibas__header">Список соревнований</div>
        <div className="sacensibas__list sacensibas__list--mobile">
          {list.map(a => (
            <button
              key={a.id}
              onClick={() => pick(a)}
              className={`sacensibas__event ${sel?.id === a.id ? 'is-active' : ''}`}
              type="button"
            >
              <span className="sacensibas__event-date">
                {new Date(a.start_time).toLocaleDateString('lv-LV')}
              </span>
              <span className="sacensibas__event-title">
                {a.title}
              </span>
            </button>
          ))}
        </div>
      </aside>

      {/* правая колонка — детали */}
      <section className="sacensibas__right sacensibas__card">
        <div className="sacensibas__header">
          {sel ? (sel.title || '') : 'Выберите соревнование слева'}
        </div>

        <div className="sacensibas__panel">
          {!sel && <div className="sacensibas__empty">— Выберите соревнование слева —</div>}
          {sel && (
            <>
              <div
                className="sacensibas__desc"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sel.description || '') }}
              />

              {canCoach && <AddAthletePanel activityId={sel.id} onDone={refresh} />}

              <h4 className="sacensibas__subhead">Заявки вашего клуба</h4>
              {loadingEntries
                ? <p>Ielāde…</p>
                : <CoachEntriesTable
                    entries={entries}
                    onSave={saveResults}
                    activityId={sel.id}
                    onChanged={refresh}
                  />
              }
                            <h4 className="sacensibas__subhead" style={{ marginTop: 24 }}>
                Спортсмены по категориям (все клубы)
              </h4>
              <CompetitionCategoriesBlock activityId={sel.id} />
              <div className="sacensibas__actions">
              <Link
                to={`/profile/sacensibasWako/${sel.id}/categories`}
                className="sacensibas__btn sacensibas__btn--secondary"
              >
                Список соперников по категориям
              </Link>
              <Link
                to={`/account/sacensibasWako/${sel.id}/wako/participants`}
                className="sacensibas__btn sacensibas__btn--secondary"
              >
                WAKO — списки спортсменов
              </Link>
              <Link
                to={`/account/sacensibasWako/${sel.id}/wako/participants`}
                className="sacensibas__btn sacensibas__btn--secondary"
              >
                Добавить спортсменов (WAKO)
              </Link>
            </div>
            </>
          )}
        </div>
      </section>
    </div>
  </div>
);
}

function CoachEntriesTable({ entries, onSave, activityId, onChanged }) {
  const byUser = entries.reduce((m, e) => {
    (m[e.user_id] ||= { user: e, cats: [] });
    m[e.user_id].cats.push(e);
    return m;
  }, {});
  const users = Object.values(byUser);

  return (
    <div style={{display:'grid', gap:12}}>
      {users.map(({ user, cats }) => (
        <div key={user.user_id} style={{border:'1px solid rgba(255,255,255,.15)', borderRadius:8, padding:8}}>
          <b>{user.first_name || user.username} ({user.club || '—'})</b>

          <ul>
            {cats.map((c) => (
              <EntryRow key={c.id} c={c} activityId={activityId} onChanged={onChanged}/>
            ))}
          </ul>

          {/* Добавить ещё категорию этому спортсмену */}
          <InlineAddCategory userId={user.user_id} activityId={activityId} onAdded={onChanged}/>

          <button onClick={()=>{
            const results = cats
              .filter(c => c._newPlace !== undefined && c._newPlace !== '')
              .map(c => ({ style: c.style, weight_class: c.weight_class, place: Number(c._newPlace) }));
            if (!results.length) return alert('Не указаны места');
            onSave(user.user_id, results);
          }}>Сохранить результаты</button>
        </div>
      ))}
    </div>
  );
}

function EntryRow({ c, activityId, onChanged }) {
  const [edit, setEdit] = useState(false);
  const [style, setStyle] = useState(c.style || '');
  const [weight, setWeight] = useState(c.weight_class || '');
  return (
    <li  style={{display:'flex', gap:8, alignItems:'center', marginTop:6}}>
      {!edit ? (
        <>
          <span className='athlete-info-text'>
            {c.sport} — {c.role}{c.style ? ` — ${c.style}`:''}{c.weight_class ? ` (${c.weight_class})`:''}
          </span>
          <span className='athlete-info-text'>Место:</span>
          <input type="number" defaultValue={c.place || ''} min="0"
                 onChange={(e)=>{ c._newPlace = e.target.value; }} style={{width:80}} />

          <button onClick={()=>setEdit(true)}>Редактировать</button>
          <button onClick={async ()=>{
            if (!window.confirm('Удалить категорию?')) return;
            await API.delete(`/activities/${activityId}/competitions/entry/${c.id}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            });
            onChanged();
          }}>Удалить</button>
        </>
      ) : (
        <>
          <select value={style} onChange={e=>setStyle(e.target.value)}>
            <option value="">— Стиль —</option>
            {['PF','KL','LC','LK','FC','K1'].map(s=><option key={s} value={s}>{s}</option>)}
          </select>
          <input placeholder="Весовая категория" value={weight} onChange={e=>setWeight(e.target.value)} style={{width:140}}/>
          <button onClick={async ()=>{
            await API.patch(`/activities/${activityId}/competitions/entry/${c.id}`, {
              style, weight_class: weight
            }, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }});
            setEdit(false);
            onChanged();
          }}>Сохранить</button>
          <button onClick={()=>{ setEdit(false); setStyle(c.style||''); setWeight(c.weight_class||''); }}>Отмена</button>
        </>
      )}
    </li>
  );
}

function InlineAddCategory({ userId, activityId, onAdded }) {
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState('');
  const [weight, setWeight] = useState('');
  if (!open) return <button onClick={()=>setOpen(true)}>Добавить категорию</button>;

  return (
    <div style={{display:'flex', gap:8, alignItems:'center', margin:'6px 0 10px'}}>
      <select value={style} onChange={e=>setStyle(e.target.value)}>
        <option value="">— Стиль —</option>
        {['PF','KL','LC','LK','FC','K1'].map(s=><option key={s} value={s}>{s}</option>)}
      </select>
      <input placeholder="Весовая категория" value={weight} onChange={e=>setWeight(e.target.value)} style={{width:140}}/>
      <button onClick={async ()=>{
        if (!style || !weight) return alert('Укажи стиль и вес');
        await API.post(`/activities/${activityId}/competitions/coach-register`, {
          user_id: userId,
          entries: [{ sport:'kickbox', role:'athlete', style, weight_class: weight }]
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }});
        setOpen(false); setStyle(''); setWeight('');
        onAdded();
      }}>Добавить</button>
      <button onClick={()=>{ setOpen(false); setStyle(''); setWeight(''); }}>Отмена</button>
      <button onClick={async ()=>{
        if (!style || !weight) return alert('Укажи стиль и вес');
        try {
          await API.post(`/activities/${activityId}/competitions/coach-register`, {
            user_id: userId,
            entries: [{ sport:'kickbox', role:'athlete', style, weight_class: weight }]
          }, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }});
          setOpen(false); setStyle(''); setWeight('');
          onAdded();
        } catch (err) {
          alert(err.response?.data?.message || err.message);
        }
      }}>Добавить</button>

    </div>
  );
}

function AddAthletePanel({ activityId, onDone }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [athletes, setAthletes] = useState([]);
  const [userId, setUserId] = useState('');
  const [rows, setRows] = useState([{ sport:'kickbox', role:'athlete', style:'', weight_class:'' }]);

  useEffect(()=>{
    if (!open) return;
    const load = async () => {
      const res = await API.get(`/activities/coach/club-athletes?q=${encodeURIComponent(q)}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      setAthletes(res.data?.items || []);
    };
    load();
  }, [open, q]);

  if (!open) return <button onClick={()=>setOpen(true)}>+ Добавить спортсмена</button>;

  const setRow = (i, patch) => {
    setRows(rs => rs.map((r,idx)=> idx===i ? {...r, ...patch} : r));
  };

  

  return (
    <div style={{border:'1px dashed rgba(255,255,255,.35)', padding:10, borderRadius:8, margin:'8px 0 14px'}}>
      <div style={{display:'flex', gap:8, alignItems:'center', flexWrap:'wrap'}}>
        <b>Добавить спортсмена:</b>
        <input placeholder="Поиск по клубу" value={q} onChange={e=>setQ(e.target.value)} />
        <select value={userId} onChange={e=>setUserId(e.target.value)}>
          <option value="">— Выбери спортсмена —</option>
          {athletes.map(a=>(
            <option key={a.id} value={a.id}>
              {(a.last_name||'') + ' ' + (a.first_name||'') || a.username} (#{a.id})
            </option>
          ))}
        </select>
      </div>

      <div style={{marginTop:8}}>
        {rows.map((r, i)=>(
          <div key={i} style={{display:'flex', gap:8, alignItems:'center', margin:'6px 0', flexWrap:'wrap'}}>
            <select value={r.sport} onChange={e=>setRow(i,{sport:e.target.value})}>
              <option value="kickbox">Kickbox</option>
              <option value="run">Run</option>
            </select>
            <select value={r.role} onChange={e=>setRow(i,{role:e.target.value})}>
              <option value="athlete">Athlete</option>
              <option value="coach">Coach</option>
              <option value="judge">Judge</option>
              <option value="support">Support</option>
            </select>

            {r.sport==='kickbox' && r.role==='athlete' && (
              <>
                <select value={r.style} onChange={e=>setRow(i,{style:e.target.value})}>
                  <option value="">— Стиль —</option>
                  {['PF','KL','LC','LK','FC','K1'].map(s=><option key={s} value={s}>{s}</option>)}
                </select>
                <input placeholder="Весовая категория" value={r.weight_class||''}
                       onChange={e=>setRow(i,{weight_class:e.target.value})} style={{width:140}}/>
              </>
            )}

            {rows.length>1 && <button onClick={()=>setRows(rs=>rs.filter((_,idx)=>idx!==i))}>Удалить</button>}
          </div>
        ))}
        <button onClick={()=>setRows(rs=>[...rs, { sport:'kickbox', role:'athlete', style:'', weight_class:'' }])}>+ Добавить ещё категорию</button>
      </div>

      <div style={{marginTop:8, display:'flex', gap:8}}>
        // Sacensibas.jsx — компонент AddAthletePanel
// Замените обработчик "Сохранить":

<button onClick={async ()=>{
  if (!userId) return alert('Выберите спортсмена');
  const clean = rows.filter(r=>{
    if (r.sport==='kickbox' && r.role==='athlete') return r.style && r.weight_class;
    return true;
  });
  if (!clean.length) return alert('Заполни хотя бы одну категорию');
  try {
    await API.post(`/activities/${activityId}/competitions/coach-register`, {
      user_id: Number(userId),
      entries: clean
    }, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }});
    setOpen(false); setRows([{ sport:'kickbox', role:'athlete', style:'', weight_class:'' }]); setUserId(''); setQ('');
    onDone();
  } catch (err) {
    alert(err?.response?.data?.message || err.message);
  }
}} >
  Сохранить
</button>


        <button onClick={()=>{ setOpen(false); setRows([{ sport:'kickbox', role:'athlete', style:'', weight_class:'' }]); setUserId(''); setQ(''); }}>
          Отмена
        </button>
      </div>
      
    </div>
  );
}

function CompetitionCategoriesBlock({ activityId }) {
  const { user } = useContext(UserContext);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);

  const myClub = (user?.club || '').trim().toLowerCase();

  useEffect(() => {
    if (!activityId) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/activities/${activityId}/competitions/categories`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        setCats(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activityId]);

  if (!activityId) return null;

  return (
    <div className="sacensibas__categories">
      {loading && <p>Ielāde…</p>}
      {!loading && cats.length === 0 && (
        <p>Пока нет заявленных спортсменов.</p>
      )}

      <div className="sacensibas__categories-grid">
        {cats.map(cat => {
          const key = `${cat.sport}|${cat.style || ''}|${cat.weight_class || ''}`;
          // красивый заголовок категории
          let title = '';
          if (cat.sport === 'kickbox') {
            title = (cat.style ? `${cat.style} ` : '') + (cat.weight_class || '');
          } else if (cat.sport === 'run') {
            title = `Run ${cat.weight_class || ''}`;
          } else {
            title = `${cat.sport} ${cat.weight_class || ''}`;
          }

          return (
            <div key={key} className="sacensibas__categories-card">
              <div className="sacensibas__categories-title">
                {title} <span className="sacensibas__categories-count">
                  ({cat.athletes.length})
                </span>
              </div>

              <ul className="sacensibas__categories-list">
                {cat.athletes.map(a => {
                  const aClub = (a.club || '').trim().toLowerCase();
                  const isMyClub = myClub && aClub === myClub;

                  return (
                    <li key={a.user_id} className="sacensibas__categories-item">
                      <span
                        className="sacensibas__categories-name"
                        style={isMyClub ? { fontWeight: 'bold' } : undefined}
                      >
                        {(a.last_name || '') + ' ' + (a.first_name || a.username || '')}
                      </span>
                      <span className="sacensibas__categories-club">
                        {a.club || '—'}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
