const { Product } = require("../db");

const productId = async (producName) => {
  try {
    const productNameLowerCase = producName.toLowerCase();
    const product = await Product.findOne({
      where: {
        name: productNameLowerCase,
      },
    });

    if (product) {
      return product.id;
    } else {
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    throw new Error("Error al buscar el producto: " + error.message);
  }
};

module.exports = productId;