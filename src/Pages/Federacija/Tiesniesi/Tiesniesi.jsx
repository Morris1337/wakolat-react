import React from "react";
import "./tiesniesi.scss";
import NastjaK from "./img/NastjaK.png";
import tumins from "./img/Tumins.jpg";
import jersovs from "./img/Jersovs.png";
import malunovska from "./img/Maļinovska.png";
import fadejeva from "./img/Fadejeva2.png";
import rumjancev from './img/Rumjancev.jpg';
import ella from "./img/Ella.jpg";
import mashaD from "./img/MariaD.jpg";
import matviiN from "./img/MatviiN.jpg";
import milanaL from "./img/MilanaL.jpg";
import ekaterinaL from "./img/KateL.jpg";
import RolandF from "./img/RolandF.jpg";
import margo from "./img/Margo.jpg";
import rolandB from "./img/RolandsB.jpg";
import sashaH from "./img/SashaH.jpg";
/**
 * Формат данных (можешь грузить с бэка и передавать пропом <Tiesniesi data={...}/>):
 * {
 *   intl: { A: Person[], B: Person[], C: Person[] },
 *   national: { A: Person[], B: Person[], C: Person[], D: Person[] },
 *   trainees: Person[] 
 * }
 * Person = { name, city?, club?, email?, photoUrl?, role? }
 */

const demoData = {
  intl: {
    //  email: "darja.strutinska@wakolat.lv",
    A: [{ name: "Darja Strutinska", city: "Rīga", role: "Starptautiskā — A" }],
    B: [{ photoUrl: jersovs, name: "Vladimirs Jeršovs", role: "Starptautiskā — B" },

    ],
    C: [{ photoUrl: NastjaK, name: "Anastasija Kožukovska", role: "Starptautiskā — C" }, 
        { photoUrl: fadejeva, name: "Olga Fadejeva", role: "Starptautiskā — C" }],
  },
  national: {
    A: [{ name: "Edgars Tumiņš", role: "Nacionālā — A" },],
    B: [{ photoUrl: rumjancev, name: "Nikita Rumjancevs", role: "Nacionālā — B"}],
    C: [
      { photoUrl: milanaL, name: "Milana Loginova", role: "Nacionālā — C" },
      { photoUrl: matviiN, name: "Matvii Nikitenko", role: "Nacionālā — C" },
      { photoUrl: ekaterinaL, name: "Jekaterina Litviņenko", role: "Nacionālā — C" },
      { name: "Lelde Luizē Bukane", role: "Nacionālā — C" },
    ],
    D: [
      { photoUrl: margo, name: "Margarita Tihomirova", role: "Nacionālā — D" },
      { photoUrl: ella, name: "Ella Civkore", role: "Nacionālā — D" },
      { name: "Vera Pavlova", role: "Nacionālā — D"  },
      { photoUrl: sashaH, name: "Oleksandr Havryk", role: "Nacionālā — D" },
    ],
    National: [
      { photoUrl: rolandB, name: "Rolands Bāliņš", role: "Nacionālā — National" },
    ],
  },
  trainees: [
    { photoUrl: mashaD, name: "Marija Dekterjova" },
    { name: "Julija Jermolajeva" },
    { photoUrl: malunovska, name: "Nataļja Maļinovska" },
    { photoUrl: RolandF, name: "Rolands Franks" },
    // { photoUrl: sashaH, name: "Oleksandr Harvir" },
  ],
};

// Настройки “как у Valde”: выделяем крупную карточку из intl.A[0]
const settings = { featureIntl: true };

