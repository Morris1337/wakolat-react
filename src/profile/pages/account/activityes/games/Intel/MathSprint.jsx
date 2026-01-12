import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../../../utils/api';
import './MathSprint.scss';

export default function MathSprint() {
  // ====== таймер по реальному времени ======
  const TICK_MS = 200;
  const tRef = useRef(null);
  const modalRef = useRef(null);
  const deadlineRef = useRef(null);
  const finishingRef = useRef(false); 
  const sessionRef = useRef(null);
  const qIdxRef = useRef(0);
  const correctRef = useRef(0);
  const pointsRef = useRef(0);

  const navigate = useNavigate();

  // ====== состояние ======
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const [qIdx, setQIdx] = useState(0);
  const [qText, setQText] = useState('');
  const [difficulty, setDifficulty] = useState(1);

  const [timeLeft, setTimeLeft] = useState(60);
  const [durSec, setDurSec] = useState(60);

  const [input, setInput] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [points, setPoints] = useState(0);

  // Итоги
  const [summary, setSummary] = useState(null); // { summary, details }
  const [showSummary, setShowSummary] = useState(false);

  // ====== правила (операторы и сложность) ======
  const [ops, setOps] = useState({
    add: true, sub: true, mul: false, div: false, percent: false, paren: false, frac: false, quad: false
  });
  const [diffMode, setDiffMode] = useState('fixed'); // 'fixed' | 'adaptive'
  const [diffStart, setDiffStart] = useState(1);     // 1-й класс по умолчанию
  const [diffMin, setDiffMin] = useState(1);
  const [diffMax, setDiffMax] = useState(10);
  const [answering, setAnswering] = useState(false);
  const [onlyWrong, setOnlyWrong] = useState(false);


  useEffect(() => {
  if (!started || !sessionId || !qIdx) return;
  // не ждём — просто уведомляем сервер
  API.post('intel/seen', { session_id: sessionId, question_idx: qIdx }).catch(() => {});
}, [started, sessionId, qIdx]);


  // Очистка интервала при размонтировании
  useEffect(() => () => { if (tRef.current) clearInterval(tRef.current); }, []);
  useEffect(() => { if (showSummary && modalRef.current) modalRef.current.focus(); }, [showSummary]);


  // блокируем Enter/Escape, пока открыт итог
useEffect(() => {
  function lockKeys(e) {
    if (!showSummary) return;
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
    }
  }
  document.addEventListener('keydown', lockKeys, true);
  return () => document.removeEventListener('keydown', lockKeys, true);
}, [showSummary]);



  // ====== Старт игры ======
  async function startGame() {
    try {
      setLoading(true);

      const rules = {
        operators: ops,
        difficulty: { mode: diffMode, start: diffStart, min: diffMin, max: diffMax },
      };

      // создаём сессию
      const r = await API.post('intel/start', {
        game_code: 'math_sprint',
        rules,
        client_meta: { duration_sec: durSec }
      });

      setSessionId(r.data.session_id);
      sessionRef.current = r.data.session_id;
      setQIdx(r.data.question_idx); qIdxRef.current = r.data.question_idx;
      setQText(r.data.question_text);
      setDifficulty(r.data.difficulty);
      setStarted(true);
      finishingRef.current = false; 
      qIdxRef.current = r.data.question_idx;
      correctRef.current = 0;
      pointsRef.current = 0;

      // точный таймер по дедлайну
      if (tRef.current) { clearInterval(tRef.current); tRef.current = null; }
      setTimeLeft(durSec);
      deadlineRef.current = Date.now() + durSec * 1000;

      tRef.current = setInterval(() => {
        const leftMs = Math.max(0, deadlineRef.current - Date.now());
        const left = Math.ceil(leftMs / 1000);
        setTimeLeft(left);
        if (leftMs <= 0) {
          clearInterval(tRef.current);
          tRef.current = null;
          finishOnce();
        }
      }, TICK_MS);
    } catch (e) {
      console.error('intel/start failed:', e?.response?.status, e?.response?.data || e.message);
      alert(`Kļūda: ${e?.response?.data?.error || e.message}`);
    } finally {
      setLoading(false);
    }
  }

  // ====== Ответ ======

  async function submit() {
    if (answering || !input.trim()) return;
    setAnswering(true);
    try {
      const r = await API.post('intel/answer', {
        session_id: sessionId,
        question_idx: qIdx,
        answer: input.trim(),
      });
      if (r.data.correct) setCorrectCount(c => { const v = c + 1; correctRef.current = v; return v; });
      setPoints(p => { const v = p + (r.data.gained_points || 0); pointsRef.current = v; return v; });
      setQIdx(r.data.next.question_idx); qIdxRef.current = r.data.next.question_idx;
      setQText(r.data.next.question_text);
      setDifficulty(r.data.next.difficulty);
      setInput('');
    } catch (e) {
      alert(`Kļūda: ${e?.response?.data?.error || e.message}`);
    } finally {
      setAnswering(false);
    }
  }


  // ====== Завершение ======
  async function finishOnce() {
  if (finishingRef.current) return;     // защита от двойного вызова
  finishingRef.current = true;

  if (tRef.current) { clearInterval(tRef.current); tRef.current = null; }

  try {
    const sid = sessionRef.current;
    const totalLocal = qIdxRef.current;
    const correctLocal = correctRef.current;
    const pointsLocal = pointsRef.current;

     if (!sid) {
      // нет сессии – всё равно покажем краткий итог
      setSummary({
        summary: { total: totalLocal, correct: correctLocal, points: pointsLocal, avg_rt_ms: 0 },
        details: []
      });
      setShowSummary(true);
      return;
    }

    const r = await API.post('intel/finish', { session_id: sid });
    setSummary(
      r.data || { summary: { total: totalLocal, correct: correctLocal, points: pointsLocal, avg_rt_ms: 0 }, details: [] }
    );
    setShowSummary(true);
  } catch (e) {
    // даже при ошибке покажем, что успели локально насчитать
    console.error('finish failed', e);
    setSummary({
      summary: { total: qIdxRef.current, correct: correctRef.current, points: pointsRef.current, avg_rt_ms: 0 },
      details: []
    });
    setShowSummary(true);
  } finally {
    setStarted(false);    // вернёмся к экрану настроек; модалка уже открыта поверх
  }
}

