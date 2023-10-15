//aquí irán las rutas generales, con route.use

const { Router } = require("express");

//Index Routes
const categoriesRoutes = require("./routes-categories");
const clientsRoutes = require("./routes-clients");
const favoritesRoutes = require("./routes-favorites");
const cartsRoutes = require("./routes-carts.js");
const productsRoutes = require("./routes-product.js");
const salesRoutes = require("./routes-sales");
const paymentRoutes = require("./routes-payment");

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/clients", clientsRoutes);
router.use("/favorites", favoritesRoutes);
router.use("/carts", cartsRoutes);
router.use("/products", productsRoutes);
//router.use("/sales", salesRoutes);
router.use("/payment", paymentRoutes);

module.exports = router;