const Initials = ({ name }) => {
  const letters = (name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  return <span className="avatar__initials">{letters || "?"}</span>;
};

const Photo = ({ name, src, size = "md" }) => (
  <div className={`photo photo--${size} ${src ? "" : "is-placeholder"}`}>
    {src ? <img src={src} alt={name} loading="lazy" /> : <Initials name={name} />}
  </div>
);

const JudgeCard = ({ person, size = "md" }) => {
  const { name, city, club, email, photoUrl, role } = person || {};
  return (
    <article className={`judge ${size === "lg" ? "judge--lg" : ""}`}>
      <Photo name={name} src={photoUrl} size={size === "lg" ? "lg" : "md"} />
      <div className="judge__body">
        <div className="judge__name">{name}</div>
        {role && <div className="judge__role">{role}</div>}
        {(email || club || city) && (
          <div className="judge__meta">
            {email && (
              <div className="judge__row">
                <span className="label">e-pasts:</span>{" "}
                <a href={`mailto:${email}`} className="link">{email}</a>
              </div>
            )}
            {(club || city) && (
              <div className="judge__row muted">
                {club ? <span>{club}</span> : null}
                {club && city ? <span className="dot">•</span> : null}
                {city ? <span>{city}</span> : null}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

const Grid = ({ list = [] }) => (
  <div className="grid">
    {list.map((p, i) => (
      <JudgeCard key={p.name + i} person={p} />
    ))}
  </div>
);

export default function Tiesniesi({ data = demoData }) {
  const { intl = {}, national = {}, trainees = [] } = data;
  const featured = settings.featureIntl ? intl.A?.[0] : null;

  // списки без выделенного
  const intlA = intl.A || [];
  const intlB = intl.B || [];
  const intlC = intl.C || [];

  const natA = national.A || [];
  const natB = national.B || [];
  const natC = national.C || [];
  const natD = national.D || [];
  const nat = national.National || [];

  return (
    <main className="tiesnesi">
      {/* Hero как у Valde */}
      <section className="hero">
        <h1>Tiesneši</h1>
        <p className="hero__muted">LKF tiesnešu sastāvs pēc kvalifikācijas kategorijām.</p>
      </section>

      {/* Крупная карточка наверху (International A)
      {featured && (
        <section className="featured">
          <JudgeCard person={featured} size="lg" />
        </section>
      )} */}

      {/* Starptautiskā: A, B, C */}
      <section className="block">
        <h2 className="block__title">Starptautiskā kategorija</h2>
        {!!(intlA?.length + intlB?.length + intlC?.length) ? (
          <>
            {/* {!!intlA?.length && (
              <>
                <h3 className="sub">A</h3>
                <Grid list={intlA} />
              </>
            )} */}
            {!!intlB?.length && (
              <>
                <h3 className="sub">B</h3>
                <Grid list={intlB} />
              </>
            )}
            {!!intlC?.length && (
              <>
                <h3 className="sub">C</h3>
                <Grid list={intlC} />
              </>
            )}
          </>
        ) : (
          <div className="empty">— nav datu —</div>
        )}
      </section>

      {/* Nacionālā: A, B, C, D */}
      <section className="block">
        <h2 className="block__title">Nacionālā kategorija</h2>
        {!!(natA.length + natB.length + natC.length + natD.length) ? (
          <>
            {!!natA.length && (
              <>
                <h3 className="sub">A</h3>
                <Grid list={natA} />
              </>
            )}
            {!!natB.length && (
              <>
                <h3 className="sub">B</h3>
                <Grid list={natB} />
              </>
            )}
            {!!natC.length && (
              <>
                <h3 className="sub">C</h3>
                <Grid list={natC} />
              </>
            )}
            {!!natD.length && (
              <>
                <h3 className="sub">D</h3>
                <Grid list={natD} />
              </>
            )}
            {!!nat.length && (
              <>
                <h3 className="sub">National</h3>
                <Grid list={nat} />
              </>
            )}
          </>
        ) : (
          <div className="empty">— nav datu —</div>
        )}
      </section>

      {/* Stāžieri */}
      <section className="block">
        <h2 className="block__title">Stāžieri</h2>
        {trainees?.length ? <Grid list={trainees} /> : <div className="empty">— nav datu —</div>}
      </section>
    </main>
  );
}
