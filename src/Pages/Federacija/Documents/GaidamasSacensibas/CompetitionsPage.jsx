import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
// при желании можно переиспользовать ваш блок
// import CompetitionBlock from "../components/CompetitonComponents/CompetitionBlock";

const API_BASE = "https://myproject123.zapto.org";
const IMG_BASE = `${API_BASE}/upload/`;

export default function CompetitionsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/competitions`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr("Neizdevās ielādēt sacensības.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Парсим даты с учётом того, что на бэке они приходят как строки (YYYY-MM-DD)
  const today = new Date(); // локальная (Europe/Riga)

  function parseDate(d) {
    // безопасный парсер: "2025-08-21" -> new Date(2025,7,21)
    if (!d) return null;
    const [y, m, day] = d.split("-").map(Number);
    if (!y || !m || !day) return null;
    return new Date(y, m - 1, day, 12, 0, 0); // ставим полдень, чтобы исключить смещения по TZ
  }

  const categorized = useMemo(() => {
    const upcoming = [];
    const live = [];
    const past = [];

    items.forEach((c) => {
      const start = parseDate(c.date_start);
      const end = parseDate(c.date_end) || start;

      if (!start) {
        past.push(c); // если дата битая — кидаем в прошедшие, чтобы не ломало
        return;
      }

      if (start > today) {
        upcoming.push(c);
      } else if (end && end < today) {
        past.push(c);
      } else {
        // start <= today <= end
        live.push(c);
      }
    });

    // сортировки: ближайшие сверху, прошлые — от новых к старым
    upcoming.sort((a, b) => parseDate(a.date_start) - parseDate(b.date_start));
    live.sort((a, b) => parseDate(a.date_start) - parseDate(b.date_start));
    past.sort((a, b) => parseDate(b.date_end || b.date_start) - parseDate(a.date_end || a.date_start));

    return { upcoming, live, past };
  }, [items]);

  if (loading) return <div className="container py-10">Ielāde...</div>;
  if (err) return <div className="container py-10 text-red-600">{err}</div>;

  return (
    <div className="competition container">
      <div className="competition-head">
        <h3 className="competition-title">Sacensības</h3>
      </div>

      <Section title="Tuvākās" list={categorized.upcoming} />
      <Section title="Notiek tagad" list={categorized.live} />
      <Section title="Notikušās" list={categorized.past} />

      <style>{`
        .competition .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }
        .comp-card {
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          overflow: hidden;
          background: #fff;
        }
        .comp-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display:block;
        }
        .comp-body {
          padding: 12px 14px;
        }
        .comp-title {
          margin: 0 0 6px;
          font-size: 18px;
          line-height: 1.25;
        }
        .comp-meta {
          font-size: 14px;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );

  function Section({ title, list }) {
    if (!list.length) return null;
    return (
      <div className="mb-10">
        <h4 style={{ margin: "24px 0 12px" }}>{title}</h4>
        <div className="grid">
          {list.map((c) => (
            <article key={c.id} className="comp-card">
              <Link to={`/PublicateCompetition/${c.id}`} aria-label={c.header}>
                <img
                  src={c.image ? `${IMG_BASE}${c.image}` : `${IMG_BASE}placeholder.jpg`}
                  alt={c.header || "Competition"}
                  loading="lazy"
                />
              </Link>
              <div className="comp-body">
                <h5 className="comp-title">
                  <Link to={`/PublicateCompetition/${c.id}`}>{c.header}</Link>
                </h5>
                <div className="comp-meta">
                  {formatDates(c.date_start, c.date_end)}
                  {renderPlace(c)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  function formatDates(start, end) {
    const s = parseDate(start);
    const e = parseDate(end) || s;
    if (!s) return null;

    const fmt = (d) =>
      d.toLocaleDateString("lv-LV", { year: "numeric", month: "short", day: "numeric" });

    const text = s.getTime() === e.getTime() ? fmt(s) : `${fmt(s)} – ${fmt(e)}`;
    return <div>{text}</div>;
  }

  function renderPlace(c) {
    const parts = [c.country, c.city].filter(Boolean);
    if (!parts.length) return null;
    return <div>{parts.join(", ")}</div>;
  }
}
