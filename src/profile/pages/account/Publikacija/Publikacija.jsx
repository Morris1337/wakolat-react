import React, { useState } from 'react';
import API from '../../../utils/api';
import '../profile/profile.scss';

export default function Publikacija() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('accessToken');
            const formData = new FormData();

            // Добавляем title и content всегда
            formData.append('title', title);
            formData.append('content', content);

            // Добавляем изображение только если оно выбрано
            if (image) {
                formData.append('image', image);
            } else {
                formData.append('image', new Blob()); // Отправляем пустой Blob, чтобы избежать 400 ошибки
            }

            console.log('Отправляемые данные:');
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            const response = await API.post('/posts/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Post created:', response.data);
            window.location.reload();
        } catch (err) {
            console.error('Error creating post:', err);
        }
    };

    return (
        <div className="profile-publikacija-container">
            <form onSubmit={handleSubmit} className=''>
                <div>
                    <label htmlFor="image">Attēls</label>
                    <input
                        type="file"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setImage(e.target.files[0]); // Если выбрали файл, загружаем
                            } else {
                                setImage(null); // Если файл не выбран, передаём null
                                console.error('No file selected');
                            }
                        }}
                    />
                    <label htmlFor="title">Virsraksts</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    {/* <label htmlFor="content">Content</label> */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Publicēt</button>
            </form>
        </div>
    );
}
