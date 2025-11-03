// controllers/newsController.js — контроллер новостей
const { News } = require('../models');
const fs = require('fs');
const path = require('path');

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.findAll();
    res.json(news);
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getOneNews = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ error: 'Новость не найдена' });
    res.json(news);
  } catch (error) {
    console.error('Ошибка при получении одной новости:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getNewsChamp = async (req, res) => {
  try {
    const news = await News.findAll({
      where: { champ: true },
      order: [['date', 'DESC']]
    });
    res.json(news);
  } catch (error) {
    console.error('Ошибка при получении чемпионатов:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createNews = async (req, res) => {
  console.log('🔥 createNews вызван');
  console.log('FILES:', req.files);
  console.log('BODY:', req.body);

  try {
    const { header, text, date } = req.body;
    // champ может прийти как 'true'/'false' или булево
    const champ = String(req.body.champ ?? 'false').toLowerCase() === 'true';

    const imgFile = (req.files?.image || [])[0] || null;
    const fileList = req.files?.files || [];

    // ЯВНАЯ ВАЛИДАЦИЯ (до БД)
    if (!header || !text || !date || !imgFile) {
      // подчистим загруженные временные файлы, если надо
      // (в примере не удаляем, чтобы не потерять пользовательский аплоад)
      return res.status(400).json({
        error: 'Поля header, text, date и файл image — обязательны'
      });
    }

    // Переименуем доп.файлы в удобный формат: <Header_№>.<ext>
    const safeHeader = header.replace(/[^\p{L}\p{N}_-]+/gu, '_'); // юникод-безопасно
    let counter = 1;
    const renamedFiles = [];

    for (const f of fileList) {
      const ext = path.extname(f.originalname);
      const newName = `${safeHeader}_${counter}${ext}`;
      const oldPath = path.join('upload', f.filename);
      const newPath = path.join('upload', newName);

      try {
        fs.renameSync(oldPath, newPath);
        renamedFiles.push(newName);
      } catch (e) {
        console.error('Не удалось переименовать файл', f.filename, '->', newName, e);
        // оставляем как есть
        renamedFiles.push(f.filename);
      }
      counter++;
    }

    const payload = {
      header,
      text,
      date,               // убедись, что тип поля в модели подходит (DATE/STRING)
      champ,
      image: imgFile.filename,
      files: JSON.stringify(renamedFiles)
    };

    console.log('📦 Final values to create:', payload);

    const created = await News.create(payload);
    return res.json(created);
  } catch (error) {
    console.error('❌ Ошибка при создании новости:', error);
    return res.status(500).json({ error: 'Ошибка сервера', details: error.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });

    // не позволяем затереть обязат. поля пустыми значениями случайно
    const upd = { ...req.body };
    if (typeof upd.champ !== 'undefined') {
      upd.champ = String(upd.champ).toLowerCase() === 'true';
    }

    await news.update(upd);
    res.json(news);
  } catch (error) {
    console.error('Ошибка при обновлении новости:', error);
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
    console.error('Ошибка при удалении новости:', error);
    res.status(500).json({ error: error.message });
  }
};
