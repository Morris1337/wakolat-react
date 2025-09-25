// controllers/newsController.js - Контроллер для новостей
const { News } = require('../models');
const fs = require('fs');
const path = require('path');

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
  console.log("FILES:", req.files);
  console.log("BODY:", req.body);

  try {
      const { header, text, date, champ } = req.body;

      const imageFile = req.files.find(f => f.fieldname === 'image');
      const image = imageFile ? imageFile.filename : null;

      let counter = 1;
      const renamedFiles = [];

      for (const file of req.files) {
          if (file.fieldname === 'image') continue;

          const ext = path.extname(file.originalname);
          const newName = `${header.replace(/\s+/g, '_')}_${counter}${ext}`;  // Latvia_Open_2025_1.pdf

          const oldPath = path.join('upload', file.filename);
          const newPath = path.join('upload', newName);

          fs.renameSync(oldPath, newPath);
          renamedFiles.push(newName);

          counter++;
      }

      console.log("📦 Final values to create:", { header, text, date, champ, image, renamedFiles });

      const news = await News.create({
          header, text, date, champ,
          image,
          files: JSON.stringify(renamedFiles),
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
  