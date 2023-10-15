const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Por defecto, un registro se considera un carrito
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
