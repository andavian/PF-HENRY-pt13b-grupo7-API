const { Product, Category } = require("../../db");

/**
 * Obtiene todos los productos que no están ocultos.
 *
 * @function
 * @async
 * @throws {Error} Si hay un error interno en el servidor.
 * @returns {Promise<Array>} Un arreglo de todos los productos no ocultos.
 */
const getProducts = async () => {
  try {
    const allProducts = await Product.findAll({
      where: {
        hidden: false,
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });

    return allProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getProducts;
