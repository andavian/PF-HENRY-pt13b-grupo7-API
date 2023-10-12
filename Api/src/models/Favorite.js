const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Favorite', {
    idFav: {
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
    idClient:{
        type : DataTypes.STRING,
        allowNull: false,
    },
    idProduct:{
        type : DataTypes.STRING,
        allowNull: false,
    },
},{freezeTableName: true,timestamps:false})}