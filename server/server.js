const express = require("express");
const { Sequelize, DataTypes, Model } = require("sequelize");
const cors = require("cors");
const axios = require("axios");
const config = require("./config/config.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getUsers,
  registration,
  login,
  authMe,
  logout,
  authenticateToken,
} = require("./controllers/user");

const {
  getAllCategories,
  createCategory,
} = require("./controllers/categories");

const { getAllTasks, createTask } = require("./controllers/tasks");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  },
);

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

const PORT = process.env.PORT || 3002;

class User extends Model {}
User.init(
  {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "User" },
);

app.get("/users", getUsers);
app.post("/registration", registration);
app.post("/login", login);
app.get("/authMe", authenticateToken, authMe);
app.delete("/logout", logout);

app.get("/categories/", getAllCategories);
app.post("/categories", authenticateToken, createCategory);

app.get("/categories/:categoryId/tasks", getAllTasks);
app.post("/tasks", createTask);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Подключение к базе данных успешно установлено.");
    await sequelize.sync();
    console.log(`Сервер запущен на порту ${PORT}`);
  } catch (error) {
    console.error("Не удалось подключиться к базе данных:", error);
  }
});
