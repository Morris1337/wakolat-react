import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../../../utils/api";

export default function CompetitionPairings() {
  const { id } = useParams(); // tournamentId

  const [regs, setRegs] = useState([]);
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");
  const [discipline, setDiscipline] = useState("ALL");
  const [pickA, setPickA] = useState("");
  const [pickB, setPickB] = useState("");

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [r1, r2] = await Promise.all([
          API.get(`/competition/tournaments/${id}/registrations`),
          API.get(`/competition/tournaments/${id}/pairings`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setRegs(r1.data || []);
        setPairs(r2.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const regMap = useMemo(() => {
    const m = new Map();
    (regs || []).forEach((r) => m.set(r.registration_id, r));
    return m;
  }, [regs]);

  const usedIds = useMemo(() => {
    const s = new Set();
    (pairs || []).forEach((p) => {
      s.add(p.a_registration_id);
      s.add(p.b_registration_id);
    });
    return s;
  }, [pairs]);

  const filteredRegs = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return (regs || [])
      .filter((r) => (discipline === "ALL" ? true : r.discipline === discipline))
      .filter((r) => {
        if (!qq) return true;
        const name = `${r.first_name || ""} ${r.last_name || ""}`.toLowerCase();
        const club = `${r.club || ""}`.toLowerCase();
        return name.includes(qq) || club.includes(qq) || String(r.registration_id).includes(qq);
      });
  }, [regs, q, discipline]);

  const addPair = () => {
    const a = Number(pickA);
    const b = Number(pickB);
    if (!a || !b || a === b) return;

    if (usedIds.has(a) || usedIds.has(b)) return;

    const aa = Math.min(a, b);
    const bb = Math.max(a, b);

    // не добавлять дубликаты
    if (pairs.some((p) => p.a_registration_id === aa && p.b_registration_id === bb)) return;

    setPairs((prev) => [
      ...prev,
      { id: `tmp_${Date.now()}`, a_registration_id: aa, b_registration_id: bb },
    ]);
    setPickA("");
    setPickB("");
  };

  const removePair = (pairId) => {
    setPairs((prev) => prev.filter((p) => p.id !== pairId));
  };

  const save = async () => {
    const body = {
      pairs: (pairs || []).map((p) => ({
        a_registration_id: p.a_registration_id,
        b_registration_id: p.b_registration_id,
      })),
    };

    await API.put(`/competition/tournaments/${id}/pairings`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const refreshed = await API.get(`/competition/tournaments/${id}/pairings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPairs(refreshed.data || []);
  };

  const optionLabel = (rid) => {
    const r = regMap.get(rid);
    if (!r) return `#${rid}`;
    return `#${r.registration_id} — ${(r.first_name || "")} ${(r.last_name || "")} (${r.discipline}) / ${r.club || "-"}`;
  };

  if (loading) return <div style={{ padding: 20 }}>Ielāde…</div>;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Pāri (кто с кем стоит) — турнира #{id}</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <Link to={`/account/sacensibasWako/${id}/wako/categories`}>→ Kategorijas (preview)</Link>
          <Link to={`/account/sacensibasWako/${id}/wako/participants`}>← Dalībnieki</Link>
        </div>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name/club/id…"
          style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,.2)", minWidth: 220 }}
        />

        <select
          value={discipline}
          onChange={(e) => setDiscipline(e.target.value)}
          style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,.2)" }}
        >
          <option value="ALL">ALL</option>
          <option value="KL">KL</option>
          <option value="BC">BC</option>
          <option value="LC">LC</option>
          <option value="PF">PF</option>
        </select>

        <button onClick={save} style={{ padding: "8px 12px", borderRadius: 10 }}>
          Save pairs
        </button>
      </div>

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ border: "1px solid rgba(255,255,255,.2)", borderRadius: 12, padding: 12 }}>
          <b>Сформировать новую пару</b>

          <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
            <select value={pickA} onChange={(e) => setPickA(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
              <option value="">Выбери спортсмена A</option>
              {filteredRegs
                .filter((r) => !usedIds.has(r.registration_id))
                .map((r) => (
                  <option key={r.registration_id} value={r.registration_id}>
                    #{r.registration_id} — {r.first_name} {r.last_name} ({r.discipline}) / {r.club || "-"}
                  </option>
                ))}
            </select>

            <select value={pickB} onChange={(e) => setPickB(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
              <option value="">Выбери спортсмена B</option>
              {filteredRegs
                .filter((r) => !usedIds.has(r.registration_id))
                .map((r) => (
                  <option key={r.registration_id} value={r.registration_id}>
                    #{r.registration_id} — {r.first_name} {r.last_name} ({r.discipline}) / {r.club || "-"}
                  </option>
                ))}
            </select>

            <button onClick={addPair} style={{ padding: "8px 10px", borderRadius: 10 }}>
              Add pair
            </button>

            <div style={{ opacity: 0.8, fontSize: 13 }}>
              * Спортсмен не может быть в двух парах.
            </div>
          </div>
        </div>

        <div style={{ border: "1px solid rgba(255,255,255,.2)", borderRadius: 12, padding: 12 }}>
          <b>Текущие пары: {pairs.length}</b>

          <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
            {pairs.map((p) => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div>{optionLabel(p.a_registration_id)}</div>
                  <div style={{ opacity: 0.7 }}>vs</div>
                  <div>{optionLabel(p.b_registration_id)}</div>
                </div>
                <button onClick={() => removePair(p.id)} style={{ padding: "6px 10px", borderRadius: 10 }}>
                  Remove
                </button>
              </div>
            ))}
            {pairs.length === 0 && <div style={{ opacity: 0.8 }}>Пока нет пар.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
