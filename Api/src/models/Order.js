const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },

      amount: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM(
          "CREATED",
          "SAVED",
          "APPROVED",
          "VOIDED",
          "COMPLETED",
          "PAYER_ACTION_REQUIRED"
        ),
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
