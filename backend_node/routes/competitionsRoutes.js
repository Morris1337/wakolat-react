// routes/competitionsRoutes.js - Роуты для соревнований
const express = require('express');
const multer = require('multer'); // ✅ обязательно
const router = express.Router();
const { getAllCompetitions, createCompetition, updateCompetition, deleteCompetition, getOneCompetition } = require('../controllers/competitionsController');
const competitionsController = require('../controllers/competitionsController');

router.get('/', getAllCompetitions);
// router.post('/', createCompetition);
// router.get('/:id', getOneCompetition);
// Настройка хранилища
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage: storage });
  
  router.post(
    '/',
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'image_second', maxCount: 1 }
    ]),
    competitionsController.createCompetition
  );
  
router.put('/:id', updateCompetition);
router.delete('/:id', deleteCompetition);
router.get('/:id', getOneCompetition);

// router.post('/get_one_competition', getOneCompetition);


module.exports = router;