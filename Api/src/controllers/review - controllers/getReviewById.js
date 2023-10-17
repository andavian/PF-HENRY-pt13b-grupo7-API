//Get Review Por ID
const { Product, Review, User } = require("../../db");

const getReviewById = async (id) => {
  const reviewIdBD = await Review.findOne({
    where: { id },
    include: [
      {
        model: Product,
        attributes: ["title"],
      },
    ],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
  });
  return reviewIdBD;
};

module.exports = getReviewById;
