//Post un Review
const { Review, Product } = require("../../db");
const userID = require("../../utils/userId");

const postReview = async (productId, email, description, rating) => {
  const userId = await userID(email);

  const productExist = await Product.findOne({ where: { id: productId } });

  if (!productId || !description || !rating) throw Error("Faltan datos");

  const checkExistReview = await Review.findAll({
    where: {
      UserId: userId,
      ProductId: productExist.id,
    },
  });
  if (checkExistReview.length > 0) throw Error("Ya existe la Review");

  const newReview = await Review.create({
    description,
    rating,
    ProductId: productId,
    UserId: userId,
  });
  return newReview;
};

module.exports = postReview;
