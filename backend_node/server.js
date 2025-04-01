// server.js - Главный сервер Express
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const db = require('./config/db');
const path = require("path");

app.use(cors({
    origin: "*", // Разрешить доступ с любого домена (можно указать конкретный)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json()); // ✅ обязательно
app.use(express.urlencoded({ extended: true })); // ✅ нужно для form-data, если вдруг используется


app.use("/upload", express.static(path.join(__dirname, "upload")));

const newsRoutes = require('./routes/newsRoutes');
const competitionsRoutes = require('./routes/competitionsRoutes');
const seminarsRoutes = require('./routes/seminarsRoutes');
// const calendarRoutes = require('./routes/calendarRoutes');
const usersRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');

// Роуты API
app.use('/api/news', newsRoutes);
app.use('/api/competitions', competitionsRoutes);
app.use('/api/seminars', seminarsRoutes);
// app.use('/api/calendar', calendarRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8020;

db.sync()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Database connection error:', err));