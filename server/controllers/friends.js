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
    const existingRelation = await Relations.findOne({
      where: {
        userId: currentUserId,
        friendId: friend.id,
        status: ["friends", "outgoing"],
      },
    });

    if (existingRelation) {
      return res.status(400).json({
        error:
          "Запрос на дружбу уже отправлен или этот пользователь уже ваш друг",
      });
    }
    await Relations.create({
      userId: currentUserId,
      friendId: friend.id,
      status: "outgoing",
    });
    await Relations.create({
      userId: friend.id,
      friendId: currentUserId,
      status: "pending",
    });

    res.status(200).json(friend);
  } catch (error) {
    console.error("Ошибка при отправке запроса на дружбу:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const acceptFriend = async (req, res) => {
  const { email } = req.params;
  const currentUserId = req.user.id;
  try {
    const friend = await User.findOne({ where: { email } });
    if (!friend) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    const outgoingRequest = await Relations.findOne({
      where: {
        userId: friend.id,
        friendId: currentUserId,
        status: "outgoing",
      },
    });
    if (!outgoingRequest) {
      return res.status(400).json({ error: "Заявка на дружбу не найдена" });
    }
    await outgoingRequest.update({ status: "friends" });
    const pendingRequest = await Relations.findOne({
      where: {
        userId: currentUserId,
        friendId: friend.id,
        status: "pending",
      },
    });
    if (pendingRequest) {
      await pendingRequest.update({ status: "friends" });
    }
    res.status(200).json(friend);
  } catch (error) {
    console.error("Ошибка при принятии заявки на дружбу:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const deleteFriend = async (req, res) => {
  const { email } = req.params;
  const currentUserId = req.user.id;
  try {
    const friend = await User.findOne({ where: { email } });
    if (!friend) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    const userRelation = await Relations.findOne({
      where: {
        userId: currentUserId,
        friendId: friend.id,
        status: "friends",
      },
    });
    const friendRelation = await Relations.findOne({
      where: {
        userId: friend.id,
        friendId: currentUserId,
        status: "friends",
      },
    });
    if (!userRelation || !friendRelation) {
      return res
        .status(400)
        .json({ error: "Вы не являетесь друзьями с этим пользователем" });
    }
    // await userRelation.destroy();

    await userRelation.update({ status: "pending" });
    await friendRelation.update({ status: "outgoing" });
    res.status(200).json(friend);
  } catch (error) {
    console.error("Ошибка при удалении друга:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const cancelFriend = async (req, res) => {
  const { email } = req.params;
  const currentUserId = req.user.id;
  try {
    const friend = await User.findOne({ where: { email } });
    if (!friend) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    const outgoingRequest = await Relations.findOne({
      where: {
        userId: currentUserId,
        friendId: friend.id,
        status: "outgoing",
      },
    });
    const pendingRequest = await Relations.findOne({
      where: {
        userId: friend.id,
        friendId: currentUserId,
        status: "pending",
      },
    });
    if (!outgoingRequest || !pendingRequest) {
      return res.status(400).json({ error: "Заявка на дружбу не найдена" });
    }
    await outgoingRequest.destroy();
    await pendingRequest.destroy();
    res.status(200).json({ message: "Заявка на дружбу успешно отменена" });
  } catch (error) {
    console.error("Ошибка при отмене заявки на дружбу:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const cancelInRequest = async (req, res) => {
  const { email } = req.params;
  const currentUserId = req.user.id;
  try {
    const friend = await User.findOne({ where: { email } });
    if (!friend) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    const pendingRequest = await Relations.findOne({
      where: {
        userId: currentUserId,
        friendId: friend.id,
        status: "pending",
      },
    });
    if (!pendingRequest) {
      return res
        .status(400)
        .json({ error: "Входящая заявка на дружбу не найдена" });
    }
    await pendingRequest.destroy();
    res.status(200).json(friend);
  } catch (error) {
    console.error("Ошибка при отмене входящей заявки на дружбу:", error);
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

module.exports = {
  sendFriendRequest,
  fetchRelationsAsync,
  acceptFriend,
  deleteFriend,
  cancelFriend,
  cancelInRequest,
};
