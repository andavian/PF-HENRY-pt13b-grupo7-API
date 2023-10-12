//aqui van las rutas get/post/put/delete correspondientes
const { Router } = require("express");
const {
  createOrder,
  cancelOrder,
  captureOrder,
} = require("../controllers/payments-controllers/paymentControllers");

const paymentRoutes = Router();

paymentRoutes.post("/create-order", createOrder);

paymentRoutes.get("/capture-order", captureOrder);

paymentRoutes.get("/cancel-order", cancelOrder);

module.exports = paymentRoutes;
