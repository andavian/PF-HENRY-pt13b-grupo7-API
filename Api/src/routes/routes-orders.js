//aqui van las rutas get/post/put/delete correspondientes
const { Router } = require("express");
const ordersRutes = Router();

const {
  getOrders,
} = require("../controllers/orders-controllers/orderControllers");
const getOrdersCompletes = require("../controllers/orders-controllers/getOrdersCompletes");

// ordersRutes.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const productById = await getOrdersById(id);
//     res.status(200).json(productById);
//   } catch (error) {
//     res.status(400).json({ error: `No existe producto con el id: ${id}` });
//   }
// });

ordersRutes.get("/", async (req, res) => {
  try {
    const allOrders = await getOrders();
    return res.status(200).json(allOrders);
  } catch (error) {
    res.status(400).json({ message: "No hay ordenes para mostrar" });
  }
});

ordersRutes.get("/orders-completes", getOrdersCompletes);

module.exports = ordersRutes;
