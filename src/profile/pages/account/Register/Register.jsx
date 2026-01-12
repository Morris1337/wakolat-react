import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API from '../../../utils/api';
import '../Settings/settings.scss'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        birth_date: '',
        gender: '',
        weight: '',
        macibu_darba_vieta: null, // <-- вернуть поле и сразу как null
        nodarbibas: [],
        club: '', // <-- добавлено
        minecraft_password: '', 
        profile_picture: null,
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

      const [isModalOpen, setIsModalOpen] = useState(false); // Состояние модального окна
      const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
      const options = ['Athlete', 'Coach', 'Judge', 'Support'];

          // Функция валидации перед отправкой формы
    const validateForm = () => {
        let newErrors = {};
        if (!formData.username) newErrors.username = "Ievadiet lietotājvārdu";
        if (!formData.email) newErrors.email = "Ievadiet e-pastu";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Nederīgs e-pasts";
        if (!formData.password) newErrors.password = "Ievadiet paroli";
        if (!formData.gender) newErrors.gender = "Izvēlieties dzimumu";
        if (!formData.birth_date) newErrors.birth_date = "Norādiet dzimšanas datumu";
        if (!formData.weight || isNaN(formData.weight)) newErrors.weight = "Ievadiet derīgu svaru";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // true, если ошибок нет
    };


      // Обработка изменения чекбоксов
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const updatedNodarbibas = checked
        ? [...formData.nodarbibas, value]
        : formData.nodarbibas.filter((item) => item !== value);
        setFormData({ ...formData, nodarbibas: updatedNodarbibas });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Прерываем, если есть ошибки

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'profile_picture' && formData.profile_picture) {
                formDataToSend.append('profile_picture', formData.profile_picture);
            } else if (key === 'weight') {
                formDataToSend.append(key, parseFloat(formData[key])); // Преобразуем в число
            } else if (key === 'body_measurements') {
                const measurements = formData[key].map(m => ({
                    ...m,
                    value: parseFloat(m.value) // Преобразуем значения в числа
                }));
                formDataToSend.append(key, JSON.stringify(measurements));
            } else {
                formDataToSend.append(key, JSON.stringify(formData[key]));
         }
        });

        
        try {
            console.log("🔄 Отправляем запрос на сервер...");
            // alert('успех')
            setIsSuccessModalOpen(true);
        
            const response = await API.post('/users/register', formData, {
                headers: { 'Content-Type': 'application/json' }
            });
        
            console.log("✅ Ответ от сервера:", response);
        
            if (response.status === 200) {
                console.log("🎉 Регистрация успешна! Устанавливаем isSuccessModalOpen = true...");
                alert("✅ Reģistrācija veiksmīga!");
                setIsSuccessModalOpen(true);
            } else {
                console.warn("⚠️ Сервер вернул неожиданный статус:", response.status);
            }
        } catch (err) {
            console.error("❌ Ошибка регистрации:", err);
            console.log("🛑 Подробности ошибки:", err.response);
            // alert(`Reģistrācijas kļūda: ${err.response?.data?.message || err.message}`);
        }
                 
    };

    useEffect(() => {
        console.log("isSuccessModalOpen:", isSuccessModalOpen);
    }, [isSuccessModalOpen]);    

    // const handleMeasurementsChange = (e, type) => {
    //     setFormData(prevFormData => {
    //         const updatedMeasurements = prevFormData.body_measurements.map(m =>
    //             m.type === type ? { ...m, value: parseFloat(e.target.value), date: new Date().toISOString() } : m
    //         );
    //         return { ...prevFormData, body_measurements: updatedMeasurements };
    //     });
    // };
    
    return (
        <div>
            <h2>Register</h2>
            <form className="settings-container" onSubmit={handleSubmit}> 
                <div>
                    <label htmlFor="">Lietotājvārds</label>
                    <input step="0.1" min="0" type="text" name="username" placeholder="Username" onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="">e-pasts</label>
                    <input step="0.1" min="0" type="email" name="email" placeholder="Email" onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="">Talrunis</label>
                    <input step="0.1" min="0" type="text" name="phone" placeholder="+371 12345678" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="">Sportista Vārds</label>
                    <input step="0.1" min="0" type="text" name="first_name" placeholder="Name" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="">Sportista Uzvārds</label>
                    <input step="0.1" min="0" type="text" name="last_name" placeholder="Surename" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="">Parole</label>
                    <input step="0.1" min="0" type="password" name="password" placeholder="pass1234" onChange={handleChange} required />
                </div>
                <div>
                <label>Minecraft parole</label>
                <input
                    type="password"
                    name="minecraft_password"
                    value={formData.minecraft_password}
                    onChange={handleChange}
                    placeholder="Jaunā Minecraft parole"
                    required
                />
            </div>
                <div>
                    <label htmlFor="">Sportista Dzimšanas datums</label>
                    <input step="0.1" min="0" type="date" name="birth_date" onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="">Sportista Dzimums</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Izvēlieties dzimumu</option>
                        <option value="Virietis">Virietis</option>
                        <option value="Sieviete">Sieviete</option>
                    </select>
                </div>
                {/* <div>
                    <label htmlFor="">Mācību/Darba vieta</label>
                    <input type="text" name="macibu_darba_vieta" placeholder="School Nr. 1" onChange={handleChange}/>
                </div> */}
                <div>
                    <label htmlFor="">Nodarbības</label>
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
                                    checked={formData.nodarbibas.includes(option)}
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
                    <label htmlFor="">Sportista Svars</label>
                    <input step="0.1" min="0" type="number" name="weight" placeholder="weight" onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="club">Klubs</label>
                    <select name="club" value={formData.club || ''} onChange={handleChange} required>
                        <option value="">Izvēlies klubu</option>
                        <option value="Fun Catchers">Fun Catchers</option>
                        <option value="Top Ring">Top Ring</option>
                        <option value="Kikboksa un boksa skola">Kikboksa un boksa skola "Rīga"</option>
                        <option value="Ballistic Boxing Club">Ballistic Boxing Club</option>
                        <option value="Favorīts">Sporta klubs „Favorīts”</option>
                        <option value="Skits">Cīņu mākslas sporta klubs "Skits"</option>
                        <option value="Silver Griffin">Silver Griffin</option>
                        <option value="Galeev">Galeev Team</option>
                        <option value="Tkachenko Team">Tkachenko Team</option>
                        <option value="Cīņu klubs Kuldīga">Cīņu klubs Kuldīga</option>
                        <option value="Muay Thai Academy">Muay Thai Academy</option>
                        <option value="Sporta klubs LTCS">Sporta klubs "LTCS"</option>
                        <option value="Latvijas Muay Thai Līga">Latvijas Muay Thai Līga</option>
                        <option value="Cīņu Mākslas Centrs BUDO">Cīņu Mākslas Centrs BUDO</option>
                        <option value="K Sports">Liepājas Kikboksinga Klubs “K Sports”</option>
                        <option value="Ventspils Kikboksa Leģions">Ventspils Kikboksa Leģions</option>
                        <option value="TM Gym">TM Gym</option>
                        <option value="Lāčplēša Cīņu Leģions">Lāčplēša Cīņu Leģions</option>
                        <option value="Golden Glory">Golden Glory</option>
                        <option value="Olympic Boxing Team">Boksa un kikboksa klubs "Olympic Boxing Team"</option>
                    </select>
                </div>

                {/* <h4>Mērījumi</h4> */}
                {/* <div>
                    <label htmlFor="">Kakls</label>
                    <input step="0.1" min="0" type="number" name="Neck" placeholder="Neck" onChange={(e) => handleMeasurementsChange(e, "Neck")} required />
                </div>
                <div>
                    <label htmlFor="">Bicepss</label>
                    <input step="0.1" min="0" type="number" name="Biceps Left" placeholder="Biceps Left" onChange={(e) => handleMeasurementsChange(e, "Biceps Left")} required />
                    <input step="0.1" min="0" type="number" name="Biceps Right" placeholder="Biceps Right" onChange={(e) => handleMeasurementsChange(e, "Biceps Right")} required />

                </div>
                <div>
                    <label htmlFor="">Apakšdelms</label>
                    <input step="0.1" min="0" type="number" name="Forearm Left" placeholder="Forearm Left" onChange={(e) => handleMeasurementsChange(e, "Forearm Left")} required />
                    <input step="0.1" min="0" type="number" name="Forearm Right" placeholder="Forearm Right" onChange={(e) => handleMeasurementsChange(e, "Forearm Right")} required />

                </div>
                <div>
                    <label htmlFor="">Krūšu apjoms</label>
                    <input step="0.1" min="0" type="number" name="Bust volume" placeholder="Bust volume" onChange={(e) => handleMeasurementsChange(e, "Bust volume")} required />
                </div>
                <div>
                    <label htmlFor="">Vidukļa izmērs</label>
                    <input step="0.1" min="0" type="number" name="Waist size" placeholder="Waist size" onChange={(e) => handleMeasurementsChange(e, "Waist size")} required />
                </div>
                <div>
                    <label htmlFor="">Vēdera apjoms</label>
                    <input step="0.1" min="0" type="number" name="Abdominal volume" placeholder="Abdominal volume" onChange={(e) => handleMeasurementsChange(e, "Abdominal volume")} required />
                </div>
                <div>
                    <label htmlFor="">Gurnu apjoms</label>
                    <input step="0.1" min="0" type="number" name="Hips" placeholder="Hips" onChange={(e) => handleMeasurementsChange(e, "Hips")} required />
                </div>
                <div>
                    <label htmlFor="">Augšstilba apjoms</label>
                    <input step="0.1" min="0" type="number" name="Hip volume Left" placeholder="Hip volume Left" onChange={(e) => handleMeasurementsChange(e, "Hip volume Left")} required />
                    <input step="0.1" min="0" type="number" name="Hip volume Right" placeholder="Hip volume Right" onChange={(e) => handleMeasurementsChange(e, "Hip volume Right")} required />
                </div>
                <div>
                    <label htmlFor="">ikru apjoms</label>
                    <input step="0.1" min="0" type="number" name="Caviar volume Left" placeholder="Caviar volume Left" onChange={(e) => handleMeasurementsChange(e, "Caviar volume Left")} required />
                    <input step="0.1" min="0" type="number" name="Caviar volume Right" placeholder="Caviar volume Right" onChange={(e) => handleMeasurementsChange(e, "Caviar volume Right")} required />
                </div> */}
                <button type="submit">Register</button>
            </form>
            {isSuccessModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <h3>Reģistrācija veiksmīga!</h3>
                    <p>Jūs esat veiksmīgi reģistrējies. Tagad varat pieteikties.</p>
                    <button onClick={() => navigate('/#/login')}>Turpināt</button>
                </div>
            </div>
        )}

        </div>
    );
};

export default Register;
