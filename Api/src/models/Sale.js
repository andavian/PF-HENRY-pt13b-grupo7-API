const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Sale",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },

      amount: {
        type: DataTypes.INTEGER,
      },
      order_address: {
        type: DataTypes.TEXT,
      },
      order_date: {
        type: DataTypes.DATEONLY,
      },
      order_status: {
        type: DataTypes.ENUM("approved", "pending", "delivered", "canceled"),
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
