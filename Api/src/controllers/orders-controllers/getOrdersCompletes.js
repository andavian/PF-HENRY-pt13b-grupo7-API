const { Order, Cart, Product, User } = require("../../db");

// Controlador para obtener el carrito comprado de un usuario cuando la orden está completada
async function getOrdersCompletes(req, res) {
  try {
    const userId = User.id;

    // Busca la orden de compra con estado "completed" asociada al usuario
    const order = await Order.findOne({
      where: {
        UserId: userId,
        status: "COMPLETED",
      },
    });

    if (!order) {
      return res.status(404).json({
        message: "No se encontró una orden completada para este usuario",
      });
    }

    // Busca el carrito asociado a la orden
    const cart = await Cart.findOne({
      where: {
        OrderId: order.id,
      },
      include: [
        {
          model: Product,
          as: "CartProduct", // El nombre de la relación entre Cart y Product
        },
      ],
    });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "No se encontró un carrito asociado a esta orden" });
    }

    // Respuesta con el carrito y los productos
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el carrito comprado" });
  }
}

module.exports = getOrdersCompletes;
