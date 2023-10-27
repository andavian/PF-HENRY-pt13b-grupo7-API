const { Router } = require("express");
const reviewsRoutes = Router();

const {
  getReviewsWithAverageRating,
  getReviewsByUser,
} = require("../controllers/review - controllers/getReviews");
const getReviewById = require("../controllers/review - controllers/getReviewById");
const postReview = require("../controllers/review - controllers/postReview");
const deleteReview = require("../controllers/review - controllers/deleteReview");
const updateReview = require("../controllers/review - controllers/updateReview");

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Crea una nueva reseña para un producto.
 *     parameters:
 *       - in: query
 *         name: productId
 *         description: ID del producto al que se asocia la reseña.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Dirección de correo electrónico del revisor.
 *               description:
 *                 type: string
 *                 description: Descripción de la reseña.
 *               rating:
 *                 type: integer
 *                 description: Calificación de la reseña.
 *     responses:
 *       201:
 *         description: Reseña creada con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
reviewsRoutes.post("/", async (req, res) => {
  try {
    const { productId } = req.query;
    const { email, description, rating } = req.body;

    const reviewPost = await postReview(productId, email, description, rating);

    res.status(201).json(reviewPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /reviews:
 *   delete:
 *     summary: Elimina una reseña (lógicamente).
 *     responses:
 *       200:
 *         description: Reseña eliminada con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
reviewsRoutes.delete("/", deleteReview);

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Obtiene la lista de todas las reseñas.
 *     responses:
 *       200:
 *         description: Lista de reseñas obtenida con éxito.
 *       400:
 *         description: No hay reseñas para mostrar.
 */
reviewsRoutes.get("/", async (req, res) => {
  const { productId } = req.query;
  try {
    const allReviews = await getReviewsWithAverageRating(productId);
    return res.status(200).json(allReviews);
  } catch (error) {
    res.status(400).json({ message: "No hay reseñas para mostrar" });
  }
});

// reviewsRoutes.get("/", async (req, res) => {
//   const { userId } = req.query;
//   try {
//     const allReviews = await getReviewsByUser(userId);
//     return res.status(200).json(allReviews);
//   } catch (error) {
//     res.status(400).json({ message: "No hay reseñas para mostrar" });
//   }
// });

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Obtiene una reseña por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la reseña.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reseña obtenida con éxito.
 *       400:
 *         description: No existe una reseña con el ID proporcionado.
 */
// reviewsRoutes.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const reviewById = await getReviewById(id);
//     res.status(200).json(reviewById);
//   } catch (error) {
//     res.status(400).json({ error: `No existe reseña con el ID: ${id}` });
//   }
// });

/**
 * @swagger
 * /reviews/{id}:
 *   patch:
 *     summary: Actualiza una reseña por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la reseña a actualizar.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Nueva dirección de correo electrónico del revisor.
 *               description:
 *                 type: string
 *                 description: Nueva descripción de la reseña.
 *               rating:
 *                 type: integer
 *                 description: Nueva calificación de la reseña.
 *     responses:
 *       200:
 *         description: Reseña actualizada con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
reviewsRoutes.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAttributes = req.body;
    const updatedReview = await updateReview(id, updatedAttributes);
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = reviewsRoutes;
