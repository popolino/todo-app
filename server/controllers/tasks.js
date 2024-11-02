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

const editTask = async (req, res) => {
  const { id } = req.params;
  const { text, isCompleted } = req.body;
  try {
    const [updatedCount] = await Task.update(
      { text, isCompleted },
      { where: { id } },
    );
    if (updatedCount > 0) {
      const task = await Task.findByPk(id);
      if (task) {
        const category = await Category.findByPk(task.categoryId);
        if (category) {
          if (isCompleted) {
            await category.increment("completedTaskCount");
          }
        }
      }
      res.status(200).json({ message: "Задача успешно обновлена" });
    } else {
      res.status(404).json({ error: "Задача не найдена" });
    }
  } catch (error) {
    console.error("Ошибка при обновлении задачи:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Задача не найдена" });
    }
    const category = await Category.findByPk(task.categoryId);
    if (category) {
      await category.decrement("taskCount");
    }
    await Task.destroy({ where: { id } });
    res.status(200).json({ message: "Задача успешно удалена" });
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const deleteTasksByIds = async (req, res) => {
  const { ids } = req.body;
  try {
    const deletedCount = await Task.destroy({
      where: {
        id: ids,
      },
    });
    if (deletedCount > 0) {
      const task = await Task.findOne({ where: { id: ids[0] } });
      if (task) {
        const category = await Category.findByPk(task.categoryId);
        if (category) {
          await category.decrement("taskCount", { by: deletedCount });
        }
      }
      res.status(200).json({ message: "Задачи успешно удалены" });
    } else {
      res.status(404).json({ error: "Задачи не найдены" });
    }
  } catch (error) {
    console.error("Ошибка при удалении задач:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  editTask,
  deleteTask,
  deleteTasksByIds,
};
