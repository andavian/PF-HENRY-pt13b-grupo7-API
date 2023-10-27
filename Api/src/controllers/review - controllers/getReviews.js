const { Product, Review, User } = require("../../db");

const getReviewsWithAverageRating = async (productId) => {
  try {
    // Obtener todas las reseñas
    const allReview = await Review.findAll(
      {
        where: {
          ProductId: productId,
        },
      },
      {
        include: [{ model: User, attributes: ["name"] }],
      }
    );

    // Calcular el promedio de calificaciones
    const averageRating = await Review.findOne({
      attributes: [
        [
          Review.sequelize.fn("avg", Review.sequelize.col("rating")),
          "averageRating",
        ],
      ],
    });

    // Calcular el promedio o establecerlo en 0 si no hay reseñas
    const calculatedAverage = averageRating
      ? averageRating.getDataValue("averageRating")
      : 0;

    return {
      reviews: allReview,
      averageRating: calculatedAverage,
    };
  } catch (error) {
    console.error(
      "Error al obtener reseñas y promedio de calificaciones:",
      error
    );
    throw error;
  }
};

const getReviewsByUser = async (userId) => {
  try {
    // Obtener todas las reseñas
    const allReview = await Review.findAll(
      {
        where: {
          UserId: userId,
        },
      },
      {
        include: [{ model: Product, attributes: ["title"] }],
      }
    );
    return allReview;
  } catch (error) {
    console.error("Error al obtener reseñas: ", error);
    throw error;
  }
};

module.exports = { getReviewsWithAverageRating, getReviewsByUser };
