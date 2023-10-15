//Acá van los controladores de Ordenes de compra
const { Order } = require("../../db");

const getOrders = async () => {
  const allOrders = await Order.findAll();
  return allOrders;
};

module.exports = { getOrders };
