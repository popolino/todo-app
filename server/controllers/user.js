const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Ошибка при получении пользователей:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const registration = async (req, res) => {
  const { email, name, surname, password } = req.body;
  try {
    if (!email || !name || !surname || !password) {
      return res.status(400).json({ error: "Все поля обязательны" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      name,
      surname,
      password: hashedPassword,
    });
    const token = generateToken(newUser);
    console.log("toooooooooken: ", token);
    res.status(201).json({
      message: "Пользователь успешно создан",
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.error("Ошибка при создании пользователя:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Все поля обязательны" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Неверный пароль" });
    }
    const token = generateToken(user);
    res.status(200).json({ message: "Успешный вход", user, token });
  } catch (error) {
    console.error("Ошибка при входе:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Предполагаем, что токен передается в формате 'Bearer <token>'
  if (!token) {
    return res
      .status(401)
      .json({ error: "Нет доступа, требуется авторизация" });
  }
  jwt.verify(token, "your_jwt_secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Недействительный токен" });
    }
    req.user = user;
    next();
  });
};

const generateToken = (user) => {
  console.log("Генерация токена для пользователя:", user); // Отладочный вывод
  return jwt.sign(
    { id: user.id, email: user.email }, // Данные пользователя для токена
    "your_jwt_secret_key",
    { expiresIn: "1h" },
  );
};

const authMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "email", "name", "surname", "picture", "status"],
    });
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Ошибка при проверке авторизации:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: "Пользователь успешно вышел" });
};

module.exports = {
  getUsers,
  registration,
  login,
  authMe,
  logout,
  authenticateToken,
};
