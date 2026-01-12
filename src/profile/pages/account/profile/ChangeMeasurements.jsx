import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "./profile.scss"
import API from '../../../utils/api';
import { UserContext } from '../../../Context/UserContext';


export default function ChangeMeasurements({ closeModal, updateBodyMeasurementsHistory }) {
    const [profileData, setProfileData] = useState({
        first_name: "",
        last_name: "",
        birth_date: "",
        macibu_darba_vieta: "",
        phone: "",
        gender: "",
        weight: "",
        body_measurements: [], // Значение по умолчанию как пустой массив
      });
      const { user } = useContext(UserContext);
      const userId = user?.id;

      const refreshToken = async () => {
        try {
            const response = await API.post('/users/refresh-token');
            localStorage.setItem('accessToken', response.data.accessToken);
            return response.data.accessToken;
        } catch (error) {
            console.error('Ошибка обновления токена', error);
            return null;
        }
    };
  
    
    useEffect(() => {
      const fetchProfile = async () => {
          try {
              const response = await API.get("/users/profile", {
                  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
              });
  
              console.log("📥 Загруженные данные профиля:", response.data);
              
              if (!response.data.id) {
                  console.error("❌ Ошибка: отсутствует userId в API-ответе!");
              }
  
              setProfileData((prev) => ({
                  ...prev,
                  ...response.data,
                  id: response.data.id || null,
                  body_measurements: response.data.body_measurements || [],
              }));
          } catch (error) {
              console.error("❌ Ошибка при загрузке профиля:", error);
          }
      };
      fetchProfile();
  }, []);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      const userId = user?.id;
      // const userId = localStorage.getItem('userId');
      try {
        const response = await API.get(`/users/${userId}/profile`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных профиля:', error);
      }
    };
  
    fetchProfile();
  }, [localStorage.getItem('userId')]); // Следим за изменениями userId
  
  
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleMeasurementsChange = (e, type) => {
        const { value } = e.target;
        const updatedMeasurements = [...profileData.body_measurements];
        const index = updatedMeasurements.findIndex((m) => m.type === type);
    
        if (index !== -1) {
          updatedMeasurements[index].value = value;
          updatedMeasurements[index].date = new Date().toISOString();
        } else {
          updatedMeasurements.push({ type, value, date: new Date().toISOString() });
        }
    
        setProfileData((prev) => ({
          ...prev,
          body_measurements: updatedMeasurements,
        }));
      };
      // console.log("🔍 [DEBUG] userContext:", user);

      const saveWeight = async () => {
        try {
          // console.log("🔍 [DEBUG] userContext:", user);
          

            console.log("📤 [DEBUG] Отправляемые данные:", profileData);
    
            const userId = user?.id || localStorage.getItem('userId');
            if (!userId) {
                console.error("❌ Ошибка: отсутствует userId");
                alert("Ошибка: пользователь не загружен.");
                return;
            }
    
            if (!profileData.weight) {
                console.error("❌ Ошибка: вес не указан");
                alert("Ошибка: вес не указан.");
                return;
            }
    
            const response = await API.post("/users/update-weight", {
                userId: profileData.id, 
                weight: profileData.weight,
            });
    
            console.log("✅ [DEBUG] Вес успешно обновлен!", response.data);
            alert("Вес успешно сохранен!");
        } catch (error) {
            console.error("Ошибка при сохранении веса:", error);
            alert("Ошибка при сохранении веса.");
        }
    };
    
    

    const saveMeasurements = async () => {
        try {
            if (profileData.body_measurements.length > 0) {
                await API.post("/users/record-body-measurements", {
                  userId: profileData.id,
                  measurements: profileData.body_measurements,
                });
              }
              // Обновление истории замеров в Profile.jsx
                if (updateBodyMeasurementsHistory) {
                    await updateBodyMeasurementsHistory();
                }

            alert("Замеры успешно сохранены!");
        } catch (error) {
            console.error("Ошибка при сохранении замеров:", error);
            alert("Не удалось сохранить замеры.");
        }
    };
    
      // const saveChanges = async () => {
      //   console.log("🔑 Текущий accessToken:", localStorage.getItem("accessToken"));
      //   try {
      //     console.log("🔑 Текущий accessToken:", localStorage.getItem("accessToken"));

      //     await API.put("/users/profile", profileData);
    
      //     if (profileData.weight) {
      //       await API.post("/users/record-weight", {
      //         userId: profileData.id,
      //         weight: profileData.weight,
      //       });
      //     }
    
      //     if (profileData.body_measurements.length > 0) {
      //       await API.post("/users/record-body-measurements", {
      //         userId: profileData.id,
      //         measurements: profileData.body_measurements,
      //       });
            
      //     }
      //     // Обновление истории замеров в Profile.jsx
      //       if (updateBodyMeasurementsHistory) {
      //           await updateBodyMeasurementsHistory();
      //       }
            
    
      //     alert("Изменения успешно сохранены!");
      //     closeModal();
      //   } catch (error) {
      //     console.error("Ошибка при сохранении данных:", error);
      //     alert("Не удалось сохранить изменения.");
      //   }
      // };
      
    
      if (!profileData) {
        return <div>Загрузка...</div>;
      }
      
  
    return (
      <div className="modal-overlay-measurements" onClick={closeModal}>
        <div className="modal-content-measurements" onClick={(e) => e.stopPropagation()}>
          <label>Ievadiet jauno svaru:</label>
          <input
            type="text"
            name="weight"
            value={profileData.weight}
            onChange={handleChange}
          />
          <button onClick={saveWeight}>Atjaunot svaru</button>
      {/* </div> */}
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
            <button onClick={saveMeasurements}>Saglabāt mērījumus</button>
            {/* Кнопка для сохранения всех данных */}
            {/* <button onClick={saveChanges}>Saglabāt visu</button> */}
      </div>
    </div>
  );
};