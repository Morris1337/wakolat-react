// controllers/newsController.js - Контроллер для новостей
const { News } = require('../models');

exports.getAllNews = async (req, res) => {
    try {
        const news = await News.findAll();
        res.json(news);
    } catch (error) {
        console.error("Ошибка при получении новостей:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.createNews = async (req, res) => {
    console.log("🔥 createNews вызван");
    console.log("FILES:", req.files);   // <= покажет image, pdf_name_1, pdf_name_2
    console.log("BODY:", req.body);     // <= покажет header, text, champ...
  
    try {
      const {
        header, text, date, champ
      } = req.body;
  
      const image = req.files?.image?.[0]?.filename || null;
      const pdf_name_1 = req.files?.pdf_name_1?.[0]?.filename || null;
      const pdf_name_2 = req.files?.pdf_name_2?.[0]?.filename || null;
  
      console.log("📦 Final values to create:", { header, text, date, champ, image, pdf_name_1, pdf_name_2 });
  
      const news = await News.create({
        header, text, date, champ,
        image, pdf_name_1, pdf_name_2,
      });
  
      res.json(news);
    } catch (error) {
      console.error("❌ Ошибка при создании новости:", error);
      res.status(500).json({ error: "Ошибка сервера", details: error.message });
    }
  };
  
  

exports.updateNews = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });
        await news.update(req.body);
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });
        await news.destroy();
        res.json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOneNews = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ error: 'Новость не найдена' });
        }
        res.json(news);
    } catch (error) {
        console.error("Ошибка при получении одной новости:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getNewsChamp = async (req, res) => {
    try {
      const news = await News.findAll({
        where: { champ: true },
        order: [['date', 'DESC']],
      });
      res.json(news);
    } catch (error) {
      console.error("Ошибка при получении чемпионатов:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getNewsById = async (req, res) => {
    try {
      const news = await News.findByPk(req.params.id);
      if (!news) return res.status(404).json({ message: 'News not found' });
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  