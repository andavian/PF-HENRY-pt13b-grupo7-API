//aqui van las rutas get/post/put/delete correspondientes
const { Router } = require("express");
const favoritesRoutes = Router();

const getFavorites = require("../controllers/favorites-controller/getFavorites");
const postFavorites = require("../controllers/favorites-controller/postFavorites");
const deleteFavorites = require("../controllers/favorites-controller/deleteFavorites");

favoritesRoutes.get("/", async (req, res) => {
  try {
    const allFavorites = await getFavorites();
    return res.status(200).json(allFavorites);
  } catch (error) {
    res.status(400).json({ message: "No hay favoritos para mostrar" });
  }
});

favoritesRoutes.post("/", async (req, res) => {
  try {
    const response = req.body;
    const favoritePost = await postFavorites(response);
    res.status(201).json(favoritePost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

favoritesRoutes.delete("/delete", deleteFavorites);

module.exports = favoritesRoutes;