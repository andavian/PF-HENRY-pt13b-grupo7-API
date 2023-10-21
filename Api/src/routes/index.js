//aquí irán las rutas generales, con route.use

const { Router } = require("express");

//Index Routes
const categoriesRoutes = require("./routes-categories");
const usersRoutes = require("./routes-users");
const favoritesRoutes = require("./routes-favorites");
const cartsRoutes = require("./routes-carts.js");
const productsRoutes = require("./routes-product.js");
const ordersRoutes = require("./routes-orders");
const paymentRoutes = require("./routes-payment");
<<<<<<< HEAD
const reviewsRoutes = require("./routes-reviews");
=======
//Ruta para Nodemailer
const mailerRoutes= require("./routeMail");
>>>>>>> dev

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/users", usersRoutes);
router.use("/favorites", favoritesRoutes);
router.use("/carts", cartsRoutes);
router.use("/products", productsRoutes);
router.use("/orders", ordersRoutes);
router.use("/payment", paymentRoutes);
<<<<<<< HEAD
router.use("/reviews", reviewsRoutes);
=======
//Ruta para Nodemailer
router.use("/mail", mailerRoutes);
>>>>>>> dev

module.exports = router;
