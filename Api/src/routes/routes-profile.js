const { Router } = require("express");
const profilesRoutes = Router();

const getProfile = require("../controllers/profiles-controllers/getProfile");
//const getReviewById = require("../controllers/review - controllers/getReviewById");
const postProfile = require("../controllers/profiles-controllers/postProfile");
//const deleteReview = require("../controllers/review - controllers/deleteReview");
//const updateReview = require("../controllers/review - controllers/updateReview");

//profilesRoutes.delete("/", deleteReview);

// profilesRoutes.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const reviewById = await getReviewById(id);
//     res.status(200).json(reviewById);
//   } catch (error) {
//     res.status(400).json({ error: `No existe reseña con el ID: ${id}` });
//   }
// });

// profilesRoutes.patch("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedAttributes = req.body;
//     const updatedReview = await updateReview(id, updatedAttributes);
//     res.status(200).json(updatedReview);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

profilesRoutes.get("/", async (req, res) => {
  const { email } = req.body;
  try {
    const profile = await getProfile(email);
    return res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: "No hay perfil para mostrar" });
  }
});

profilesRoutes.post("/", async (req, res) => {
  try {
    const response = req.body;

    const profilePost = await postProfile(response);

    res.status(201).json(profilePost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = profilesRoutes;
