const { Category } = require("../../db");

/**
 * Actualizar una categoría existente.
 * @param {string} name - El nombre de la categoría a actualizar.
 * @param {string} newThumbnail - La nueva URL de la imagen en miniatura.
 * @returns {Promise<object|null>} El objeto de categoría actualizado o null si la categoría no existe.
 * @throws {Error} Si ocurre un error en la base de datos.
 */
const updateCategory = async ({ name, newThumbnail }) => {
  const nameLowerCase = name.toLowerCase();

  // Verificar si la categoría existe
  const existingCategory = await Category.findOne({
    where: { name: nameLowerCase },
  });

  if (!existingCategory) {
    return null;
  }

  // Realizar la actualización
  try {
    await existingCategory.update({ thumbnail: newThumbnail });
    return existingCategory;
  } catch (error) {
    throw new Error("No se pudo actualizar la categoría en este momento.");
  }
};

module.exports = updateCategory;
