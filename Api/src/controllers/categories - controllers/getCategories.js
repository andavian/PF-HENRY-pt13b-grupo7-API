//Get All Categories
const { Category } = require("../../db");

const getCategories = async () => {
  try {
    const allCategories = await Category.findAll();
    return allCategories;
  } catch (error) {
    throw new Error("No se pueden obtener las categorías en este momento.");
  }
};

module.exports = getCategories;
