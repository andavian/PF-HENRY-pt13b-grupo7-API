//aqui van las rutas get/post/put/delete correspondientes
const { Router } = require("express");
const reviewsRoutes = Router();

const getReviews = require("../controllers/review - controllers/getReviews");
const getReviewById = require("../controllers/review - controllers/getReviewById");
const postReview = require("../controllers/review - controllers/postReview");

reviewsRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const reviewById = await getReviewById(id);
    res.status(200).json(reviewById);
  } catch (error) {
    res.status(400).json({ error: `No existe review con el id: ${id}` });
  }
});

reviewsRoutes.get("/", async (req, res) => {
  try {
    const allReviews = await getReviews();
    return res.status(200).json(allReviews);
  } catch (error) {
    res.status(400).json({ message: "No hay review para mostrar" });
  }
});

reviewsRoutes.post("/", async (req, res) => {
  try {
    const response = req.body;
    console.log(response);
    const reviewPost = await postReview(response);
    
    res.status(201).json(reviewPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = reviewsRoutes;