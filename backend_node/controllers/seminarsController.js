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
        text
      } = req.body;
  
      const image = req.file ? req.file.filename : null;
  
      if (!image) {
        return res.status(400).json({ error: "Файл изображения обязателен" });
      }
  
      const seminar = await Seminars.create({
        header,
        image,
        country,
        city,
        email,
        phone_number,
        date_start,
        date_end,
        date_registration,
        price,
        text
      });
  
      res.status(201).json(seminar);
    } catch (err) {
      console.error('❌ Ошибка при создании семинара:', err);
      res.status(500).json({ error: 'Ошибка сервера', details: err });
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
