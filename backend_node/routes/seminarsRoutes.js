// routes/seminarsRoutes.js - Роуты для семинаров
const express = require('express');
const multer = require('multer'); // ✅ обязательно
const upload = multer({ dest: 'upload/' });
const router = express.Router();
const { getAllSeminars, createSeminar,getOneSeminar, updateSeminar, deleteSeminar } = require('../controllers/seminarsController');
const seminarsController = require('../controllers/seminarsController'); // 👈 обязательно это должно быть в начале

router.get('/', getAllSeminars);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, uniqueSuffix);
    }
  });
//   const upload = multer({ storage: storage });
  
  router.post('/', upload.single('image'), seminarsController.createSeminar);

router.get('/:id', getOneSeminar);
router.put('/:id', updateSeminar);
router.delete('/:id', deleteSeminar);

module.exports = router;