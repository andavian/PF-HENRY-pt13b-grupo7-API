//Get All Categories
const { Category } = require("../../db");

/**
 * Obtener todas las categorías disponibles.
 * @returns {Promise<Array>} Un array de objetos de categoría.
 * @throws {Error} Si ocurre un error durante la obtención de categorías.
 */
const getCategories = async () => {
  try {
    const allCategories = await Category.findAll();
    return allCategories;
  } catch (error) {
    throw new Error("No se pueden obtener las categorías en este momento.");
  }
};

module.exports = getCategories;
