const { Router } = require("express");
const {
  createOrder,
  cancelOrder,
  captureOrder,
} = require("../controllers/payments-controllers/paymentControllers");

const paymentRoutes = Router();

/**
 * @swagger
 * /payments/create-order:
 *   post:
 *     summary: Crea una nueva orden de pago.
 *     responses:
 *       200:
 *         description: Orden de pago creada con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
paymentRoutes.post("/create-order", createOrder);

/**
 * @swagger
 * /payments/capture-order:
 *   get:
 *     summary: Captura una orden de pago.
 *     responses:
 *       200:
 *         description: Orden de pago capturada con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
paymentRoutes.get("/capture-order", captureOrder);

/**
 * @swagger
 * /payments/cancel-order:
 *   get:
 *     summary: Cancela una orden de pago.
 *     responses:
 *       200:
 *         description: Orden de pago cancelada con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
paymentRoutes.get("/cancel-order", cancelOrder);

module.exports = paymentRoutes;