// если у тебя есть кнопка "Beigt agrāk", пусть она зовёт именно finishOnce:
const finish = finishOnce;


  // ====== Разметка ======
  const settingsContent = (
    <div className="intel-wrap">
      <div className="intel-title">
        <span className="intel-title__icon">🧠</span>
        <h3 className="intel-title__text">Math Sprint — iestatījumi</h3>
      </div>

      <div className="intel-card intel-card--settings">
        {/* Операторы */}
        <div className="intel-row intel-row--ops">
          {[
            { key: 'add', label: 'saskaitīšana', badge: '+' },
            { key: 'sub', label: 'atņemšana',   badge: '−' },
            { key: 'mul', label: 'reizrēķins',  badge: '×' },
            { key: 'div', label: 'dalīšana',    badge: '÷' },
            { key: 'percent', label: 'procenti', badge: '%' },
            { key: 'paren', label: 'iekavas',    badge: '( )' },
            { key: 'frac', label: 'daļas (no skaitļa)', badge: 'a/b' },
            { key: 'quad', label: 'diskriminants', badge: 'D' },
          ].map(op => (
            <label key={op.key} className="intel-switch">
              <input
                type="checkbox"
                checked={!!ops[op.key]}
                onChange={e => setOps(s => ({ ...s, [op.key]: e.target.checked }))}
              />
              <span className="intel-switch__box">{op.badge}</span>
              <span> {op.label}</span>
            </label>
          ))}
        </div>

        {/* Режим сложности и длительность */}
        <div className="intel-row intel-row--grid">
          <label className="intel-field">
            <span className="intel-field__label">Režīms</span>
            <select value={diffMode} onChange={e => setDiffMode(e.target.value)} className="intel-select">
              <option value="adaptive">Adaptīva grūtība</option>
              <option value="fixed">Fiksēta grūtība</option>
            </select>
          </label>

          <label className="intel-field">
            <span className="intel-field__label">{diffMode === 'fixed' ? 'Līmenis' : 'Sākums'}</span>
            <input
              className="intel-num"
              type="number" min={1} max={10}
              value={diffStart}
              onChange={e => setDiffStart(Number(e.target.value))}
            />
          </label>

          {diffMode !== 'fixed' && (
            <>
              <label className="intel-field">
                <span className="intel-field__label">Min</span>
                <input className="intel-num" type="number" min={1} max={10} value={diffMin}
                       onChange={e => setDiffMin(Number(e.target.value))}/>
              </label>
              <label className="intel-field">
                <span className="intel-field__label">Max</span>
                <input className="intel-num" type="number" min={1} max={10} value={diffMax}
                       onChange={e => setDiffMax(Number(e.target.value))}/>
              </label>
            </>
          )}

          <label className="intel-field">
            <span className="intel-field__label">Ilgums (sek.)</span>
            <input
              className="intel-num"
              type="number" min={15} max={300} step={5}
              value={durSec}
              onChange={e => setDurSec(Math.max(15, Math.min(300, Number(e.target.value) || 60)))}
            />
          </label>
        </div>

        <div className="intel-actions">
          <button disabled={loading} className="intel-btn intel-btn--primary" onClick={startGame}>
            {loading ? 'Ielāde…' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );

  const gameContent = (
    <div className="intel-wrap">
      <header className="intel-hud">
        <div className="intel-chip">⏱ {timeLeft}s</div>
        <div className="intel-hud__stats">
          <span className="intel-chip">Grūtība: {difficulty}</span>
          <span className="intel-chip">Punkti: {points}</span>
          <span className="intel-chip">Precīzie: {correctCount}</span>
        </div>
        <button className="intel-btn intel-btn--ghost" onClick={finish}>Beigt agrāk</button>
      </header>

      <div className="intel-card intel-card--game">
        <div className="intel-question">{qText}</div>
        <div className="intel-answer">
          <input
            className="intel-input"
            type="text"
            inputMode="numeric"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') submit(); }}
            autoFocus
            placeholder="Atbilde"
          />
          <button className="intel-btn intel-btn--primary" onClick={submit} disabled={answering}>
            Iesniegt
          </button>

        </div>
      </div>
    </div>
  );

  const details = summary?.details || [];

  return (
    <>
      <section className="intel-math">
        {started ? gameContent : settingsContent}
      </section>

      {/* Итоги поверх любого экрана */}
      {showSummary && summary && (
        <div className="intel-modal" role="dialog" aria-modal="true" tabIndex={-1} ref={modalRef}>
          <div className="intel-card intel-card--summary">
            <h3>Rezultāts</h3>
            <div className="intel-summary-row">
              <span>Jautājumi: <b>{summary.summary?.total ?? details.length}</b></span>
              <span>Precīzie: <b>{summary.summary?.correct ?? details.filter(d => d.is_correct).length}</b></span>
              <span>Punkti: <b>{summary.summary?.points ?? points}</b></span>
              <span>Avg RT: <b>{summary.summary?.avg_rt_ms ?? 0} ms</b></span>
            </div>

            <div className="intel-table">
              <div className="intel-table__head">
                <span>#</span>
                <span>Jautājums</span>
                <span>Tava atbilde</span>
                <span>Pareizā</span>
                <span>RT</span>
                <span>Punkti</span>
              </div>

              {/* опциональный фильтр */}
              <div className="intel-table__tools">
                <label className="intel-switch-inline">
                  <input
                    type="checkbox"
                    checked={onlyWrong}
                    onChange={e => setOnlyWrong(e.target.checked)}
                  />
                  <span>Rādīt tikai kļūdas</span>
                </label>
              </div>

              <div className="intel-table__body">
                {(onlyWrong ? details.filter(d => !d.is_correct) : details).map(d => {
                  const ok = !!d.is_correct;
                  return (
                    <div key={d.idx} className={`intel-table__row ${ok ? 'ok' : 'bad'}`}>
                      <span className="is-num">{d.idx}</span>
                      <span className="q">{d.text}</span>

                      {/* пользовательский ответ — красим ярко */}
                      <span className={`ua ${ok ? 'ok' : 'bad'}`}>
                        {d.user_answer ?? '—'}
                      </span>

                      {/* правильный ответ — всегда зелёный (спокойный) */}
                      <span className="ca is-num">{d.correct_answer}</span>

                      <span className="is-num">{d.rt_ms ?? '—'} ms</span>
                      <span className="is-num">{d.points ?? 0}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="intel-actions" style={{ marginTop: 12 }}>
              <button
                className="intel-btn intel-btn--primary"
                onClick={() => {
                  setShowSummary(false);
                  setSummary(null);
                  setSessionId(null);
                  setStarted(false); // возвращаемся к настройкам
                  setPoints(0);
                  setCorrectCount(0);
                  setInput('');
                }}
              >
                Spēlēt vēlreiz
              </button>
              <button className="intel-btn intel-btn--ghost" onClick={() => navigate('/account/intel')}>
                Uz izvēlni
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
