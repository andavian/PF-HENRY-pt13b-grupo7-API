//Get All Products
const { Category } = require("../../db");

const getCategories = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

module.exports = getCategories;
