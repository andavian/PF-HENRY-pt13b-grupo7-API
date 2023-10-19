const { Product, Category } = require("../../db");

/**
 * Obtiene un producto por su ID, incluyendo información de su categoría.
 *
 * @function
 * @async
 * @param {number} id - El ID del producto a buscar.
 * @throws {Error} Si hay un error interno en el servidor.
 * @returns {Promise<Object|null>} El producto encontrado o `null` si no se encuentra.
 */
const getProductsById = async (id) => {
  try {
    const product = await Product.findOne({
      where: { id },
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });

    // Devolver `null` si el producto no se encuentra
    if (!product) {
      return null;
    }

    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getProductsById;
