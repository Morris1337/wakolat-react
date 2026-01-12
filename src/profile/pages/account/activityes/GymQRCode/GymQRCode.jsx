import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';  

const GymQRCode = () => {
    const [qrValue, setQrValue] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('accessToken')
        ? JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])).id.toString()
        : null;
    

        if (userId) {
            setQrValue(`${window.location.origin}/#/toggle-gym?userId=${userId}`);
        }
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h3>Сканируйте для входа/выхода из зала</h3>
            {qrValue && <QRCodeCanvas value={qrValue} size={256} />}
        </div>
    );
};

export default GymQRCode;
