//aqui van las rutas get/post/put/delete correspondientes
const { Router } = require("express");
const {
  addProductToCart,
} = require("../controllers/carts-controllers/cartControllers");

const cartsRoutes = Router();

cartsRoutes.post("/add-product", addProductToCart);

//cartsRoutes.get("/capture-order", captureOrder);

//cartsRoutes.get("/cancel-order", cancelOrder);

module.exports = cartsRoutes;
