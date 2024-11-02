const { User, Relations } = require("../models");

const sendFriendRequest = async (req, res) => {
  const { email } = req.params;
  const currentUserId = req.user.id;

  try {
    const friend = await User.findOne({ where: { email } });
    if (!friend) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    if (friend.id === currentUserId) {
      return res.status(400).json({ error: "Нельзя добавить себя в друзья" });
    }
    await Relations.create({
      userId: currentUserId,
      friendId: friend.id,
      status: "pending",
    });
    await Relations.create({
      userId: friend.id,
      friendId: currentUserId,
      status: "outgoing",
    });
    res.status(200).json({ message: "Запрос на дружбу отправлен" });
  } catch (error) {
    console.error("Ошибка при отправке запроса на дружбу:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const fetchRelationsAsync = async (req, res) => {
  const currentUserId = req.user.id;
  try {
    const relations = await Relations.findAll({
      where: { userId: currentUserId },
      include: [
        {
          model: User,
          as: "friend",
          attributes: ["id", "name", "surname", "email", "picture", "status"],
        },
      ],
    });
    const friends = [];
    const pending = [];
    const outgoing = [];

    relations.forEach((relation) => {
      const friendData = {
        id: relation.friend.id,
        name: relation.friend.name,
        surname: relation.friend.surname,
        email: relation.friend.email,
        picture: relation.friend.picture,
        status: relation.status,
      };
      if (relation.status === "friends") {
        friends.push(friendData);
      } else if (relation.status === "pending") {
        pending.push(friendData);
      } else if (relation.status === "outgoing") {
        outgoing.push(friendData);
      }
    });
    res.status(200).json({
      id: currentUserId,
      userId: currentUserId,
      friends,
      pending,
      outgoing,
    });
  } catch (error) {
    console.error("Ошибка при получении отношений:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

module.exports = { sendFriendRequest, fetchRelationsAsync };
