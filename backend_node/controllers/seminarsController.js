// controllers/seminarsController.js - Контроллер для семинаров
const { Seminars } = require('../models');

exports.getAllSeminars = async (req, res) => {
    try {
        const seminars = await Seminars.findAll(); // ✅ это ключевое
        res.json(seminars);
    } catch (error) {
        console.error("Ошибка при получении семинаров:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.createSeminar = async (req, res) => {
  try {
    // тело запроса
    const {
      header,
      country,
      city,
      email,
      phone_number,
      date_start,
      date_end,
      date_registration,
      price,
      text,
    } = req.body;

    // файлы от multer.fields
    const files = req.files || {};

    const imageFile       = files.image && files.image[0] ? files.image[0] : null;
    const imageSecondFile = files.image_second && files.image_second[0] ? files.image_second[0] : null;

    const newSeminar = await Seminars.create({
      header,
      country,
      city,
      email,
      phone_number,
      date_start,
      date_end,
      date_registration,
      price,
      text,
      image: imageFile ? imageFile.filename : null,
      image_second: imageSecondFile ? imageSecondFile.filename : null,
    });

    return res.status(201).json(newSeminar);
  } catch (err) {
    console.error('❌ Ошибка при создании семинара:', err);
    return res.status(500).json({ message: 'Ошибка при создании семинара' });
  }
};

exports.updateSeminar = async (req, res) => {
    try {
        const seminar = await Seminars.findByPk(req.params.id);
        if (!seminar) return res.status(404).json({ message: 'Seminar not found' });
        await seminar.update(req.body);
        res.json(seminar);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSeminar = async (req, res) => {
    try {
        const seminar = await Seminars.findByPk(req.params.id);
        if (!seminar) return res.status(404).json({ message: 'Seminar not found' });
        await seminar.destroy();
        res.json({ message: 'Seminar deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOneSeminar = async (req, res) => {
    try {
        const seminar = await Seminars.findByPk(req.params.id);
        if (!seminar) return res.status(404).json({ message: 'Seminar not found' });
        res.json(seminar);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
