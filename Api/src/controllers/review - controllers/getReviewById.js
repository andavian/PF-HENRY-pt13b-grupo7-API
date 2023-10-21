//Get Review Por ID
const { Product, Review, User } = require("../../db");

const getReviewById = async (id) => {
  const review = await Review.findByPk(id, {
    include: [
      {
        model: Product,
        attributes: ["title"],
      },
      {
        model: User,
        attributes: ["name"],
      },
    ],
  });

  return review;
};

module.exports = getReviewById;
