//Aca van los controladores de carrito
const { Cart, Product } = require("../../db");

// Agregar un producto al carrito
const addProductToCart = async (req, res) => {
  try {
    const userId = req.user.id; // Supongamos que usas autenticación de usuario y tienes el usuario actual en req.user
    const productId = req.body.productoId;
    const quantity = req.body.quantity;

    // Verifica si el usuario ya tiene un carrito activo
    let cart = await Cart.findOne({ where: { ClientId: userId } });

    if (!cart) {
      // Si no tiene un carrito activo, verifica si hay un carrito de usuario invitado
      if (req.session.cart) {
        cart = await Cart.create({ ClientId: userId });
        await cart.addProduct(req.session.cart.productId, {
          through: { quantity: req.session.carrito.quantity },
        });

        // Elimina el carrito de usuario invitado
        delete req.session.cart;
      } else {
        // Si no hay carrito de usuario invitado, crea un carrito vacío
        cart = await Cart.create({ ClientId: userId });
      }
    }

    // Agrega el producto al carrito
    await cart.addProduct(productId, { through: { quantity: quantity } });

    res.status(201).json({ message: "Producto agregado al carrito con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el producto al carrito" });
  }
};

module.exports = {
  addProductToCart,
};
