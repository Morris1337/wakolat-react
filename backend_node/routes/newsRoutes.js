// routes/newsRoutes.js — роуты для новостей
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
  getAllNews,
  getOneNews,
  createNews,
  updateNews,
  deleteNews,
  getNewsChamp
} = require('../controllers/newsController');

// список
router.get('/champ', getNewsChamp);
router.get('/', getAllNews);
router.get('/:id', getOneNews);

// --- Хранилище для файлов ---
const uploadRoot = path.join(process.cwd(), 'upload');
fs.mkdirSync(uploadRoot, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadRoot),
  filename: (req, file, cb) => {
    // безопасное имя
    const safe = path.basename(file.originalname).replace(/\s+/g, '_');
    cb(null, `${Date.now()}-${safe}`);
  }
});

// допустимые типы
const allowed = new Set([
  'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
  'application/pdf', 'application/zip',
  'application/x-rar-compressed', 'application/x-7z-compressed'
]);

const upload = multer({
  storage,
  limits: { fileSize: 256 * 1024 * 1024 }, // до 256 МБ
  fileFilter: (req, file, cb) => cb(null, allowed.has(file.mimetype))
});

// --- ожидаем строго именованные поля ---
// image: 1 файл (обязательный), files: массив (необязательно)
router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'files', maxCount: 20 }
  ]),
  createNews
);

router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

module.exports = router;
