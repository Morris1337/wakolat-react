import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../../../../utils/api";

export default function CompetitionCategories() {
  const { id } = useParams(); // tournamentId
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const DEFAULT_TATAMI = 3;
  const DEFAULT_RING = 1;

  const [data, setData] = useState({ groups: [], errors: [] });
  const [pairings, setPairings] = useState([]);
  const [queuePrefs, setQueuePrefs] = useState([]); // [{group_key, area_type, area_number, order_index}]
  const [loading, setLoading] = useState(true);

  const [selA, setSelA] = useState({}); // { [groupKey]: regId }
  const [selB, setSelB] = useState({}); // { [groupKey]: regId }
  const [uiMsg, setUiMsg] = useState(null);

  const showMsg = (t) => {
    setUiMsg(t);
    setTimeout(() => setUiMsg(null), 2500);
  };

  const groups = data.groups || [];

  const loadAll = async () => {
    try {
      setLoading(true);

      const [resPreview, resPairs, resQueue] = await Promise.all([
        API.get(`/competition/tournaments/${id}/categories-preview`, { headers: authHeaders }),
        API.get(`/competition/tournaments/${id}/pairings`, { headers: authHeaders }),
        API.get(`/competition/tournaments/${id}/category-queue`, { headers: authHeaders }),
      ]);

      setData(resPreview.data || { groups: [], errors: [] });
      setPairings(resPairs.data || []);
      setQueuePrefs(resQueue.data || []);
    } catch (e) {
      console.error(e);
      setData({ groups: [], errors: [{ reason: e?.response?.data?.message || e?.message || "Load error" }] });
      setPairings([]);
      setQueuePrefs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // groupKey by registration_id
  const regToGroupKey = useMemo(() => {
    const m = new Map();
    groups.forEach((g) => {
      (g.athletes || []).forEach((a) => {
        m.set(Number(a.registration_id), g.key);
      });
    });
    return m;
  }, [groups]);

  // prefs by group_key
  const prefByKey = useMemo(() => {
    const m = new Map();
    (queuePrefs || []).forEach((p) => m.set(p.group_key, p));
    return m;
  }, [queuePrefs]);

  // pairings split: valid if both in same group
  const pairingStatus = useMemo(() => {
    const valid = [];
    const invalid = [];

    (pairings || []).forEach((p) => {
      const a = Number(p.a_registration_id);
      const b = Number(p.b_registration_id);
      const k1 = regToGroupKey.get(a);
      const k2 = regToGroupKey.get(b);

      if (k1 && k2 && k1 === k2) valid.push(p);
      else invalid.push({ p, k1: k1 || null, k2: k2 || null });
    });

    return { valid, invalid };
  }, [pairings, regToGroupKey]);

  const savePairings = async (nextPairs) => {
    try {
      const body = {
        pairs: (nextPairs || []).map((p) => ({
          a_registration_id: Number(p.a_registration_id),
          b_registration_id: Number(p.b_registration_id),
        })),
      };

      await API.put(`/competition/tournaments/${id}/pairings`, body, { headers: authHeaders });

      const refreshed = await API.get(`/competition/tournaments/${id}/pairings`, { headers: authHeaders });
      setPairings(refreshed.data || []);
      return true;
    } catch (e) {
      console.error(e);
      showMsg(e?.response?.data?.message || "Ошибка сохранения pairings");
      return false;
    }
  };

  const addPairInsideGroup = async (groupKey) => {
    const a = Number(selA[groupKey] || 0);
    const b = Number(selB[groupKey] || 0);

    if (!a || !b) return showMsg("Выбери A и B");
    if (a === b) return showMsg("A и B не могут быть одинаковые");

    const g = groups.find((x) => x.key === groupKey);
    if (!g) return showMsg("Категория не найдена");

    const athleteIds = new Set((g.athletes || []).map((x) => Number(x.registration_id)));
    if (!athleteIds.has(a) || !athleteIds.has(b)) return showMsg("Эта пара не из этой категории");

    // used только в этой категории
    const used = new Set();
    pairingStatus.valid
      .filter((p) => regToGroupKey.get(Number(p.a_registration_id)) === groupKey)
      .forEach((p) => {
        used.add(Number(p.a_registration_id));
        used.add(Number(p.b_registration_id));
      });

    if (used.has(a) || used.has(b)) return showMsg("Один из спортсменов уже используется в паре");

    // normalize a<b
    const aa = Math.min(a, b);
    const bb = Math.max(a, b);

    const exists = (pairings || []).some((p) => {
      const pa = Number(p.a_registration_id);
      const pb = Number(p.b_registration_id);
      return (pa === aa && pb === bb) || (pa === bb && pb === aa);
    });
    if (exists) return showMsg("Эта пара уже добавлена");

    const nextPairs = [...(pairings || []), { a_registration_id: aa, b_registration_id: bb }];
    const ok = await savePairings(nextPairs);
    if (!ok) return;

    showMsg("Пара добавлена ✅");
    setSelA((prev) => ({ ...prev, [groupKey]: "" }));
    setSelB((prev) => ({ ...prev, [groupKey]: "" }));
  };

  const removePair = async (pairId) => {
    const next = (pairings || []).filter((p) => Number(p.id) !== Number(pairId));
    const ok = await savePairings(next);
    if (ok) showMsg("Пара удалена ✅");
  };

  const updatePrefLocal = (groupKey, patch) => {
    setQueuePrefs((prev) => {
      const cur = prev || [];
      const idx = cur.findIndex((x) => x.group_key === groupKey);

      if (idx === -1) {
        return [
          ...cur,
          {
            group_key: groupKey,
            area_type: patch.area_type || "tatami",
            area_number: Number(patch.area_number || 1),
            order_index: Number.isFinite(patch.order_index) ? Number(patch.order_index) : 0,
          },
        ];
      }

      const next = [...cur];
      next[idx] = { ...next[idx], ...patch };
      return next;
    });
  };

  const fillDefaultsIfMissing = () => {
    // создаём pref для групп, где его нет
    const usedKeys = new Set((queuePrefs || []).map((p) => p.group_key));
    const missing = groups.filter((g) => !usedKeys.has(g.key));

    if (missing.length === 0) return;

    const next = [...(queuePrefs || [])];

    // round-robin распределение по татами/рингу
    let t = 1;
    let r = 1;
    let order = next.length ? Math.max(...next.map((x) => Number(x.order_index || 0))) + 1 : 1;

    missing.forEach((g) => {
      const isRing = false; // по умолчанию всё татами (можешь поменять логику)
      if (isRing) {
        next.push({ group_key: g.key, area_type: "ring", area_number: r, order_index: order++ });
        r = r >= DEFAULT_RING ? 1 : r + 1;
      } else {
        next.push({ group_key: g.key, area_type: "tatami", area_number: t, order_index: order++ });
        t = t >= DEFAULT_TATAMI ? 1 : t + 1;
      }
    });

    setQueuePrefs(next);
  };

  const saveQueuePrefs = async () => {
    try {
      fillDefaultsIfMissing();

      const body = {
        prefs: (queuePrefs || []).map((p) => ({
          group_key: p.group_key,
          area_type: p.area_type || "tatami",
          area_number: Number(p.area_number || 1),
          order_index: Number(p.order_index || 0),
        })),
      };

      await API.put(`/competition/tournaments/${id}/category-queue`, body, { headers: authHeaders });
      showMsg("Tatami/Ring сохранены ✅");

      const resQueue = await API.get(`/competition/tournaments/${id}/category-queue`, { headers: authHeaders });
      setQueuePrefs(resQueue.data || []);
    } catch (e) {
      console.error(e);
      showMsg(e?.response?.data?.message || "Ошибка сохранения очереди");
    }
  };

  const generateBrackets = async () => {
    try {
      await API.post(`/competition/tournaments/${id}/generate`, {}, { headers: authHeaders });
      showMsg("Сетки сгенерированы ✅");
      navigate(`/account/sacensibasWako/${id}/wako/schedule`);
    } catch (e) {
      console.error(e);
      showMsg(e?.response?.data?.message || "Ошибка генерации сеток");
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading…</div>;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Kategorijas (preview) — турнир #{id}</h2>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <button onClick={saveQueuePrefs} style={{ padding: "8px 12px", borderRadius: 10 }}>
            Save Tatami/Ring
          </button>
          <button onClick={generateBrackets} style={{ padding: "8px 12px", borderRadius: 10, fontWeight: 800 }}>
            Generate brackets → Schedule
          </button>
          <Link to={`/account/sacensibasWako/${id}/wako/schedule`}>Open Schedule</Link>
        </div>
      </div>

      {uiMsg && (
        <div style={{ marginTop: 12, padding: 10, borderRadius: 10, background: "rgba(255,255,255,0.8)", fontWeight: 800 }}>
          {uiMsg}
        </div>
      )}

      {(data.errors || []).length > 0 && (
        <div style={{ marginTop: 12, padding: 12, borderRadius: 12, border: "1px solid rgba(220,53,69,0.5)" }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Ошибки данных:</div>
          <ul style={{ margin: 0 }}>
            {data.errors.map((e, i) => (
              <li key={i}>{e.reason || JSON.stringify(e)}</li>
            ))}
          </ul>
        </div>
      )}

      {pairingStatus.invalid.length > 0 && (
        <div style={{ marginTop: 12, padding: 12, borderRadius: 12, border: "1px solid rgba(255,193,7,0.7)" }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>⚠️ Есть пары не из одной категории (будут игнорироваться):</div>
          <ul style={{ margin: 0 }}>
            {pairingStatus.invalid.map((x, i) => (
              <li key={i}>
                pair #{x.p?.id}: {x.p?.a_registration_id} vs {x.p?.b_registration_id} (k1={String(x.k1)} k2={String(x.k2)})
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: 14, display: "grid", gap: 14 }}>
        {groups.map((g) => {
          const pref = prefByKey.get(g.key) || { area_type: "tatami", area_number: 1, order_index: 0 };

          // пары внутри этой категории
          const gpairs = pairingStatus.valid.filter((p) => regToGroupKey.get(Number(p.a_registration_id)) === g.key);

          // used внутри категории
          const used = new Set();
          gpairs.forEach((p) => {
            used.add(Number(p.a_registration_id));
            used.add(Number(p.b_registration_id));
          });

          const athletes = g.athletes || [];
          const freeAthletes = athletes.filter((a) => !used.has(Number(a.registration_id)));

          return (
            <div key={g.key} style={{ padding: 12, borderRadius: 14, border: "1px solid rgba(255,255,255,0.25)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <div style={{ fontWeight: 900 }}>
                  {g.title} <span style={{ opacity: 0.7 }}>({athletes.length})</span>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                  <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    Area:
                    <select
                      value={`${pref.area_type}:${pref.area_number}`}
                      onChange={(e) => {
                        const [t, n] = String(e.target.value).split(":");
                        updatePrefLocal(g.key, { area_type: t, area_number: Number(n) });
                      }}
                    >
                      {Array.from({ length: DEFAULT_TATAMI }, (_, i) => i + 1).map((n) => (
                        <option key={`t${n}`} value={`tatami:${n}`}>
                          Tatami {n}
                        </option>
                      ))}
                      {Array.from({ length: DEFAULT_RING }, (_, i) => i + 1).map((n) => (
                        <option key={`r${n}`} value={`ring:${n}`}>
                          Ring {n}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    Order:
                    <input
                      style={{ width: 80 }}
                      type="number"
                      value={Number(pref.order_index || 0)}
                      onChange={(e) => updatePrefLocal(g.key, { order_index: Number(e.target.value || 0) })}
                    />
                  </label>
                </div>
              </div>

              <div style={{ marginTop: 10, opacity: 0.9, fontWeight: 800 }}>
                Пары (1 раунд): {gpairs.length}
              </div>

              {gpairs.length > 0 ? (
                <ul style={{ marginTop: 6 }}>
                  {gpairs.map((p) => (
                    <li key={p.id} style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                      <span>
                        #{p.a_registration_id} vs #{p.b_registration_id}
                      </span>
                      <button onClick={() => removePair(p.id)} style={{ padding: "4px 8px", borderRadius: 8 }}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ marginTop: 6, opacity: 0.8 }}>Пока нет пар в этой категории.</div>
              )}

              <div style={{ marginTop: 10, fontWeight: 800, opacity: 0.95 }}>
                Добавить пару внутри категории (только среди неиспользованных):
              </div>

              <div style={{ marginTop: 6, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <select
                  value={selA[g.key] || ""}
                  onChange={(e) => setSelA((prev) => ({ ...prev, [g.key]: e.target.value }))}
                >
                  <option value="">Выбери A</option>
                  {freeAthletes.map((a) => (
                    <option key={a.registration_id} value={a.registration_id}>
                      #{a.registration_id} — {a.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selB[g.key] || ""}
                  onChange={(e) => setSelB((prev) => ({ ...prev, [g.key]: e.target.value }))}
                >
                  <option value="">Выбери B</option>
                  {freeAthletes.map((a) => (
                    <option key={a.registration_id} value={a.registration_id}>
                      #{a.registration_id} — {a.name}
                    </option>
                  ))}
                </select>

                <button onClick={() => addPairInsideGroup(g.key)} style={{ padding: "6px 12px", borderRadius: 10, fontWeight: 900 }}>
                  Add
                </button>
              </div>

              <div style={{ marginTop: 10 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ textAlign: "left" }}>
                      <th style={{ padding: 6 }}>#</th>
                      <th style={{ padding: 6 }}>Sportists</th>
                      <th style={{ padding: 6 }}>Klubs</th>
                      <th style={{ padding: 6 }}>Birth</th>
                      <th style={{ padding: 6 }}>Kg</th>
                      <th style={{ padding: 6 }}>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {athletes.map((a, idx) => (
                      <tr key={a.registration_id}>
                        <td style={{ padding: 6 }}>{idx + 1}</td>
                        <td style={{ padding: 6 }}>{a.name}</td>
                        <td style={{ padding: 6 }}>{a.club_name || "-"}</td>
                        <td style={{ padding: 6 }}>{a.birth_date ? String(a.birth_date).slice(0, 10) : "-"}</td>
                        <td style={{ padding: 6 }}>{a.weight_kg ?? "-"}</td>
                        <td style={{ padding: 6 }}>{a.type || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
