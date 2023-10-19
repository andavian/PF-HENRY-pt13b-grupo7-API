const { Op } = require("sequelize");
const { Product, Category } = require("../../db");

const getProductByName = async (title) => {
  try {
    const titleLowerCase = title.toLowerCase();

    const products = await Product.findAll({
      where: {
        title: {
          [Op.iLike]: `%${titleLowerCase}%`,
        },
      },
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

module.exports = getProductByName;
