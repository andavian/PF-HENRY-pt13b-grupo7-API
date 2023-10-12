const { Category } = require("../db");

const categoryId = async (categoryName) => {
  try {
    const categoryNameLowerCase = categoryName.toLowerCase();
    const category = await Category.findOne({
      where: {
        name: categoryNameLowerCase,
      },
    });

    if (category) {
      return category.id;
    } else {
      throw new Error("Categoría no encontrada");
    }
  } catch (error) {
    throw new Error("Error al buscar la categoría: " + error.message);
  }
};

module.exports = categoryId;
