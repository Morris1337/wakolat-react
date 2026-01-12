import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../../../utils/api";

export default function CompetitionSchedule() {
  const { id } = useParams();

  const [schedule, setSchedule] = useState({ categories: [], matches: [] });
  const [registrations, setRegistrations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        // schedule + registrations (для имен)
        const [schRes, regRes] = await Promise.all([
          API.get(`/competition/tournaments/${id}/schedule`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }),
          API.get(`/competition/tournaments/${id}/registrations`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }),
        ]);

        setSchedule(schRes.data || { categories: [], matches: [] });
        setRegistrations(regRes.data || []);
      } catch (e) {
        console.error(e);
        setSchedule({ categories: [], matches: [] });
        setRegistrations([]);
        setErr(e?.response?.data?.message || e?.message || "Ошибка загрузки schedule");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  // registration_id -> "First Last"
  const regNameById = useMemo(() => {
    const m = new Map();
    (registrations || []).forEach((r) => {
      const rid = Number(r.registration_id ?? r.id);
      const first = (r.first_name || "").trim();
      const last = (r.last_name || "").trim();
      const full = `${first} ${last}`.trim();
      if (rid) m.set(rid, full || `#${rid}`);
    });
    return m;
  }, [registrations]);

  const getName = (registrationId) => {
    if (!registrationId) return "TBD";
    const rid = Number(registrationId);
    return regNameById.get(rid) || `#${rid}`;
  };

  const byArea = useMemo(() => {
    const m = new Map();
    (schedule.matches || []).forEach((x) => {
      if (x.is_bye) return; // BYE не показываем как бой
      const key = `${x.area_type || "tatami"}:${x.area_number || 1}`;
      if (!m.has(key)) m.set(key, []);
      m.get(key).push(x);
    });

    for (const [, list] of m.entries()) {
      list.sort((a, b) => (a.bout_number || 999999) - (b.bout_number || 999999));
    }
    return m;
  }, [schedule.matches]);

  const areaKeys = useMemo(() => Array.from(byArea.keys()).sort(), [byArea]);

  if (loading) return <div style={{ padding: 20 }}>Loading…</div>;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <h2 style={{ margin: 0 }}>Schedule / Сетки — турнир #{id}</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link to={`/account/sacensibasWako/${id}/wako/categories`}>← Admin Categories</Link>
          <Link to={`/account/sacensibasWako/${id}/wako/participants`}>← Participants</Link>
        </div>
      </div>

      {err && (
        <div style={{ marginTop: 12, padding: 12, border: "1px solid #f5c2c7", borderRadius: 10, fontWeight: 700 }}>
          ❌ Ошибка: {err}
        </div>
      )}

      {areaKeys.length === 0 ? (
        <div style={{ marginTop: 14, opacity: 0.85 }}>Нет данных (нужно сгенерировать сетку и расписание).</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
            gap: 14,
            marginTop: 14,
          }}
        >
          {areaKeys.map((k) => {
            const [type, num] = k.split(":");
            const title = type === "ring" ? `Ring ${num}` : `Tatami ${num}`;
            const list = byArea.get(k) || [];

            return (
              <div key={k} style={{ border: "1px solid rgba(255,255,255,.25)", borderRadius: 12, padding: 12 }}>
                <div style={{ fontWeight: 900, marginBottom: 8 }}>{title}</div>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: 6, width: 70 }}>Bout</th>
                      <th style={{ textAlign: "left", padding: 6 }}>Category</th>
                      <th style={{ textAlign: "left", padding: 6 }}>Red</th>
                      <th style={{ textAlign: "left", padding: 6 }}>Blue</th>
                      <th style={{ textAlign: "left", padding: 6, width: 130 }}>Winner</th>
                    </tr>
                  </thead>

                  <tbody>
                    {list.map((m) => {
                      const cat = `${m.discipline} · ${m.gender} · ${m.age_code} · ${m.weight_label}`;

                      const redId = m.red_registration_id;
                      const blueId = m.blue_registration_id;

                      const winnerId = m.winner_registration_id;

                      const winSide =
                        winnerId && winnerId === redId
                          ? "RED"
                          : winnerId && winnerId === blueId
                            ? "BLUE"
                            : null;

                      const winText = winnerId ? `${winSide || "WIN"} — ${getName(winnerId)}` : "-";

                      return (
                        <tr key={m.id}>
                          <td style={{ padding: 6, fontWeight: 800 }}>#{m.bout_number || "-"}</td>
                          <td style={{ padding: 6 }}>{cat}</td>

                          <td style={{ padding: 6 }}>
                            <div style={{ fontWeight: 800 }}>{getName(redId)}</div>
                            {redId ? <div style={{ fontSize: 12, opacity: 0.75 }}>#{redId}</div> : null}
                          </td>

                          <td style={{ padding: 6 }}>
                            <div style={{ fontWeight: 800 }}>{getName(blueId)}</div>
                            {blueId ? <div style={{ fontSize: 12, opacity: 0.75 }}>#{blueId}</div> : null}
                          </td>

                          <td style={{ padding: 6, fontWeight: 900 }}>{winText}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div style={{ marginTop: 10, fontSize: 13, opacity: 0.8 }}>BYE-матчи скрыты.</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
