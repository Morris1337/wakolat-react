import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../../../../utils/api';

export default function UserPostProfile({ userId }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await API.get(`/posts?userId=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                const sortedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setPosts(sortedPosts);
            } catch (err) {
                console.error('Error fetching posts:', err);
            }
        };
    
        fetchPosts();
    }, [userId]);

    const handleDelete = async (postId) => {
        if (!window.confirm("Вы уверены, что хотите удалить эту новость?")) return;
    
        try {
            const token = localStorage.getItem('accessToken');
            await API.delete(`/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Удаляем новость из состояния после успешного удаления
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (err) {
            console.error('Ошибка при удалении новости:', err);
        }
    };
    

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <div>
                        <h3>{post.title}</h3>
                        <p>{new Date(post.created_at).toLocaleDateString()}</p>
                        {post.image_data && (
                            <img 
                                src={`data:image/jpeg;base64,${post.image_data}`} 
                                alt={post.title} 
                                style={{ width: '300px', height: 'auto' }} 
                            />
                        )}
                    </div>
                    <p>{post.content}</p>
                    <button onClick={() => handleDelete(post.id)}>Dzest</button>
                </div>
            ))}
        </div>
    );
}
