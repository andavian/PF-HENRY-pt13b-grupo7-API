const { Op } = require("sequelize");
const { Product, Category } = require("../../db");

const getProducts = async () => {
  try {
    const allProducts = await Product.findAll({
      where: {
        hidden: false,
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });

    return allProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllProducts = async () => {
  try {
    const allProducts = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });

    return allProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOnSaleProducts = async () => {
  try {
    const allProducts = await Product.findAll({
      where: {
        hidden: false,
        offer: true,
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });

    return allProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getNewProducts = async () => {
  try {
    const newProducts = await Product.findAll({
      order: [["createdAt", "DESC"]], // Ordenar por "createdAt" en orden descendente (más reciente primero)
    });

    return newProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};

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

const getProductsById = async (id) => {
  try {
    const product = await Product.findOne({
      where: { Id: id },
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });

    // Devolver `null` si el producto no se encuentra
    if (!product) {
      return null;
    }

    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getProductsById,
  getProductByName,
  getAllProducts,
  getProducts,
  getOnSaleProducts,
  getNewProducts,
};
