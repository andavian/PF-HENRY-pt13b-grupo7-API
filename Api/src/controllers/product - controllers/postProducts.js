//Post Products
const { Product } = require("../../db");
const categoryID = require("../../utils/categoryId");

const postProducts = async ({
  title,
  price,
  description,
  primaryimage,
  categoryName,
}) => {
  const titleLowerCase = title.toLowerCase();
  const descriptionLowerCase = description.toLowerCase();
  const categoryId = await categoryID(categoryName);

  if (!title || !price || !description || !primaryimage || !categoryName)
    throw Error("Faltan datos");

  const checkExistProduct = await Product.findAll({
    where: {
      title: titleLowerCase,
    },
  });
  if (checkExistProduct.length > 0) throw Error("Ya existe el producto");

  const newProduct = await Product.create({
    title: titleLowerCase,
    price,
    description: descriptionLowerCase,
    primaryimage,
    categoryId,
  });

  return newProduct;
};

module.exports = postProducts;
