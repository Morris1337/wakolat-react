// models/index.js - Определение моделей для базы данных Sequelize
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const News = db.define('news', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    header: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false },
    champ: { type: DataTypes.BOOLEAN }, // ✅ добавлено!
    // pdf_name_1: { type: DataTypes.STRING },     // ✅ новый - название первого файла
    // pdf_name_2: { type: DataTypes.STRING }      // ✅ новый - название второго файла
    files: { type: DataTypes.TEXT }, // Сохраняем JSON-строку с именами файлов

}, {
    timestamps: false
});

const Competitions = db.define('Competition', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    header: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    image_second: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    date_start: { type: DataTypes.STRING, allowNull: false },
    date_end: { type: DataTypes.STRING, allowNull: false },
    date_registration: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false }
}, {
    timestamps: false
});

const Seminars = db.define('seminars', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    header: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    image_second: { type: DataTypes.STRING },        
    country: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    date_start: { type: DataTypes.STRING},
    date_end: { type: DataTypes.STRING},
    date_registration: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false }
}, {
    timestamps: false
});

// const Calendar = db.define('Calendar', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     header: { type: DataTypes.STRING, allowNull: false },
//     class_: { type: DataTypes.STRING, allowNull: false },
//     country: { type: DataTypes.STRING, allowNull: false },
//     date_start: { type: DataTypes.STRING, allowNull: false },
//     date_end: { type: DataTypes.STRING, allowNull: false },
//     address: { type: DataTypes.STRING, allowNull: false },
//     email: { type: DataTypes.STRING, allowNull: false },
//     home_page: { type: DataTypes.STRING },
//     phone_number: { type: DataTypes.STRING, allowNull: false },
//     promoter: { type: DataTypes.STRING, allowNull: false }
// });

const Users = db.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    is_superuser: { type: DataTypes.BOOLEAN}
}, {
    timestamps: false
});

const models = { News, Competitions, Seminars, Users };

module.exports = models;
