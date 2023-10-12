//Get All Products
const { Product, Category } = require("../../db");

const getProducts = async () => {
  const allProducts = await Product.findAll({
    include: [
      {
        model: Category,
        attributes: ["name"],
      },
    ],
  });

  return allProducts;
};

module.exports = getProducts;
