// controllers/competitionsController.js - Контроллер для соревнований
const { Competitions } = require('../models');

exports.getAllCompetitions = async (req, res) => {
    try {
        const competitions = await Competitions.findAll();
        res.json(competitions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCompetition = async (req, res) => {
    try {
      const { header, country, city, email, phone_number, date_start, date_end, date_registration, price, text } = req.body;
      
      const image = req.files['image']?.[0]?.filename || null;
      const image_second = req.files['image_second']?.[0]?.filename || null;
  
      const competition = await Competitions.create({
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
        image,
        image_second
      });
  
      res.status(201).json(competition);
    } catch (error) {
      console.error("❌ Ошибка при создании соревнования:", error);
      res.status(500).json({ error: "Ошибка при создании соревнования" });
    }
  };

exports.updateCompetition = async (req, res) => {
    try {
        const competition = await Competitions.findByPk(req.params.id);
        if (!competition) return res.status(404).json({ message: 'Competition not found' });
        await competition.update(req.body);
        res.json(competition);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCompetition = async (req, res) => {
    try {
        const competition = await Competitions.findByPk(req.params.id);
        if (!competition) return res.status(404).json({ message: 'Competition not found' });
        await competition.destroy();
        res.json({ message: 'Competition deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOneCompetition = async (req, res) => {
    try {
        const competition = await Competitions.findByPk(req.params.id);
        if (!competition) return res.status(404).json({ message: 'Competition not found' });
        res.json(competition);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
