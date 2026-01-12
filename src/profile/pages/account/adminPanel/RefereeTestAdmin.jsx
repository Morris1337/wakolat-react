// src/profile/pages/adminPanel/RefereeTestAdmin.jsx
import React, { useEffect, useState } from 'react';
import API from '../../../utils/api'; // подкорректируй путь под свой проект
import './RefereeTestAdmin.css';

function formatDateTime(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

function toLocalString(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('lv-LV');
}

const RefereeTestAdmin = () => {
  const [config, setConfig] = useState({
    startAt: '',
    endAt: '',
    maxAttemptsPerUser: 1,
  });
  const [configLoading, setConfigLoading] = useState(false);
  const [configSaving, setConfigSaving] = useState(false);
  const [configError, setConfigError] = useState('');

  const [attempts, setAttempts] = useState([]);
  const [attemptsLoading, setAttemptsLoading] = useState(false);
  const [attemptsError, setAttemptsError] = useState('');
  const [attemptsFilter, setAttemptsFilter] = useState({
    category: 'ALL',
    passed: 'ALL',
  });

  const [userLimits, setUserLimits] = useState([]);
  const [userLimitsLoading, setUserLimitsLoading] = useState(false);
  const [userLimitsError, setUserLimitsError] = useState('');

  const [limitForm, setLimitForm] = useState({
    userId: '',
    maxAttempts: '',
  });
  const [limitSaving, setLimitSaving] = useState(false);

  // ---- загрузка конфига ----
  useEffect(() => {
    const load = async () => {
      setConfigLoading(true);
      setConfigError('');
      try {
        const { data } = await API.get('/referee-test/admin/config');
        setConfig({
          startAt: formatDateTime(data.startAt),
          endAt: formatDateTime(data.endAt),
          maxAttemptsPerUser: data.maxAttemptsPerUser ?? 1,
        });
      } catch (e) {
        console.error(e);
        setConfigError(
          e?.response?.data?.message || 'Neizdevās nolasīt testa iestatījumus.'
        );
      } finally {
        setConfigLoading(false);
      }
    };
    load();
  }, []);

  // ---- загрузка попыток ----
  const loadAttempts = async () => {
    setAttemptsLoading(true);
    setAttemptsError('');
    try {
      const params = new URLSearchParams();
      if (attemptsFilter.category !== 'ALL') {
        params.append('category', attemptsFilter.category);
      }
      if (attemptsFilter.passed !== 'ALL') {
        params.append('passed', attemptsFilter.passed);
      }
      const qs = params.toString();
      const url = '/referee-test/admin/attempts' + (qs ? `?${qs}` : '');
      const { data } = await API.get(url);
      setAttempts(data || []);
    } catch (e) {
      console.error(e);
      setAttemptsError(
        e?.response?.data?.message || 'Neizdevās nolasīt testa rezultātus.'
      );
    } finally {
      setAttemptsLoading(false);
    }
  };

  useEffect(() => {
    loadAttempts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptsFilter.category, attemptsFilter.passed]);

  // ---- загрузка индивидуальных лимитов ----
  const loadUserLimits = async () => {
    setUserLimitsLoading(true);
    setUserLimitsError('');
    try {
      const { data } = await API.get('/referee-test/admin/user-limits');
      setUserLimits(data || []);
    } catch (e) {
      console.error(e);
      setUserLimitsError(
        e?.response?.data?.message || 'Neizdevās nolasīt individuālos limitus.'
      );
    } finally {
      setUserLimitsLoading(false);
    }
  };

  useEffect(() => {
    loadUserLimits();
  }, []);

  // ---- сохранение конфига ----
  const handleConfigSubmit = async (e) => {
    e.preventDefault();
    setConfigSaving(true);
    setConfigError('');
    try {
      await API.put('/referee-test/admin/config', {
        startAt: config.startAt ? new Date(config.startAt).toISOString() : null,
        endAt: config.endAt ? new Date(config.endAt).toISOString() : null,
        maxAttemptsPerUser: Number(config.maxAttemptsPerUser) || 1,
      });
      alert('Iestatījumi saglabāti.');
      await loadAttempts(); // на всякий случай обновим
    } catch (e2) {
      console.error(e2);
      setConfigError(
        e2?.response?.data?.message || 'Neizdevās saglabāt testa iestatījumus.'
      );
    } finally {
      setConfigSaving(false);
    }
  };

  // ---- сохранение индивидуального лимита ----
  const handleLimitSubmit = async (e) => {
    e.preventDefault();
    const userId = limitForm.userId.trim();
    const maxAttempts = limitForm.maxAttempts.trim();

    if (!userId) {
      alert('Norādi userId.');
      return;
    }

    setLimitSaving(true);
    try {
      await API.put(`/referee-test/admin/user-limits/${userId}`, {
        maxAttempts: maxAttempts ? Number(maxAttempts) : 0,
      });
      alert('Limits saglabāts.');
      setLimitForm({ userId: '', maxAttempts: '' });
      await loadUserLimits();
    } catch (e2) {
      console.error(e2);
      alert(
        e2?.response?.data?.message ||
          'Neizdevās saglabāt individuālo limitu.'
      );
    } finally {
      setLimitSaving(false);
    }
  };

  return (
    <div className="referee-test-admin">
      <h1 className="referee-test-admin__title">
        Tiesnešu testa administrēšana
      </h1>

      {/* Блок настроек */}
      <section className="referee-test-admin__card">
        <h2 className="referee-test-admin__card-title">Testa iestatījumi</h2>

        {configLoading ? (
          <p>Notiek ielāde…</p>
        ) : (
          <form
            className="referee-test-admin__form"
            onSubmit={handleConfigSubmit}
          >
            <div className="referee-test-admin__form-row">
              <label>
                Sākuma laiks:
                <input
                  type="datetime-local"
                  value={config.startAt}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      startAt: e.target.value,
                    }))
                  }
                />
              </label>
              <label>
                Beigu laiks:
                <input
                  type="datetime-local"
                  value={config.endAt}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      endAt: e.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <div className="referee-test-admin__form-row">
              <label>
                Noklusējuma mēģinājumu skaits vienam lietotājam:
                <input
                  type="number"
                  min="1"
                  value={config.maxAttemptsPerUser}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      maxAttemptsPerUser: e.target.value,
                    }))
                  }
                />
              </label>
            </div>

            {configError && (
              <p className="referee-test-admin__error">{configError}</p>
            )}

            <button
              type="submit"
              className="referee-test-admin__btn"
              disabled={configSaving}
            >
              {configSaving ? 'Saglabā…' : 'Saglabāt iestatījumus'}
            </button>
          </form>
        )}
      </section>

      {/* Блок результатов */}
      <section className="referee-test-admin__card">
        <div className="referee-test-admin__card-header">
          <h2 className="referee-test-admin__card-title">Rezultāti</h2>

          <div className="referee-test-admin__filters">
            <label>
              Kategorija:
              <select
                value={attemptsFilter.category}
                onChange={(e) =>
                  setAttemptsFilter((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              >
                <option value="ALL">Visas</option>
                <option value="C">C</option>
                <option value="B">B</option>
                <option value="A">A</option>
              </select>
            </label>

            <label>
              Rezultāts:
              <select
                value={attemptsFilter.passed}
                onChange={(e) =>
                  setAttemptsFilter((prev) => ({
                    ...prev,
                    passed: e.target.value,
                  }))
                }
              >
                <option value="ALL">Visi</option>
                <option value="true">Nokārtots</option>
                <option value="false">Nav nokārtots</option>
              </select>
            </label>

            <button
              type="button"
              className="referee-test-admin__btn referee-test-admin__btn--ghost"
              onClick={loadAttempts}
              disabled={attemptsLoading}
            >
              {attemptsLoading ? 'Ielādē…' : 'Pārlādēt'}
            </button>
          </div>
        </div>

        {attemptsError && (
          <p className="referee-test-admin__error">{attemptsError}</p>
        )}

        <div className="referee-test-admin__table-wrap">
          <table className="referee-test-admin__table">
            <thead>
              <tr>
                <th>Laiks</th>
                <th>Lietotājs</th>
                <th>user_id</th>
                <th>Kategorija</th>
                <th>Rezultāts</th>
                <th>Kļūdu jautājumi (ID)</th>
                <th>Statuss</th>
              </tr>
            </thead>
            <tbody>
              {attempts.length === 0 && (
                <tr>
                  <td colSpan="6" className="referee-test-admin__empty">
                    Nav rezultātu
                  </td>
                </tr>
              )}
              {attempts.map((a) => {
                const fullName = [a.first_name, a.last_name]
                  .filter(Boolean)
                  .join(' ');
                const name = fullName || a.username || `ID ${a.user_id}`;

                return (
                  <tr
                    key={a.id}
                    className={
                      a.passed
                        ? 'referee-test-admin__row--passed'
                        : 'referee-test-admin__row--failed'
                    }
                  >
                    <td>{toLocalString(a.created_at)}</td>
                    <td>{name}</td>
                    <td>{a.user_id}</td>
                    <td>{a.category}</td>
                    <td>
                      {a.correct_answers} / {a.total_questions}
                    </td>
                    <td>
                      {(() => {
                        // 1) если уже массив (идеальный вариант)
                        if (Array.isArray(a.wrong_questions)) {
                          return a.wrong_questions.length > 0
                            ? a.wrong_questions.join(', ')
                            : '—';
                        }

                        // 2) если пришло как строка "{Q27,Q33,...}"
                        if (typeof a.wrong_questions === 'string' && a.wrong_questions.trim() !== '') {
                          const cleaned = a.wrong_questions.replace(/[{}]/g, '');
                          const parts = cleaned
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean);

                          return parts.length > 0 ? parts.join(', ') : '—';
                        }

                        // 3) ничего нет
                        return '—';
                      })()}
                    </td>

                    <td>{a.passed ? 'NOKĀRTOTS ✅' : 'NAV NOKĀRTOTS ❌'}</td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Блок индивидуальных лимитов */}
      <section className="referee-test-admin__card">
        <h2 className="referee-test-admin__card-title">
          Individuālie mēģinājumu limiti
        </h2>

        <form
          className="referee-test-admin__form referee-test-admin__form--inline"
          onSubmit={handleLimitSubmit}
        >
          <label>
            user_id:
            <input
              type="number"
              value={limitForm.userId}
              onChange={(e) =>
                setLimitForm((prev) => ({ ...prev, userId: e.target.value }))
              }
              placeholder="Piem., 123"
            />
          </label>
          <label>
            Maks. mēģinājumi (0 = noņemt):
            <input
              type="number"
              min="0"
              value={limitForm.maxAttempts}
              onChange={(e) =>
                setLimitForm((prev) => ({
                  ...prev,
                  maxAttempts: e.target.value,
                }))
              }
              placeholder="Piem., 2"
            />
          </label>
          <button
            type="submit"
            className="referee-test-admin__btn"
            disabled={limitSaving}
          >
            {limitSaving ? 'Saglabā…' : 'Saglabāt limitu'}
          </button>
        </form>

        {userLimitsError && (
          <p className="referee-test-admin__error">{userLimitsError}</p>
        )}

        {userLimitsLoading ? (
          <p>Notiek ielāde…</p>
        ) : (
          <div className="referee-test-admin__table-wrap">
            <table className="referee-test-admin__table">
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>Lietotājs</th>
                  <th>Mēģinājumi</th>
                </tr>
              </thead>
              <tbody>
                {userLimits.length === 0 && (
                  <tr>
                    <td colSpan="3" className="referee-test-admin__empty">
                      Nav individuālo limitu
                    </td>
                  </tr>
                )}
                {userLimits.map((u) => {
                  const fullName = [u.first_name, u.last_name]
                    .filter(Boolean)
                    .join(' ');
                  const name = fullName || u.username || `ID ${u.user_id}`;
                  return (
                    <tr key={u.user_id}>
                      <td>{u.user_id}</td>
                      <td>{name}</td>
                      <td>{u.max_attempts}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default RefereeTestAdmin;
