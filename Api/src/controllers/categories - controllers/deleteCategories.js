const { Category } = require("../../db");

const deleteCategory = async (req, res) => {
  const { name } = req.query;
  const nameToLowerCase = name.toLowerCase();

  try {
    // Buscar la categoría por nombre
    const category = await Category.findOne({
      where: { name: nameToLowerCase },
    });

    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    // Realizar el borrado lógico actualizando el campo "isDeleted"
    category.isDeleted
      ? await category.update({ isDeleted: false })
      : await category.update({ isDeleted: true });

    // Opcional: Recuperar todas las categorías no eliminadas
    const remainingCategories = await Category.findAll({
      where: { isDeleted: false },
    });

    res.status(200).json(remainingCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteCategory;
