const { Users } = require('../models');
const bcrypt = require('bcrypt');

// Получить всех пользователей
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении пользователей' });
  }
};

// Создать пользователя
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await Users.create({ username, email, password: hash });
    res.status(201).json({ id: user.id, username: user.username, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании пользователя' });
  }
};

// Обновить пользователя
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    const hash = password ? await bcrypt.hash(password, 10) : user.password;
    await user.update({ username, email, password: hash });

    res.json({ message: 'Пользователь обновлен' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении' });
  }
};

// Удалить пользователя
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    await user.destroy();
    res.json({ message: 'Пользователь удален' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
