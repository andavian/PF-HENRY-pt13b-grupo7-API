const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      primaryimage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      offer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      offer_percentage: {
        type: DataTypes.DECIMAL,
        validate: {
          min: 0.05,
          max: 0.75,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },

      hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
