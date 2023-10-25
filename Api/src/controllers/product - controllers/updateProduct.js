const { Product } = require("../../db");

const updateProduct = async (id, updatedAttributes) => {
  try {
    // Buscar el producto por ID
    const product = await Product.findByPk(id);

    if (!product) {
      throw Error("Producto no encontrado");
    }

    // Actualizar los atributos proporcionados en updatedAttributes
    if (updatedAttributes.title) {
      product.title = updatedAttributes.title;
    }

    if (updatedAttributes.price) {
      product.price = updatedAttributes.price;
    }

    if (updatedAttributes.description) {
      product.description = updatedAttributes.description;
    }

    if (updatedAttributes.primaryimage) {
      product.primaryimage = updatedAttributes.primaryimage;
    }

    if (updatedAttributes.stock) {
      product.stock = updatedAttributes.stock;
    }

    if (updatedAttributes.offer) {
      product.offer = updatedAttributes.offer;
    }

    if (updatedAttributes.offer_percentage) {
      product.offer_percentage = updatedAttributes.offer_percentage;
    }

    // Guardar los cambios en la base de datos
    await product.save();

    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = updateProduct;
