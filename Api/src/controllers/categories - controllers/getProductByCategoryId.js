const { Product, Category } = require("../../db");

const getProductByCategoryId = async (categoryId) => {
  try {
    const products = await Product.findAll({
      where: { categoryId },
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getProductByCategoryId;
