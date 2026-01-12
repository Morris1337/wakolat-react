import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Убедись, что библиотека установлена
import { useNavigate } from "react-router-dom";

const GymQRPage = () => {
    const [qrValue, setQrValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
                if (decodedToken?.id) {
                    const qrLink = `${window.location.origin}/toggle-gym?userId=${decodedToken.id}`;
                    setQrValue(qrLink);
                }
            }
        } catch (error) {
            console.error("Ошибка при обработке токена:", error);
        }
    }, []);

    // Обработчик для перехода на страницу активностей
    const handleQRCodeScan = () => {
        navigate("/account/activities"); // Перенаправляем пользователя после сканирования
    };

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>QR-код для зала</h1>
            <p>Отсканируйте, чтобы перейти к активностям</p>
            
            {qrValue ? (
                <div onClick={handleQRCodeScan} style={{ cursor: "pointer", display: "inline-block" }}>
                    <QRCodeCanvas value={qrValue} size={300} />
                </div>
            ) : (
                <p>⏳ Генерация QR-кода...</p>
            )}

            <br />
            <button onClick={handleQRCodeScan} style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}>
                🚀 Перейти к активностям
            </button>
            <br />
            <button onClick={window.print} style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}>
                🖨️ Распечатать QR-код
            </button>
            <br />
            <button onClick={() => navigate("/")} style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}>
                🔙 Вернуться назад
            </button>
        </div>
    );
};

export default GymQRPage;
