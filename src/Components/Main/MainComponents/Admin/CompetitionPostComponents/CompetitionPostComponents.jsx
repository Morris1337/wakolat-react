import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Импортируем стили
import '../myCustomTheme.scss'
import '../post.scss';
import Contryes from '../../../OrhetComponents/contryes'

export default function CompetitionPostComponent() {
   const [header, setHeader] = useState("");
   const [images1, setImages1] = useState(null);
   const [date, setDate] = useState("");
   const [selectedCountry, setSelectedCountry] = useState("");
   const [city, setCity] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [weighingTime, setWeighingTime] = useState("");
   const [competitionStart, setCompetitionStart] = useState("");
   const [competitionEnd, setCompetitionEnd] = useState("");
   const [registrationDeadline, setRegistrationDeadline] = useState("");
   const [entryFee, setEntryFee] = useState("");
   const [images2, setImages2] = useState(null);
   const [text, setText] = useState("");

   const handleCountryChange = (event) => {
      setSelectedCountry(event.target.value);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("header", header);
      formData.append("image1", images1);
      formData.append("image2", images2);
      formData.append("country", selectedCountry);
      formData.append("city", city);
      formData.append("date", date);
      formData.append("email", email);
      formData.append("phone_number", phone);
      formData.append("weighingTime", weighingTime);
      formData.append("date_start", competitionStart);
      formData.append("date_end", competitionEnd);
      formData.append("date_registration", registrationDeadline);
      formData.append("price", entryFee);
      formData.append("text", text);

      try {
         const response = await fetch("http://87.228.26.161:8020/api/add_competition", {
            method: "POST",
            body: formData,
         });
         if (response.ok) {
            alert("Пост успешно отправлен");
         } else {
            console.error("Ошибка при отправке поста");
         }
      } catch (error) {
         console.error("Запрос не удался", error);
      }
   };

   const handleTextChange = (value) => {
    setText(value); // Обновляем состояние при изменении текста
  };

 // Модули для панели инструментов
 const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }], // Цвет текста и фона
    [{ 'align': [] }],
    ['link', 'image'], // Ссылки и изображения
    ['clean'] // Кнопка очистки форматирования
  ]
};

// Форматы, которые будут поддерживаться
const formats = [
  'header', 'font',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'color', 'background',
  'align',
  'link', 'image'
];

   return (
      <form className='post-component' onSubmit={handleSubmit}>
         <div className='information'>
            <div>
               <label htmlFor="header">Virsraksts</label>
               <input 
                  type="text" 
                  placeholder='Virsraksts' 
                  value={header}
                  onChange={(e) => setHeader(e.target.value)} 
               />
            </div>
            <div>
               <label htmlFor="image1">Foto</label>
               <input 
                  type="file"
                  onChange={(e) => setImages1(e.target.files[0])} 
               />
            </div>
            <div>
               <label htmlFor="date">Datums</label>
               <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)} 
               />
            </div>
            <Contryes selectedCountry={selectedCountry} onCountryChange={handleCountryChange}/>
            <div>
               <label htmlFor="city">Pilseta</label>
               <input 
                  type="text" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)} 
               />
            </div>
            <div>
               <label htmlFor="email">E-pasts</label>
               <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
               />
            </div>
            <div>
               <label htmlFor="phone">Phone</label>
               <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)} 
               />
            </div>
            <div>
               <label htmlFor="weighingTime">Sveršana</label>
               <input 
                  type="datetime-local" 
                  value={weighingTime}
                  onChange={(e) => setWeighingTime(e.target.value)} 
               />
            </div>
            <div>
               <label htmlFor="competitionStart">Sacensības sākums</label>
               <input 
                  type="date" 
                  value={competitionStart}
                  onChange={(e) => setCompetitionStart(e.target.value)} 
               />
            </div>
            <div>
               <label htmlFor="competitionEnd">Sacensības beigums</label>
               <input 
                  type="date" 
                  value={competitionEnd}
                  onChange={(e) => setCompetitionEnd(e.target.value)} 
               />
            </div>
            <div>
               <label htmlFor="registrationDeadline">Pieteikties līdz</label>
               <input 
                  type="datetime-local" 
                  value={registrationDeadline}
                  onChange={(e) => setRegistrationDeadline(e.target.value)} 
               />
            </div>
            <div>
               <label htmlFor="entryFee">Cena par piedalīšanos</label>
               <div className='competition-cost'>
                  <input 
                     type="number" 
                     value={entryFee}
                     onChange={(e) => setEntryFee(e.target.value)} 
                  />
                  <p>EUR</p>
               </div>
            </div>
            <div>
               <label htmlFor="image2">Foto</label>
               <input 
                  type="file" 
                  onChange={(e) => setImages2(e.target.files[0])} 
               />
            </div>
         </div>
         <div className='more'>
            {/* <textarea 
               name="text" 
               cols="30" 
               rows="10" 
               placeholder="Ieraksta teksts"
               value={text}
               onChange={(e) => setText(e.target.value)}
            ></textarea> */}
            <ReactQuill 
              value={text} 
              onChange={handleTextChange} 
              modules={modules} // Добавляем модули для панели
              formats={formats} // Добавляем форматы
              placeholder="Compose an epic..."  // Плейсхолдер
              theme="snow"  // Тема
              className='myCustomTheme'
            />
         </div>
         <div className='button'>
            <button type="submit">Publicēt</button>
         </div>
      </form>
   );
}
