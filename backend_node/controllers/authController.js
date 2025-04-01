const bcrypt = require('bcrypt');
const { Users } = require('../models'); // ✅ фикс

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Заполните все поля' });
    }
  
    const user = await Users.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Пользователь не найден' });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Неверный пароль' });
    }
  
    res.json({ message: "Добро пожаловать", username: user.username });
  };
  
