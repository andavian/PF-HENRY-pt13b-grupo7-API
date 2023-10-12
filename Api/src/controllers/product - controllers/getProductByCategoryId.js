//Get Products By Name

const { Product, Category } = require("../../db");

const getProductByCategoryId = async (categoryId) => {
  const product = await Product.findAll({
    where: { categoryId },
    include: [
      {
        model: Category,
        attributes: ["name"],
      },
    ],
  });
  return product;
};

module.exports = getProductByCategoryId;
