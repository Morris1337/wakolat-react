import { useEffect, useState } from 'react';
import API from '../../../../../utils/api';
import './IntelLeaderboard.scss'; // можно влить в общий scss

export default function IntelLeaderboard() {
  const [range, setRange] = useState('today');   // today | week | month
  const [level, setLevel] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const r = await API.get('intel/leaderboard/age', { params: { range, level } });
      setData(r.data);
    } catch (e) {
      console.error('leaderboard failed', e?.response?.data || e.message);
      alert(`Kļūda: ${e?.response?.data?.error || e.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [range, level]);

  return (
    <section className="intel-lb">
      <div className="intel-lb__inner">
      <div className="intel-lb__controls">
        <div className="group">
          <label>Periods</label>
          <select value={range} onChange={(e)=>setRange(e.target.value)}>
            <option value="today">Šodien</option>
            <option value="week">Nedēļa</option>
            <option value="month">Mēnesis</option>
          </select>
        </div>
        <div className="group">
          <label>Līmenis (klase)</label>
          <select value={level} onChange={(e)=>setLevel(Number(e.target.value))}>
            {Array.from({length:10},(_,i)=>i+1).map(n=>
              <option key={n} value={n}>{n}</option>
            )}
          </select>
        </div>
        <button className="reload" onClick={load} disabled={loading}>
          {loading ? 'Ielāde…' : 'Atjaunot'}
        </button>
      </div>

      {!data && <div className="intel-lb__empty">Nav datu</div>}

      {data && data.categories.map(cat => (
        <div className="intel-lb__card" key={cat.key}>
          <div className="intel-lb__cardHead">
            <h3>{cat.title}</h3>
            <span className="meta">Līmenis: {data.level}</span>
          </div>

          {cat.items.length === 0 ? (
            <div className="intel-lb__nodata">Nav rezultātu</div>
          ) : (
            <div className="intel-lb__table">
              <div className="thead">
                <span>#</span>
                <span>Spēlētājs</span>
                <span>Best (60s)</span>
                <span>Punkti</span>
                <span>Avg RT</span>
                <span>Spēles</span>
                <span>Pēd. labākais</span>
              </div>
              <div className="tbody">
                {cat.items.map(row => (
                  <div className="tr" key={row.user_id}>
                    <span className="num">{row.rank}</span>
                    <span className="name">
                      {(() => {
                        const fn = (row.first_name || '').trim();
                        const ln = (row.last_name  || '').trim();
                        const full = [fn, ln].filter(Boolean).join(' ');
                        return full || (row.username || '—');
                      })()}
                    </span>
                    <span className="ok">{row.best_correct_60}</span>
                    <span className="pts">{row.points}</span>
                    <span className="rt">{row.avg_rt_ms} ms</span>
                    <span className="games">{row.games}</span>
                    <span className="when">
                      {row.last_best_at
                        ? `${new Date(row.last_best_at).toLocaleDateString()} — ${row.best_correct_60}`
                        : '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      </div>
    </section>
  );
}
