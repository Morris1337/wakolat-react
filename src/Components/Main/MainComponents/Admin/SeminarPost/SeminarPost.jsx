import React, { useState } from 'react';
import '../post.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Импортируем стили
import '../myCustomTheme.scss'
import Contryes from '../../../OrhetComponents/contryes'

export default function SeminarPost() {
  const [header, setHeader] = useState("");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [competitionStart, setCompetitionStart] = useState("");
  const [competitionEnd, setCompetitionEnd] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [text, setText] = useState("");

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("header", header);
    formData.append("file", file);
    formData.append("country", selectedCountry);
    formData.append("city", city);
    formData.append("date", date);
    formData.append("email", email);
    formData.append("phone_number", phone);
    formData.append("date_start", competitionStart);
    formData.append("date_end", competitionEnd);
    formData.append("date_registration", registrationDeadline);
    formData.append("price", entryFee);
    formData.append("text", text);

    try {
      const response = await fetch("http://164.92.147.233:8020/api/add_seminar", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Пост успешно отправлен");
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
      <h2>Seminars</h2>
      <div className='information'>
        <div>
          <label htmlFor="">Virsraksts</label>
          <input 
            type="text" 
            placeholder='Virsraksts' 
            value={header}
            onChange={(e) => setHeader(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="">Foto</label>
          <input 
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor="">Datums</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <Contryes selectedCountry={selectedCountry} onCountryChange={handleCountryChange}/>
        <div>
          <label htmlFor="">Adress</label>
          <input 
            type="text" 
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">E-pasts</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Phone</label>
          <input 
            type="tel" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Pieteiksties lidz</label>
          <input 
            type="datetime-local" 
            value={registrationDeadline}
            onChange={(e) => setRegistrationDeadline(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Cena par piedališanu</label>
          <div className='cometition-coast'>
            <input 
              type="number"
              value={entryFee}
              onChange={(e) => setEntryFee(e.target.value)}
            />
            <p>EUR</p>
          </div>
        </div>
      </div>
      <div className='more'>
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
        <button type='submit'>Publicet</button>
      </div>
    </form>
  );
}
