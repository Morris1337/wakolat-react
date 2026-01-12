// controllers/competitionsController.js - Контроллер для соревнований
const { Competitions } = require('../models');
const { Op } = require('sequelize'); // <-- добавили

exports.getAllCompetitions = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0,0,0,0);

    const upcoming = await Competitions.findAll({
      where: { date_start: { [Op.gte]: today } },
      order: [["date_start", "ASC"]],
      limit: 4
    });

    if (upcoming.length === 4) return res.json(upcoming);

    const need = 4 - upcoming.length;
    const recentPast = await Competitions.findAll({
      where: { date_start: { [Op.lt]: today } },
      order: [["date_start", "DESC"]],
      limit: need
    });

    res.json([...upcoming, ...recentPast]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

// controllers/competitionsController.js
exports.createCompetition = async (req, res) => {

  console.log('CT:', req.headers['content-type']);
  console.log('body keys:', Object.keys(req.body || {}));
  console.log('files keys:', req.files && Object.keys(req.files));

  try {
    const {
      header, title,
     country, city,
     email, contact_email,
     phone_number, contact_phone,
     date_start, start_time,
     date_end, end_time,
     date_registration, registration_deadline,
     price,
     text, description,
    } = req.body;

    // файлы из multer: поля должны называться ровно 'image' и 'image_second'
    const image = req.files?.image?.[0]?.filename ?? null;
    const image_second = req.files?.image_second?.[0]?.filename ?? null;

    // payload строго из 12 колонок, без undefined
    const payload = {
      header: (title ?? header) ?? null,
      image,                                 // 2
      image_second,                          // 3
      country: country ?? null,              // 4
      city: city ? String(city).trim() : null, // 5
      email: (contact_email ?? email) ?? null,
      phone_number: (contact_phone ?? phone_number) ?? null,
      date_start: (start_time ?? date_start) ?? null,
      date_end: (end_time ?? date_end) ?? null,
      date_registration: (registration_deadline ?? date_registration) ?? null,
      price: price != null ? Number(price) : null,  // 11 (число)
      text: (description ?? text) ?? null,                   // 12
    };

    // фиксируем порядок и полный список колонок (12 штук)
    const competition = await Competitions.create(payload, {
      fields: [
        "header",
        "image",
        "image_second",
        "country",
        "city",
        "email",
        "phone_number",
        "date_start",
        "date_end",
        "date_registration",
        "price",
        "text",
      ],
      returning: true,
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
         // возвращаем оба набора ключей
        res.json({
          ...c.toJSON(),
          title: c.header,
          description: c.text,
          start_time: c.date_start,
          end_time: c.date_end,
          registration_deadline: c.date_registration,
          image_url: c.image ? `/upload/${c.image}` : null,
          image_second_url: c.image_second ? `/upload/${c.image_second}` : null,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
