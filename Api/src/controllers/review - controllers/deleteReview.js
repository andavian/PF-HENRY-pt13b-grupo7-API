const { Review } = require("../../db");

const deleteReview = async (req, res) => {
  const { id } = req.query;

  try {
    // Buscar la Review por ID
    await Review.destroy({ where: { Id: id } });

    // Obtener las reviews restantes
    const remainingReviews = await Review.findAll();

    res.status(200).json(remainingReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteReview;
