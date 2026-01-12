import React, { useEffect, useState } from "react";

const LiveStream = () => {
    const [videoId, setVideoId] = useState(null);
    const API_KEY = "AIzaSyC37S_za3fcsPn5SugZqEu71p_gXnkzo_M"; // Замени на свой реальный ключ
    const CHANNEL_ID = "UCZo0FXzlnMcSSa1XDvpG3NQ";

    useEffect(() => {
        const fetchLiveStream = async () => {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`
                );

                if (!response.ok) {
                    throw new Error(`Ошибка API: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log("Ответ YouTube API:", data);

                if (data.items && data.items.length > 0) {
                    setVideoId(data.items[0].id.videoId);
                } else {
                    console.warn("Нет активных трансляций");
                    setVideoId(null);
                }
            } catch (error) {
                console.error("Ошибка при получении трансляции:", error);
            }
        };

        fetchLiveStream();
        const interval = setInterval(fetchLiveStream, 30000); // Проверять каждые 30 секунд

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2>Текущая трансляция</h2>
            {videoId ? (
                <iframe
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <p>Сейчас нет активных трансляций.</p>
            )}
        </div>
    );
};

export default LiveStream;
