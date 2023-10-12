//Get Products By Name
const { Op } = require("sequelize");
const { Product, Category } = require("../../db");

const getProductByName = async (title) => {
  const titleLowerCase = title.toLowerCase();

  const product = await Product.findAll({
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
  return product;
};

module.exports = getProductByName;
