// routes/newsRoutes.js - Роуты для новостей
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAllNews,getOneNews, createNews, updateNews, deleteNews,
    getNewsChamp } = require('../controllers/newsController');
    const newsController = require('../controllers/newsController');

router.get('/champ', getNewsChamp);
router.get('/', getAllNews);
router.get('/:id', getOneNews); // ✅ Новый маршрут

// Настройка хранилища файлов
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + file.originalname;
      cb(null, uniqueSuffix);
    },
  });
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      // ✅ Разрешить PDF и изображения
      const allowed = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (allowed.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });
  
  // ✅ Роут с поддержкой multipart/form-data
// ... и тогда используем напрямую:
router.post('/', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf_name_1', maxCount: 1 },
    { name: 'pdf_name_2', maxCount: 1 }
  ]), newsController.createNews);

// router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

module.exports = router;
