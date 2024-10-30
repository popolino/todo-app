const { Category, User } = require("../models");
const { v4: uuidv4 } = require("uuid"); // Подключаем библиотеку UUID для генерации уникальных идентификаторов

const getAllCategories = async (req, res) => {
  const { userId } = req.query; // Ожидаем `userId` вместо `email`
  try {
    const categoriesMember = await Category.findAll({
      include: [
        {
          model: User,
          as: "members",
          ...(userId ? { where: { id: userId } } : {}), // Условие поиска по `id` пользователя
        },
      ],
    });
    const categoriesCreator = await Category.findAll({
      where: userId ? { creatorId: userId } : {},
    });
    const categories = [
      ...categoriesMember,
      ...categoriesCreator.filter(
        (creatorCategory) =>
          !categoriesMember.some(
            (memberCategory) => memberCategory.id === creatorCategory.id,
          ),
      ),
    ];
    res.status(200).json(categories);
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const createCategory = async (req, res) => {
  const { name, color, memberIds } = req.body;
  const creatorId = req.user.id;
  try {
    const category = await Category.create({
      id: uuidv4(),
      creatorId,
      name,
      color,
    });
    if (Array.isArray(memberIds) && memberIds.length > 0) {
      const members = await User.findAll({
        where: { id: memberIds },
      });
      await category.addMembers(members);
    } else {
      category.members = [];
    }

    res.status(201).json(category);
  } catch (error) {
    console.error("Ошибка при создании категории:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

module.exports = { getAllCategories, createCategory };
