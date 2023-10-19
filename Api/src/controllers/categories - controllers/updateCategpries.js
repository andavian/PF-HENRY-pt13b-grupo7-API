const { Category } = require("../../db");

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
