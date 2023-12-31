// conexion a la base de datos
require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { DB_EXTERNAL } = process.env;

const sequelize = new Sequelize(
  DB_EXTERNAL,
  // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}?ssl=true`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialectOptions: {
      ssl: { require: true },
    },
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
const { Admin, Cart, Category, Order, Product, Profile, Review, User } =
  sequelize.models;

// Aca vendrian las relaciones

//?-----Relaciones Categoría/Producto-----//
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

//?-----Relaciones de Carrito-----//
//Relacion Usuario con Carrito
User.hasOne(Cart);
Cart.belongsTo(User);

//Relacion entre Producto y Carrito
Cart.belongsToMany(Product, { through: "CartProduct" });
Product.belongsToMany(Cart, { through: "CartProduct" });

//Relacion entre Orden de compra y Carrito
Order.belongsTo(Cart);
Cart.hasOne(Order);

//?-----Relaciones de Review-----//
//Review con User
User.hasMany(Review, { foreingnKey: "userId" });
Review.belongsTo(User, { foreingnKey: "userId" });

//review con poducto
Product.hasMany(Review, { foreingnKey: "productId" });
Review.belongsTo(Product, { foreingnKey: "productId" });

//?-----Relaciones de Perfil-----//
//Perfil con Usuario
User.hasOne(Profile);
Profile.belongsTo(User);

//Profile con Admin
Admin.hasOne(Profile);
Profile.belongsTo(Admin);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
}; // conexion a la base de datos
