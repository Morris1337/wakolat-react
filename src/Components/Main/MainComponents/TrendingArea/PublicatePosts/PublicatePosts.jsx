import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import './publicatePosts.scss'
import ScrollToTop from '../../../OrhetComponents/ScrollToTop';
import img from'./eiropasIzlase.jpg'
import fb from './icon-fb.png'
import ins from './icon-ins.png'
import tw from './icon-tw.png'
import yo from './icon-yo.png'

export default function PublicatePosts() {
    const { id } = useParams(); // Получаем id из URL
    const [publicateNews, setPublicateNews] = useState(null); // Исправляем начальное состояние

    useEffect(() => {
        async function get_one_news() {
        const url = "http://164.92.147.233:8020/api/get_one_news/"; // Передаем ID в запрос
        try {
            const result = await fetch(url, {
            method: 'POST', // Метод запроса
            headers: {
                'Content-Type': 'application/json', // Указываем тип содержимого
            },
            body: JSON.stringify({"id": id}), // Преобразуем объект в JSON
        });
            const data = await result.json();
            console.log(data);
            setPublicateNews(data);
        } catch (error) {
            console.error("Ошибка загрузки данных соревнования:", error);
        }
        }

        get_one_news();
    }, [id]); // Добавляем зависимость от ID

    // Проверяем, загружены ли данные
    if (!publicateNews) {
        return <p>Loading...</p>;
    }

  // Отображаем информацию о соревновании

  const currentUrl = window.location.href; // Получаем текущий URL страницы

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    instagram: `https://instagram.com`, // Прямая ссылка не работает, Instagram требует моб. приложения
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=Check this out!`,
    youtube: `https://youtube.com`, // YouTube не поддерживает шейринг ссылок, так как это видеоплатформа
  };
  return (
    <div key={publicateNews.id} className="publication-page">
      <ScrollToTop />
        <div class="about-img">
            <img src={`http://164.92.147.233:8020/upload/${publicateNews.image}`} alt=""/>
        </div>
        <div class="section-tittle">
            <h3>{publicateNews.header}</h3>
        </div>
        <div class="about-prea">
            <div dangerouslySetInnerHTML={{ __html: publicateNews.text }}/>
        </div> 

        {/* <div class="section-tittle">
            <h3>{publicateNews.date}</h3>
        </div> */}

        <div className="social-share">
      <div className="section-tittle">
        <h3 className="">Share:</h3>
        <ul>
          <li>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer">
            <img src={fb} alt="Share on Facebook"/>
          </a>
          </li>
          <li>
            <a href={shareUrls.instagram} target="_blank" rel="noopener noreferrer">
              <img src={ins} alt="Share on Instagram"/>
            </a>
          </li>
          <li>
            <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer">
              <img src={tw} alt="Share on Twitter"/>
            </a>
          </li>
          <li>
            <a href={shareUrls.youtube} target="_blank" rel="noopener noreferrer">
              <img src={yo} alt="YouTube"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
        {/* <div className="comeback-form">
            <form className="form-contact" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
                <div className="text-place">
                    <div className="first-place">
                        <textarea className="form-control w-100 error" name="message" id="message" cols="30" rows="9" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'" placeholder="Enter Message"></textarea>
                    </div>
                    <div className='second-place'>
                        <div className="form-group">
                            <input className="form-control error" name="name" id="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your name'" placeholder="Enter your name"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control error" name="email" id="email" type="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email address'" placeholder="Email"/>
                        </div>
                    </div>
                    <div className="therd-place">
                        <input className="form-control error" name="subject" id="subject" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Subject'" placeholder="Enter Subject"/>
                    </div>
                </div>
                <div className="publicate-post-button">
                    <button type="submit" class="button button-contactForm boxed-btn">Send</button>
                </div>
            </form>
        </div>  */}
    </div>
  )
}
