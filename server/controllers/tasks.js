const { Task, Category } = require("../models");

const getAllTasks = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const tasks = await Task.findAll({
      where: { categoryId },
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const createTask = async (req, res) => {
  const { categoryId, text } = req.body;
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Категория не найдена" });
    }
    const task = await Task.create({
      id: require("uuid").v4(),
      color: category.color,
      text,
      isCompleted: false,
      categoryId,
    });
    await category.increment("taskCount");
    res.status(201).json(task);
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

module.exports = { getAllTasks, createTask };
