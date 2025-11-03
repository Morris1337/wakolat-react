// server.js — главный сервер Express
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./config/db');

const app = express();

// --- CORS: разрешаем только твой фронт ---
const ALLOWED_ORIGINS = ['https://wakolat.lv', 'https://www.wakolat.lv', 'http://localhost:3000'];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);                 // curl/healthchecks
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// --- body parsers ---
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// статические файлы
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// роуты
const newsRoutes         = require('./routes/newsRoutes');
const competitionsRoutes = require('./routes/competitionsRoutes');
const seminarsRoutes     = require('./routes/seminarsRoutes');
const usersRoutes        = require('./routes/usersRoutes');
const authRoutes         = require('./routes/authRoutes');

app.use('/api/news',         newsRoutes);
app.use('/api/competitions', competitionsRoutes);
app.use('/api/seminars',     seminarsRoutes);
app.use('/api/users',        usersRoutes);
app.use('/api/auth',         authRoutes);

// health
app.get('/health', (req, res) => res.json({ ok: true }));

// обработчик ошибок (в т.ч. CORS)
app.use((err, req, res, next) => {
  if (err && /CORS/i.test(err.message)) {
    return res.status(403).json({ error: 'CORS blocked' });
  }
  if (err && err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Payload too large' });
  }
  return next(err);
});

const PORT = process.env.PORT || 8020;
db.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
