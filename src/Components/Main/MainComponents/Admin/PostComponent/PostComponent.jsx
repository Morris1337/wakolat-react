import React, {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Импортируем стили
import '../myCustomTheme.scss'
import '../post.scss';

export default function PostComponent() {
// Состояние для хранения данных формы
  const [header, setHeader] = useState("");
  const [images, setImages] = useState(null);
  const [date, setDate] = useState("");
  const [text, setText] = useState("");

  // Функция для обработки отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Используем FormData для работы с файлами
    const formData = new FormData();
    formData.append("header", header);
    formData.append("image", images);  // предполагается, что загружается один файл
    formData.append("text", text);
    formData.append("date", date);


    try {
      const response = await fetch("http://87.228.26.161:8020/api/add_news", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        // Обрабатываем успешный ответ
        console.log("Пост успешно отправлен");
      } else {
        // Обрабатываем ошибку
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
      <h2>Publikacija</h2>
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
                onChange={(e) => setImages(e.target.files[0])}
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
            <button type="submit" >Publicet</button>
        </div>
    </form>
    
  )
}