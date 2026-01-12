import React, { useState, useEffect } from 'react';
import './activities.scss';

export default function CompetitionJoinModal({ open, onClose, onSubmit }) {
  const [sport, setSport] = useState('');
  const [role, setRole] = useState('');
  const [entries, setEntries] = useState([]); // [{sport,role,style,weight_class}]

  const [style, setStyle] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    if (open) {
      setSport('');
      setRole('');
      setEntries([]);
      setStyle('');
      setWeight('');
    }
  }, [open]);

  if (!open) return null;

  const resetCategory = () => { setStyle(''); setWeight(''); };

  const addCategory = () => {
    if (!sport || !role) return alert('Выберите соревнование и роль');
    if (sport === 'kickbox' && role === 'athlete') {
      if (!style) return alert('Выберите стиль (PF/KL/...)');
      if (!weight) return alert('Укажите вес');
    }
    const e = { sport, role, style: style || null, weight_class: weight || null };
    setEntries(prev => [...prev, e]);
    if (role === 'athlete') resetCategory();
  };

  const submit = () => {
    if (!entries.length) return alert('Добавьте хотя бы одну категорию/роль');
    onSubmit(entries);
  };

  return (
    <div className="competition-modal-backdrop">
      <div className="competition-modal">
        <h3>Reģistrācija sacensībām</h3>

        <label>Sacensības:</label>
        <select value={sport} onChange={e => { setSport(e.target.value); setRole(''); resetCategory(); }}>
          <option value="">— izvēlēties —</option>
          <option value="kickbox">Kikbokss</option>
          {/* <option value="boxing">Bokss</option> */}
          <option value="run">Skriešana</option>
        </select>

        {sport && (
          <>
            <label>Loma:</label>
            <select value={role} onChange={e => { setRole(e.target.value); resetCategory(); }}>
              <option value="">— izvēlēties —</option>
              {sport === 'kickbox' && (
                <>
                  <option value="athlete">Sportists</option>
                  <option value="judge">Tiesniesis</option>
                  <option value="coach">Treneris</option>
                  <option value="support">Atbalsta</option>
                </>
              )}
              {sport === 'boxing' && (
                <>
                  <option value="athlete">Sportists</option>
                  <option value="judge">Tiesniesis</option>
                  <option value="coach">Treneris</option>
                  <option value="support">Atbalsta</option>
                </>
              )}
              {sport === 'run' && (
                <>
                  <option value="athlete">Sportists</option>
                  <option value="support">Atbalsta</option>
                </>
              )}
            </select>
          </>
        )}

        {sport === 'kickbox' && role === 'athlete' && (
          <>
            <label>Stils:</label>
            <select value={style} onChange={e => setStyle(e.target.value)}>
              <option value="">— izvēlēties —</option>
              {['BC','SC','PF','KL','LC','LK','FC','K1'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <label>Svara kategorija:</label>
            <input type="text" value={weight} onChange={e => setWeight(e.target.value)} placeholder="-67" />
            <button type="button" onClick={addCategory}>pievienot kategoriju</button>
          </>
        )}
        {sport === 'boxing' && role === 'athlete' && (
          <>
            <label>Стиль:</label>
            <select value={style} onChange={e => setStyle(e.target.value)}>
              <option value="">— izvēlēties —</option>
              {['boxing'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <label>Svara kategorija:</label>
            <input type="text" value={weight} onChange={e => setWeight(e.target.value)} placeholder="-67" />
            <button type="button" onClick={addCategory}>pievienot kategoriju</button>
          </>
        )}

        {(role && role !== 'athlete') && (
          <button type="button" onClick={addCategory}>
            Pievienot lomu "{role}"
          </button>
        )}

        {!!entries.length && (
          <div className="list" style={{ marginTop: 8 }}>
            <b>Jūs pievienojāt:</b>
            <ul>
              {entries.map((e,i) => (
                <li key={i}>
                  {e.sport} — {e.role}
                  {e.style ? ` — ${e.style}` : ''}{e.weight_class ? ` (${e.weight_class})` : ''}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="actions" style={{ marginTop: 12, display:'flex', gap:8 }}>
          <button onClick={submit}>Apstiprināt</button>
          <button onClick={onClose}>Atcelt</button>
        </div>
      </div>
    </div>
  );
}
