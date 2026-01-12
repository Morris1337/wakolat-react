import React, { useState, useEffect } from "react";
import axios from "axios";
import "./settings.scss";
import API from "../../../utils/api";

export default function Settings() {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    macibu_darba_vieta: "",
    phone: "",
    gender: "",
    weight: "",
    club: "", // ← исправлено здесь
    body_measurements: [], // Инициализируем как массив
    nodarbibas: [], // Убедитесь, что это поле существует
    minecraft_password: "",
  });
      
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние модального окна
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const options = ['Athlete', 'Coach', 'Judge', 'Support'];;

  // Загрузка данных профиля
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get('/users/profile');
        const data = response.data;
        console.log('Ответ от API:', data.nodarbibas);
    
        // Убедитесь, что nodarbibas всегда массив
        data.nodarbibas = Array.isArray(data.nodarbibas) ? data.nodarbibas : [];
        data.body_measurements = Array.isArray(data.body_measurements) ? data.body_measurements : [];
        setProfileData(prev => ({
          ...prev,
          ...data,
          weight: data.weight || '',
          gender: data.gender || '',
          birth_date: data.birth_date || '',
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone: data.phone || '',
          macibu_darba_vieta: data.macibu_darba_vieta || '',
          body_measurements: Array.isArray(data.body_measurements) ? data.body_measurements : [],
          nodarbibas: Array.isArray(data.nodarbibas) ? data.nodarbibas : [],
          club: data.club || '', // ← перенесено сюда
        }));
        
      } catch (err) {
        console.error('Ошибка при загрузке профиля:', err);
      }
      console.log('Данные профиля на фронтенде:', profileData.nodarbibas);
    };
    fetchProfile();
  }, []);


  // Обновление состояния при изменении полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  
  // Обработка изменения чекбоксов
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedNodarbibas = checked
      ? [...profileData.nodarbibas, value]
      : profileData.nodarbibas.filter((item) => item !== value);
    setProfileData({ ...profileData, nodarbibas: updatedNodarbibas });
  };
  

  // Сохранение изменений
  const saveChanges = async () => {
    try {
      console.log('Отправляемые данные:', profileData);
  
      // Очищаем пустые строки
      const cleanedData = { ...profileData };
      Object.keys(cleanedData).forEach((key) => {
        if (cleanedData[key] === '') cleanedData[key] = null;
      });
  
      await API.put('/users/profile', cleanedData);
  
      if (cleanedData.weight) {
        await API.post('/users/record-weight', {
          userId: profileData.id,
          weight: cleanedData.weight,
        });
      }
  
      if (cleanedData.body_measurements?.length > 0) {
        await API.post('/users/record-body-measurements', {
          userId: profileData.id,
          measurements: cleanedData.body_measurements,
        });
      }
  
      alert('Изменения успешно сохранены!');
    } catch (err) {
      console.error('Ошибка при сохранении данных:', err);
      alert('Не удалось сохранить изменения.');
    }
  };
  
  const handleMeasurementsChange = (e, type) => {
    const { value } = e.target;
  
    const updatedMeasurements = [...profileData.body_measurements];
  
    const index = updatedMeasurements.findIndex(m => m.type === type);
  
    if (index !== -1) {
      updatedMeasurements[index].value = value;
      updatedMeasurements[index].date = new Date().toISOString();
    } else {
      updatedMeasurements.push({ type, value, date: new Date().toISOString() });
    }
  
    setProfileData({ ...profileData, body_measurements: updatedMeasurements });
  };


  return (
    <div className="settings-container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div>
        <label>Vards</label>
        <input
          type="text"
          name="first_name"
          value={profileData.first_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Uzvards</label>
        <input
          type="text"
          name="last_name"
          value={profileData.last_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Dzimšanas datums</label>
        <input
          type="date"
          name="birth_date"
          value={profileData.birth_date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Minecraft parole</label>
        <input
          type="password"
          name="minecraft_password"
          value={profileData.minecraft_password}
          onChange={handleChange}
          placeholder="Jaunā Minecraft parole"
        />
      </div>
      <div>
        <label>Klubs</label>
        <select name="club" value={profileData.club || ''} onChange={handleChange}>
          <option value="">Izvēlies klubu</option>
          <option value="Fun Catchers">Fun Catchers</option>
          <option value="Top Ring">Top Ring</option>
        </select>
      </div>
      <div>
        <label>Mācību/darba vieta</label>
        <input
          type="text"
          name="macibu_darba_vieta"
          value={profileData.macibu_darba_vieta}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Talrunis</label>
        <input
          type="text"
          name="phone"
          value={profileData.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Dzimums</label>
        <select
          type="text"
          name="gender"
          value={profileData.gender}
          onChange={handleChange}
        >
          <option value="">Izvēlieties dzimumu</option>
          <option value="Virietis">Virietis</option>
          <option value="Sieviete">Sieviete</option>
        </select>
      </div>
      <div>
        <label>Nodarbibas</label>
        <button onClick={() => setIsModalOpen(true)}>Izvēlēties</button>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>Izvēlieties nodarbības</h3>
              {options.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    value={option}
                    checked={profileData.nodarbibas.includes(option)}
                    onChange={handleCheckboxChange}
                  />
                  {option}
                </label>
              ))}
              <button onClick={() => setIsModalOpen(false)}>Aizvērt</button>
            </div>
          </div>
        )}
      </div>
      <div>
        {/* <label>Svars</label>
        <input
          type="text"
          name="weight"
          value={profileData.weight}
          onChange={handleChange}
        /> */}
        <label>Saglabāt jauno svaru:</label>
        <input
            type="text"
            name="weight"
            value={profileData.weight}
            onChange={handleChange}
        />
        {/* <button onClick={updateWeight}>Обновить вес</button> */}
      </div>
      <h4>Mērījumi</h4>
      <div>
                    <label htmlFor="">Kakls</label>
                    <input 
                    type="number" 
                    name="Neck" 
                    placeholder="Neck" 
                    value={
                      profileData.body_measurements.find(m => m.type === 'Neck')?.value || ''
                    }
                    onChange={(e) => handleMeasurementsChange(e, "Neck")} required />
                </div>
                <div>
                    <label htmlFor="">Bicepss</label>
                    <input 
                    type="number" 
                    name="Biceps Left" 
                    placeholder="Biceps Left"
                    value={
                      profileData.body_measurements.find(m => m.type === 'Biceps Left')?.value || ''
                    } 
                    onChange={(e) => handleMeasurementsChange(e, "Biceps Left")} required />
                    <input 
                    type="number" 
                    name="Biceps Right"
                    placeholder="Biceps Right" 
                    value={
                      profileData.body_measurements.find(m => m.type === 'Biceps Right')?.value || ''
                    } 
                    onChange={(e) => handleMeasurementsChange(e, "Biceps Right")} required />

                </div>
                <div>
                    <label htmlFor="">Apakšdelms</label>
                    <input 
                    type="number" 
                    name="Forearm Left" 
                    placeholder="Forearm Left" 
                    value={
                      profileData.body_measurements.find(m => m.type === 'Forearm Left')?.value || ''
                    } 
                    onChange={(e) => handleMeasurementsChange(e, "Forearm Left")} required />
                    <input 
                    type="number" 
                    name="Forearm Right"
                    placeholder="Forearm Right" 
                    value={
                      profileData.body_measurements.find(m => m.type === 'Forearm Right')?.value || ''
                    } 
                    onChange={(e) => handleMeasurementsChange(e, "Forearm Right")} required />

                </div>
                <div>
                    <label htmlFor="">Krūšu apjoms</label>
                    <input 
                    type="number" 
                    name="Bust volume" 
                    placeholder="Bust volume" 
                    value={
                      profileData.body_measurements.find(m => m.type === 'Bust volume')?.value || ''
                    } 
                    onChange={(e) => handleMeasurementsChange(e, "Bust volume")} required />
                </div>
                <div>
                    <label htmlFor="">Vidukļa izmērs</label>
                    <input 
                    type="number" 
                    name="Waist size" 
                    placeholder="Waist size" 
                    value={
                      profileData.body_measurements.find(m => m.type === 'Waist size')?.value || ''
                    } 
                    onChange={(e) => handleMeasurementsChange(e, "Waist size")} required />
                </div>
                <div>
                    <label htmlFor="">Vēdera apjoms</label>
                    <input 
                    type="number" 
                    name="Abdominal volume" 
                    placeholder="Abdominal volume" 
                    value={
                      profileData.body_measurements.find(m => m.type === 'Abdominal volume')?.value || ''
                    } 
                    onChange={(e) => handleMeasurementsChange(e, "Abdominal volume")} required />
                </div>
                <div>
                    <label htmlFor="">Gurnu apjoms</label>
                    <input 
                    type="number" 
                    name="Hips" 
                    placeholder="Hips" 
                    value={
                      profileData.body_measurements.find(m => m.type === 'Hips')?.value || ''
                    } 
                    onChange={(e) => handleMeasurementsChange(e, "Hips")} required />
                </div>
                <div>
                    <label htmlFor="">Augšstilba apjoms</label>
                    <input 
                    type="number" 
                    name="Hip volume Left" 
                    placeholder="Hip volume Left" 
                    value={
                      profileData.body_measurements.find(m => m.type === 'Hip volume Left')?.value || ''
                    } 
                    onChange={(e) => handleMeasurementsChange(e, "Hip volume Left")} required />
                    <input 
                    type="number" 
                    name="Hip volume Right" 
                    placeholder="Hip volume Right" 
                    value={
                      profileData.body_measurements.find(m => m.type === 'Hip volume Right')?.value || ''
                    } 
                    onChange={(e) => handleMeasurementsChange(e, "Hip volume Right")} required />
                </div>
                <div>
                    <label htmlFor="">ikru apjoms</label>
                    <input 
                    type="number" 
                    name="Caviar volume Left" placeholder="Caviar volume Left" onChange={(e) => handleMeasurementsChange(e, "Caviar volume Left")} required />
                    <input 
                    type="number" 
                    name="Caviar volume Right" placeholder="Caviar volume Right" onChange={(e) => handleMeasurementsChange(e, "Caviar volume Right")} required />
                </div>
      <button onClick={saveChanges}>Saglabāt izmaiņas</button>
    </div>
  );
}
