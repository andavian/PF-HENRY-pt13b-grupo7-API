//Post un Review
const { conn } = require("../../db");
const { Review, User, Product } = conn.models;
//const cliId = require("../../utils/cliId");
//const prodId = require("../../utils/prodId");

const postReview = async ({ userId, productId, description, rating }) => {
  //const clientId = await cliId(nameClient);
  //const productId = await prodId(nameProd);
  const userExist = await User.findByPk(userId);
  const productExist = await Product.findByPk(productId);

  if (!userId || !productId || !description || !rating)
    throw Error("Faltan datos");

  const checkExistReview = await Review.findAll({
    where: {
      userId: userExist.userId,
      productId: productExist.productId,
    },
  });
  if (checkExistReview.length > 0) throw Error("Ya existe la Review");

  const newReview = await Review.create({
    userId: userExist.userId,
    productId: productExist.productId,
    description,
    rating,
  });
  return newReview;
};

module.exports = postReview;
