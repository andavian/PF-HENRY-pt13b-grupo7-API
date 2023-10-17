//Get All Reviews
const { Product, Review, User } = require("../../db");

const getReviews = async () => {
  const allReview = await Review.findAll({
    include: [
      { model: User, attributes: ["name"] },
      { model: Product, attributes: ["title"] }
    ]
  });

  return allReview;
 
};

module.exports = getReviews;