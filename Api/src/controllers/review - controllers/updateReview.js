const { Review } = require("../../db");

const updateReview = async (id, updatedAttributes) => {
  try {
    // Buscar la reseña por ID
    const review = await Review.findByPk(id);

    if (!review) {
      throw Error("Reseña no encontrado");
    }

    // Actualizar los atributos proporcionados en updatedAttributes
    if (updatedAttributes.rating) {
      review.rating = updatedAttributes.rating;
    }

    if (updatedAttributes.description) {
      review.description = updatedAttributes.description;
    }

    // Guardar los cambios en la base de datos
    await review.save();

    return review;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = updateReview;
