// src/Pages/game/Testesana.jsx
import React, { useEffect, useMemo, useState } from 'react';
import API from '../../../../utils/api';
import './Testesana.scss'; // 👈 новый файл

export default function Testesana() {
  const [seasons, setSeasons] = useState([]);
  const [seasonId, setSeasonId] = useState('');
  const [tests, setTests] = useState([]);
  const [testCode, setTestCode] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    (async () => {
      try {
        const [sRes, tRes] = await Promise.all([
          API.get('/game/seasons'),
          API.get('/game/tests/list')
        ]);
        const seasons = sRes.data || [];
        const tests = tRes.data || [];
        setSeasons(seasons);
        setTests(tests);
        if (seasons.length) setSeasonId(String(seasons[0].id));
        if (tests.length) setTestCode(tests[0].code);
      } catch (e) { console.warn('init failed', e); }
    })();
  }, []);

  const selectedTest = useMemo(() => tests.find(t => t.code === testCode) || null, [tests, testCode]);

  async function loadBoard() {
    if (!seasonId || !testCode) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        season_id: seasonId,
        test_code: testCode,
        limit_per_group: 50
      });
      const { data } = await API.get(`/game/leaderboard/test-split?${params.toString()}`);
      setData(data);
    } catch (e) {
      alert(e?.response?.data?.error || e.message);
    } finally { setLoading(false); }
  }

  useEffect(() => { loadBoard(); /* eslint-disable-next-line */ }, [seasonId, testCode]);

  const factionClass = (f) =>
    `faction-pill faction-pill--${String(f || 'unknown').toLowerCase()}`;

  const renderTable = (title, rows = []) => (
    <section className="testesana__group">
      <header className="testesana__group-head">
        <span className="testesana__badge">{title}</span>
        {data?.test && (
          <span className="testesana__test-meta">
            {data.test.name} <span className="testesana__unit">({data.test.unit || ''})</span>
          </span>
        )}
      </header>

      <div className="testesana__table-wrap">
        <table className="testesana__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Имя</th>
              <th>Фракция</th>
              <th>Результат</th>
              <th>До лидера</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr className="testesana__empty">
                <td colSpan={5}>Пока нет результатов</td>
              </tr>
            )}
            {rows.map((r) => {
              const isLeader = r.to_leader === 0;
              const fullName = [r.first_name, r.last_name].filter(Boolean).join(' ') || r.username;
              return (
                <tr key={`${title}-${r.user_id}`} className={isLeader ? 'is-leader' : ''}>
                  <td data-th="#"> {r.rank} </td>
                  <td data-th="Имя">
                    <div className="testesana__name">{fullName}</div>
                  </td>
                  <td data-th="Фракция">
                    <span className={factionClass(r.faction)}>{r.faction || '—'}</span>
                  </td>
                  <td data-th="Результат">
                    <span className="testesana__value">
                      {r.value} {data?.test?.unit || ''}
                    </span>
                  </td>
                  <td data-th="До лидера">
                    {isLeader ? (
                      <span className="testesana__leader">Лидер</span>
                    ) : (
                      <span className="testesana__gap">
                        {r.to_leader} {data?.test?.unit || ''}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );

  return (
    <section className="testesana">
      <div className="testesana__inner">
        <h1 className="testesana__title">Testešana — лидеры по нормативам</h1>

        <div className="testesana__controls">
          <label className="form-label">Сезон</label>
          <select className="testesana__select" value={seasonId} onChange={e=>setSeasonId(e.target.value)}>
            {seasons.map(s => (
              <option key={s.id} value={s.id}>{s.name} (#{s.id})</option>
            ))}
          </select>

          <label className="form-label">Тест</label>
          <select className="testesana__select" value={testCode} onChange={e=>setTestCode(e.target.value)}>
            {tests.map(t => (
              <option key={t.id} value={t.code}>{t.name} ({t.code})</option>
            ))}
          </select>

          <button className="testesana__btn" onClick={loadBoard} disabled={loading}>
            {loading ? 'Загрузка…' : 'Обновить'}
          </button>
        </div>

        {data && (
          <>
            {renderTable('12+', data.groups?.['12+'])}
            {renderTable('-12', data.groups?.['-12'])}
            {renderTable('-6',  data.groups?.['-6'])}
          </>
        )}
      </div>
    </section>
  );
}
