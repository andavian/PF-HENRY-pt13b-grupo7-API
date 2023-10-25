const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Profile",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      image: {
        type: DataTypes.STRING,
      },

      billingaddress: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      country: {
        type: DataTypes.TEXT,
      },
      locality: {
        type: DataTypes.STRING,
      },
      mobilenumber: {
        type: DataTypes.INTEGER,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
