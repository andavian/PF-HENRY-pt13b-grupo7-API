//Get Categoria Por ID
const { Category } = require("../../db");

const getCategoriesById = async (id) => {
  const categoryIdBD = await Category.findOne({
    where: { id },
  });
  return categoryIdBD;
};

module.exports = getCategoriesById;
