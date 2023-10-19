const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  });
};
