import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from '../../../../utils/api';


const DISCIPLINES = ["KL", "LC", "BC", "K-1", "PF", "LK", "FC"];

function getToken() {
  return (
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    ""
  );
}

async function apiFetch(url, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    const msg =
      (data && (data.message || data.msg || data.error)) ||
      `Request failed: ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export default function TournamentAddParticipant() {
  const { id } = useParams();
  const tournamentId = Number(id);

  // ✅ federation users
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  // ✅ external athletes
  const [externalAthletes, setExternalAthletes] = useState([]);
  const [externalLoading, setExternalLoading] = useState(false);
  const [selectedExternalId, setSelectedExternalId] = useState("");

  // common
  const [regs, setRegs] = useState([]);
  const [regsLoading, setRegsLoading] = useState(false);

  const [discipline, setDiscipline] = useState("KL");
  const [weightKg, setWeightKg] = useState("");

  const [queryUsers, setQueryUsers] = useState("");
  const [queryExternal, setQueryExternal] = useState("");

  const [status, setStatus] = useState({ type: "", text: "" });

  // create external form
const [newCountryCode, setNewCountryCode] = useState("LV");
const [newClubName, setNewClubName] = useState("");
const [newFirstName, setNewFirstName] = useState("");
const [newLastName, setNewLastName] = useState("");
const [newGender, setNewGender] = useState("M");
const [newBirthDate, setNewBirthDate] = useState(""); // yyyy-mm-dd
const [newWeightKg, setNewWeightKg] = useState("");

  const loadUsers = async () => {
  setUsersLoading(true);
  setStatus({ type: "", text: "" });

  try {
    const r = await API.get('/users/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    });

    const list = Array.isArray(r.data) ? r.data : (r.data?.users || []);
    setUsers(list);
  } catch (e) {
    setStatus({ type: "error", text: `Ошибка загрузки пользователей: ${e?.message || e}` });
  } finally {
    setUsersLoading(false);
  }
};


  const loadExternalAthletes = async () => {
  setExternalLoading(true);
  setStatus({ type: "", text: "" });

  try {
    const r = await API.get('/competition/external-athletes', {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    });
    setExternalAthletes(Array.isArray(r.data) ? r.data : []);
  } catch (e) {
    setStatus({ type: "error", text: `Ошибка загрузки внешних спортсменов: ${e?.message || e}` });
  } finally {
    setExternalLoading(false);
  }
};

const createExternalAthlete = async ({ autoAddToTournament }) => {
  setStatus({ type: "", text: "" });

  if (!newClubName.trim()) {
    setStatus({ type: "error", text: "Укажи клуб" });
    return;
  }
  if (!newFirstName.trim() || !newLastName.trim()) {
    setStatus({ type: "error", text: "Укажи имя и фамилию" });
    return;
  }
  if (!newBirthDate) {
    setStatus({ type: "error", text: "Укажи дату рождения" });
    return;
  }

  try {
    // 1) создать клуб
    const clubRes = await API.post(
      "/competition/clubs",
      {
        name: newClubName.trim(),
        country_code: (newCountryCode || "").trim() || null,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
    );
    const club = clubRes.data;

    // 2) создать внешнего спортсмена
    const athleteRes = await API.post(
      "/competition/external-athletes",
      {
        first_name: newFirstName.trim(),
        last_name: newLastName.trim(),
        gender: newGender,
        birth_date: newBirthDate,
        club_id: club?.id || null,
        weight_kg: newWeightKg === "" ? null : Number(newWeightKg),
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
    );

    const athlete = athleteRes.data;

    // 3) обновить список внешних
    await loadExternalAthletes();

    // 4) выбрать созданного в селекте
    setSelectedExternalId(String(athlete.id));
    setSelectedUserId("");

    // 5) (опционально) сразу добавить в турнир
    if (autoAddToTournament) {
      const payload = {
        externalAthleteId: Number(athlete.id),
        discipline,
        weight_kg: weightKg === "" ? (newWeightKg === "" ? null : Number(newWeightKg)) : Number(weightKg),
      };

      await API.post(
        `/competition/tournaments/${tournamentId}/register-external`,
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
      );

      await loadRegistrations();
      setStatus({ type: "ok", text: "✅ Внешний спортсмен создан и добавлен в турнир" });
    } else {
      setStatus({ type: "ok", text: "✅ Внешний спортсмен создан" });
    }

    // очистить форму
    setNewClubName("");
    setNewFirstName("");
    setNewLastName("");
    setNewBirthDate("");
    setNewWeightKg("");
    setNewGender("M");
    setNewCountryCode("LV");
  } catch (e) {
    setStatus({ type: "error", text: `Ошибка создания: ${e?.response?.data?.message || e?.message || e}` });
  }
};


  const loadRegistrations = async () => {
  if (!tournamentId) return;
  setRegsLoading(true);
  setStatus({ type: "", text: "" });

  try {
    const r = await API.get(`/competition/tournaments/${tournamentId}/registrations`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    });
    setRegs(Array.isArray(r.data) ? r.data : []);
  } catch (e) {
    setStatus({ type: "error", text: `Ошибка загрузки участников: ${e?.message || e}` });
  } finally {
    setRegsLoading(false);
  }
};


  useEffect(() => {
    loadUsers();
    loadExternalAthletes();
  }, []);

  useEffect(() => {
    loadRegistrations();
  }, [tournamentId]);

  const usersFiltered = useMemo(() => {
    const q = queryUsers.trim().toLowerCase();
    if (!q) return users;

    return users.filter((u) => {
      const full = `${u.first_name || ""} ${u.last_name || ""}`.toLowerCase();
      const un = (u.username || "").toLowerCase();
      const em = (u.email || "").toLowerCase();
      return full.includes(q) || un.includes(q) || em.includes(q);
    });
  }, [users, queryUsers]);

  const externalFiltered = useMemo(() => {
    const q = queryExternal.trim().toLowerCase();
    if (!q) return externalAthletes;

    return externalAthletes.filter((a) => {
      const full = `${a.first_name || ""} ${a.last_name || ""}`.toLowerCase();
      const club = (a.club_name || "").toLowerCase();
      return full.includes(q) || club.includes(q);
    });
  }, [externalAthletes, queryExternal]);

  // защита от дублей
  const selectedUser = useMemo(
    () => users.find((u) => u.id === Number(selectedUserId)),
    [users, selectedUserId]
  );
  const selectedExternal = useMemo(
    () => externalAthletes.find((a) => a.id === Number(selectedExternalId)),
    [externalAthletes, selectedExternalId]
  );

  const alreadyInThisDiscipline = useMemo(() => {
    if (selectedUserId) {
      return regs.some((r) => r.user_id === Number(selectedUserId) && r.discipline === discipline);
    }
    if (selectedExternalId) {
      return regs.some(
        (r) => r.external_athlete_id === Number(selectedExternalId) && r.discipline === discipline
      );
    }
    return false;
  }, [regs, selectedUserId, selectedExternalId, discipline]);

  const onAdd = async () => {
    setStatus({ type: "", text: "" });

    if (!selectedUserId && !selectedExternalId) {
      setStatus({ type: "error", text: "Выбери спортсмена (из федерации или внешний клуб)" });
      return;
    }
    if (alreadyInThisDiscipline) {
      setStatus({ type: "error", text: "Этот спортсмен уже добавлен в эту дисциплину" });
      return;
    }

    try {
      // ✅ add federation user
      if (selectedUserId) {
        const payload = {
          userId: Number(selectedUserId),
          discipline,
          weight_kg: weightKg === "" ? null : Number(weightKg),
        };

        await API.post(
        `/competition/tournaments/${tournamentId}/register-user`,
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
        );

        setStatus({ type: "ok", text: "✅ Участник (из федерации) добавлен" });
      }

      // ✅ add external athlete
      if (selectedExternalId) {
        const payload = {
          externalAthleteId: Number(selectedExternalId),
          discipline,
          weight_kg: weightKg === "" ? null : Number(weightKg),
        };

        await API.post(
        `/competition/tournaments/${tournamentId}/register-external`,
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
        );


        setStatus({ type: "ok", text: "✅ Внешний спортсмен добавлен" });
      }

      setWeightKg("");
      await loadRegistrations();
    } catch (e) {
      setStatus({ type: "error", text: `Ошибка добавления: ${e.message}` });
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      <h2 style={{ marginBottom: 10 }}>Добавить участника в турнир #{tournamentId}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 0.6fr 0.4fr auto",
          gap: 10,
          alignItems: "end",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 12,
          padding: 12,
        }}
      >
        {/* ✅ select federation users */}
        <div>
          <label style={{ fontSize: 12, opacity: 0.8 }}>Спортсмены федерации (users)</label>
          <input
            value={queryUsers}
            onChange={(e) => setQueryUsers(e.target.value)}
            placeholder="Поиск по имени/username/email..."
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.25)",
              color: "white",
              outline: "none",
              marginBottom: 6,
            }}
          />
          <select
            value={selectedUserId}
            disabled={usersLoading}
            onChange={(e) => {
              const uid = e.target.value;
              setSelectedUserId(uid);
              // если выбираем пользователя — сбрасываем внешнего
              setSelectedExternalId("");
            }}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.25)",
              color: "white",
              outline: "none",
            }}
          >
            <option value="">-- Select user --</option>
            {usersFiltered.map((u) => (
              <option key={u.id} value={u.id} style={{ color: "black" }}>
                {u.last_name} {u.first_name} — {u.username} ({u.email})
              </option>
            ))}
          </select>
          {usersLoading && <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>Загружаю...</div>}
        </div>

        {/* ✅ select external athletes */}
        <div>
          <label style={{ fontSize: 12, opacity: 0.8 }}>Внешние клубы (external athletes)</label>
          <input
            value={queryExternal}
            onChange={(e) => setQueryExternal(e.target.value)}
            placeholder="Поиск по имени/клубу..."
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.25)",
              color: "white",
              outline: "none",
              marginBottom: 6,
            }}
          />
          <select
            value={selectedExternalId}
            disabled={externalLoading}
            onChange={(e) => {
              const eid = e.target.value;
              setSelectedExternalId(eid);
              // если выбираем внешнего — сбрасываем user
              setSelectedUserId("");
            }}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.25)",
              color: "white",
              outline: "none",
            }}
          >
            <option value="">-- Select external athlete --</option>
            {externalFiltered.map((a) => (
              <option key={a.id} value={a.id} style={{ color: "black" }}>
                {a.last_name} {a.first_name}
                {a.club_name ? ` — ${a.club_name}` : ""}
                {a.country_code ? ` (${a.country_code})` : ""}
              </option>
            ))}
          </select>
          {externalLoading && <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>Загружаю...</div>}
        </div>

        <div style={{
  gridColumn: "1 / -1",
  marginTop: 8,
  paddingTop: 10,
  borderTop: "1px solid rgba(255,255,255,0.12)"
}}>
  <div style={{ fontWeight: 800, marginBottom: 8 }}>
    Если нет в списке — создать внешнего спортсмена (левый клуб)
  </div>

  <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1fr 1fr 1fr 0.6fr 0.8fr 0.6fr auto auto", gap: 8 }}>
    <div>
      <label style={{ fontSize: 12, opacity: 0.8 }}>Страна</label>
      <input
        value={newCountryCode}
        onChange={(e) => setNewCountryCode(e.target.value.toUpperCase())}
        placeholder="LV"
        style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.25)", color: "white" }}
      />
    </div>

    <div>
      <label style={{ fontSize: 12, opacity: 0.8 }}>Клуб</label>
      <input
        value={newClubName}
        onChange={(e) => setNewClubName(e.target.value)}
        placeholder="Название клуба"
        style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.25)", color: "white" }}
      />
    </div>

    <div>
      <label style={{ fontSize: 12, opacity: 0.8 }}>Имя</label>
      <input
        value={newFirstName}
        onChange={(e) => setNewFirstName(e.target.value)}
        placeholder="Имя"
        style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.25)", color: "white" }}
      />
    </div>

    <div>
      <label style={{ fontSize: 12, opacity: 0.8 }}>Фамилия</label>
      <input
        value={newLastName}
        onChange={(e) => setNewLastName(e.target.value)}
        placeholder="Фамилия"
        style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.25)", color: "white" }}
      />
    </div>

    <div>
      <label style={{ fontSize: 12, opacity: 0.8 }}>Пол</label>
      <select
        value={newGender}
        onChange={(e) => setNewGender(e.target.value)}
        style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.25)", color: "white" }}
      >
        <option value="M" style={{ color: "black" }}>M</option>
        <option value="F" style={{ color: "black" }}>F</option>
      </select>
    </div>

    <div>
      <label style={{ fontSize: 12, opacity: 0.8 }}>Дата рождения</label>
      <input
        type="date"
        value={newBirthDate}
        onChange={(e) => setNewBirthDate(e.target.value)}
        style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.25)", color: "white" }}
      />
    </div>

    <div>
      <label style={{ fontSize: 12, opacity: 0.8 }}>Вес</label>
      <input
        value={newWeightKg}
        onChange={(e) => setNewWeightKg(e.target.value)}
        placeholder="кг"
        style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.25)", color: "white" }}
      />
    </div>

    <button
      onClick={() => createExternalAthlete({ autoAddToTournament: false })}
      style={{
        padding: "11px 14px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.20)",
        background: "rgba(255,255,255,0.16)",
        color: "white",
        cursor: "pointer",
        fontWeight: 800,
        alignSelf: "end",
      }}
    >
      Сохранить
    </button>

    <button
      onClick={() => createExternalAthlete({ autoAddToTournament: true })}
      style={{
        padding: "11px 14px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.20)",
        background: "rgba(0,255,0,0.10)",
        color: "white",
        cursor: "pointer",
        fontWeight: 800,
        alignSelf: "end",
      }}
    >
      Сохранить + в турнир
    </button>
  </div>
</div>


        {/* discipline */}
        <div>
          <label style={{ fontSize: 12, opacity: 0.8 }}>Дисциплина</label>
          <select
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.25)",
              color: "white",
              outline: "none",
            }}
          >
            {DISCIPLINES.map((d) => (
              <option key={d} value={d} style={{ color: "black" }}>
                {d}
              </option>
            ))}
          </select>

          {alreadyInThisDiscipline && (
            <div style={{ marginTop: 6, fontSize: 12, color: "#ffb3b3" }}>
              Уже добавлен в эту дисциплину
            </div>
          )}
        </div>

        {/* weight */}
        <div>
          <label style={{ fontSize: 12, opacity: 0.8 }}>Вес (кг)</label>
          <input
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            placeholder="например 63.5"
            inputMode="decimal"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.25)",
              color: "white",
              outline: "none",
            }}
          />
          <div style={{ fontSize: 11, opacity: 0.65, marginTop: 6 }}>
            Если пусто — возьмётся вес из профиля (или из external_athletes)
          </div>
        </div>

        {/* buttons */}
        <div>
          <button
            onClick={onAdd}
            disabled={(!selectedUserId && !selectedExternalId) || alreadyInThisDiscipline}
            style={{
              padding: "11px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.20)",
              background:
                (!selectedUserId && !selectedExternalId) || alreadyInThisDiscipline
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(255,255,255,0.16)",
              color: "white",
              cursor:
                (!selectedUserId && !selectedExternalId) || alreadyInThisDiscipline
                  ? "not-allowed"
                  : "pointer",
              fontWeight: 800,
              minWidth: 140,
            }}
          >
            Добавить
          </button>

          <button
            onClick={() => {
              loadUsers();
              loadExternalAthletes();
              loadRegistrations();
            }}
            style={{
              marginTop: 10,
              width: "100%",
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent",
              color: "white",
              cursor: "pointer",
              opacity: 0.9,
            }}
          >
            Обновить
          </button>
        </div>
        <Link to={`/account/sacensibasWako/${id}/wako/categories`}>
        Kategorijas (preview)
        </Link>
      </div>

      {status.text && (
        <div
          style={{
            marginTop: 12,
            padding: 10,
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.12)",
            background:
              status.type === "error" ? "rgba(255,0,0,0.12)" : "rgba(0,255,0,0.10)",
            color: "white",
          }}
        >
          {status.text}
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        <h3 style={{ marginBottom: 8 }}>Участники турнира</h3>

        {regsLoading ? (
          <div style={{ opacity: 0.8 }}>Загружаю...</div>
        ) : (
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.06)" }}>
                  <th style={{ padding: 10, textAlign: "left" }}>ФИО</th>
                  <th style={{ padding: 10, textAlign: "left" }}>Club</th>
                  <th style={{ padding: 10, textAlign: "left" }}>Discipline</th>
                  <th style={{ padding: 10, textAlign: "left" }}>Weight</th>
                  <th style={{ padding: 10, textAlign: "left" }}>Birth</th>
                  <th style={{ padding: 10, textAlign: "left" }}>Type</th>
                  <th style={{ padding: 10, textAlign: "left" }}>ID</th>
                </tr>
              </thead>
              <tbody>
                {regs.map((r) => {
                  const type = r.user_id ? "USER" : "EXTERNAL";
                  const idVal = r.user_id || r.external_athlete_id;
                  return (
                    <tr key={r.registration_id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                      <td style={{ padding: 10, fontWeight: 700 }}>
                        {r.last_name} {r.first_name}
                      </td>
                      <td style={{ padding: 10, opacity: 0.9 }}>{r.club || "-"}</td>
                      <td style={{ padding: 10 }}>{r.discipline}</td>
                      <td style={{ padding: 10 }}>{r.weight_kg ?? "-"}</td>
                      <td style={{ padding: 10 }}>
                        {r.birth_date ? String(r.birth_date).slice(0, 10) : "-"}
                      </td>
                      <td style={{ padding: 10, opacity: 0.85 }}>{type}</td>
                      <td style={{ padding: 10, opacity: 0.85 }}>#{idVal}</td>
                    </tr>
                  );
                })}
                {!regs.length && (
                  <tr>
                    <td colSpan={7} style={{ padding: 12, opacity: 0.8 }}>
                      Пока никого нет
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ marginTop: 14, fontSize: 12, opacity: 0.75 }}>
        * Удаление участника могу добавить позже (нужен DELETE-роут на backend).
      </div>
    </div>
  );
}
