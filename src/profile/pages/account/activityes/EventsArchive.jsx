// src/Pages/public/activity/EventsArchive.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import API from '../../../utils/api';

const BASE = 'https://fc-server.zapto.org';

export default function EventsArchive() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get('/activities/events-archive');
        setItems(res.data || []);
      } catch (e) {
        console.error('Не удалось загрузить события', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const f = from ? new Date(from) : null;
    const t = to ? new Date(to) : null;
    return items.filter(x => {
      const d = new Date(x.start_time);
      return (!f || d >= f) && (!t || d <= t);
    });
  }, [items, from, to]);

  const now = Date.now();
  const upcoming = filtered.filter(a => new Date(a.start_time).getTime() >= now)
                           .sort((a,b) => new Date(a.start_time) - new Date(b.start_time));
  const past     = filtered.filter(a => new Date(a.start_time).getTime() <  now)
                           .sort((a,b) => new Date(b.start_time) - new Date(a.start_time));

  const fmt = (iso) => new Date(iso).toLocaleString('lv-LV', { dateStyle: 'long', timeStyle: 'short' });

  if (loading) return <div className="container">Ielāde…</div>;

  return (
    <section className="events-archive container" style={{maxWidth: 1100, margin:'0 auto', padding:16}}>
      <header style={{display:'flex', gap:12, alignItems:'end', flexWrap:'wrap', marginBottom:16}}>
        <h1 style={{marginRight:'auto'}}>🏆 Galvenie notikumi</h1>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <label>No: <input type="date" value={from} onChange={e=>setFrom(e.target.value)} /></label>
          <label>Līdz: <input type="date" value={to} onChange={e=>setTo(e.target.value)} /></label>
          <button onClick={()=>{setFrom(''); setTo('');}}>Notīrīt</button>
        </div>
      </header>

      <Section title="Plānotie notikumi" empty="Nav gaidāmu notikumu">
        {upcoming.map(ev => (
          <Card key={ev.id} ev={ev} fmt={fmt} />
        ))}
      </Section>

      <Section title="Aizvadītie notikumi" empty="Nav arhīva notikumu">
        {past.map(ev => (
          <Card key={ev.id} ev={ev} fmt={fmt} />
        ))}
      </Section>
    </section>
  );
}

function Section({ title, empty, children }) {
  return (
    <div style={{marginTop: 12}}>
      <h2 style={{margin:'12px 0'}}>{title}</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16}}>
        {React.Children.count(children) ? children : <p style={{opacity:.7}}>{empty}</p>}
      </div>
    </div>
  );
}

function Card({ ev, fmt }) {
  const img = ev.image_url ? (ev.image_url.startsWith('http') ? ev.image_url : `${BASE}${ev.image_url}`) : null;
  return (
    <article style={{border:'1px solid rgba(255,255,255,.15)', borderRadius:12, padding:12, background:'rgba(255,255,255,.04)'}}>
      {img && <Link to={`/activity/${ev.id}`}><img src={img} alt={ev.title} style={{width:'100%', borderRadius:8}}/></Link>}
      <h3 style={{margin:'8px 0'}}><Link to={`/activity/${ev.id}`}>{ev.title}</Link></h3>
      <div style={{fontSize:14, opacity:.9, display:'grid', gap:2, marginBottom:8}}>
        <span>🕒 {fmt(ev.start_time)}{ev.end_time ? ` — ${fmt(ev.end_time)}`:''}</span>
        {ev.location && <span>📍 {ev.location}</span>}
        <span>👥 {ev.participants_count ?? 0} | EXP: {ev.exp_points} | FUNS: {ev.currency_reward}</span>
      </div>
      <div
        style={{display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden'}}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(ev.description || '') }}
      />
      <div style={{display:'flex', gap:8, marginTop:8}}>
        <Link to={`/activity/${ev.id}`} className="btn">📖 Vairāk</Link>
        <Link to={`/activity/${ev.id}#participants`} className="btn" title="Skatīt dalībniekus">👥 Dalībnieki</Link>
      </div>
    </article>
  );
}
