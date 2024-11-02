module.exports = (sequelize, DataTypes) => {
  const Relations = sequelize.define("Relations", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    friendId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "outgoing", "friends"),
      defaultValue: "pending",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  Relations.associate = function (models) {
    Relations.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    Relations.belongsTo(models.User, {
      foreignKey: "friendId",
      as: "friend",
    });
  };

  return Relations;
};
