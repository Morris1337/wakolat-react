import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import McApi from '../../../../../utils/mcApi';
import './McPlayerProfile.scss'; // добавим чуть позже

const STAT_LIST = ['str', 'agi', 'vit', 'dex', 'int', 'luk'];

const McPlayerProfile = () => {
    const { userId  } = useParams();
  const [profile, setProfile] = useState(null);
  const [statPanel, setStatPanel] = useState(null);
  const [tempStats, setTempStats] = useState({});
  const [available, setAvailable] = useState(0);
  const [modified, setModified] = useState(false);
  const [effects, setEffects] = useState({});

  useEffect(() => {
    McApi.get(`/minecraft/player-id/${userId}`)
      .then(res => {
        setProfile(res.data);
  
        // 🔥 После получения профиля — подгружаем эффекты и статы
        McApi.get(`/minecraft/effects/${res.data.user_id}`).then(e => setEffects(e.data));
        McApi.get(`/minecraft/full-stats/${res.data.user_id}`).then(fs => {
          setStatPanel(fs.data.stats);
          setTempStats(fs.data.stats);
          setAvailable(fs.data.available);
        });
      })
      .catch(err => console.error('Ошибка загрузки профиля:', err));
  }, [userId]);
  

  const incrementStat = (stat) => {
    if (available <= 0) return;
    setTempStats(prev => ({ ...prev, [stat]: prev[stat] + 1 }));
    setAvailable(prev => prev - 1);
    setModified(true);
  };

  const saveStats = async () => {
    await McApi.put(`/minecraft/stats/${profile.uuid}`, tempStats);
    setModified(false);
  };


  if (!profile) return <p>Загрузка...</p>;

  return (
    <div className="profile-container-minecraft">
      <div className="skin-preview">
        <img
          src={`https://crafatar.com/renders/body/${profile.uuid}?overlay`}
          alt="Skin"
        />
        <p><strong>{profile.minecraft_nick}</strong></p>
      </div>

      <div className="stats">
        <p>❤️ Здоровье: {profile.health} / {profile.max_health}</p>
        <p>🛡️ Броня: {profile.armor}</p>
        <p>⭐ Уровень: {profile.level}</p>
        <p>🗡️ Оружие: {profile.main_hand}</p>
      </div>

      <div className="stat-distribution">
        <h4>📊 Характеристики:</h4>
        {STAT_LIST.map(stat => (
          <div key={stat} className="stat-row">
            <span>{stat.toUpperCase()}: {tempStats[stat]}</span>
            {available > 0 && (
              <button onClick={() => incrementStat(stat)}>+</button>
            )}
          </div>
        ))}
        <p>🧠 Свободных очков: {available}</p>
        <button onClick={saveStats} disabled={!modified}>💾 Сохранить</button>
      </div>

      <div className="active-effects">
        <h4>✨ Активные бонусы:</h4>
        {/* <ul>
          {Object.entries(effects).map(([key, val]) => (
            <li key={key}>{key.replaceAll('_', ' ')}: +{val}</li>
          ))}
        </ul> */}
        {/* <p>{profile.effects}</p> */}
      </div>

      <div className="effects">
        <h4>🧪 Эффекты:</h4>
        <ul>
          {profile.effects.map((effect, i) => (
            <li key={i}>{effect}</li>
          ))}
        </ul>
      </div>

      <div className="inventory">
        <h4>🎒 Инвентарь:</h4>
        <div className="inventory-grid">
          {Array.from({ length: 27 }).map((_, i) => {
            const item = profile.inventory[i];
            return (
              <div className="inventory-slot" key={i}>
                {item ? (
                  <div className="item">
                    <img
                      src={`https://minecraftitemids.com/item/32/${item.item}.png`}
                      alt={item.item}
                    />
                    <span className="amount">{item.amount}</span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default McPlayerProfile;
