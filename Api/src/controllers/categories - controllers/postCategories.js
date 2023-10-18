//Post Categorias, No permite repetir nombre de categorias, indistintamente se escriban Mayus. y Minus.
const { Category } = require("../../db");

/**
 * Agregar una nueva categoría.
 * @param {string} name - El nombre de la categoría.
 * @param {string} thumbnail - La URL de la imagen en miniatura.
 * @returns {Promise<object>} El objeto de categoría creado.
 * @throws {Error} Si faltan datos, si la categoría ya existe o si ocurre un error en la base de datos.
 */

const postCategories = async ({ name, thumbnail }) => {
  if (!name || !thumbnail) {
    throw new Error("Los datos de nombre y miniatura son obligatorios.");
  }

  const nameLowerCase = name.toLowerCase();

  const existingCategory = await Category.findOne({
    where: { name: nameLowerCase },
  });

  if (existingCategory) {
    throw new Error("La categoría ya existe.");
  }

  try {
    const newCategory = await Category.create({
      name: nameLowerCase,
      thumbnail,
    });
    return newCategory;
  } catch (error) {
    throw new Error("No se pudo crear la categoría en este momento.");
  }
};

module.exports = postCategories;
