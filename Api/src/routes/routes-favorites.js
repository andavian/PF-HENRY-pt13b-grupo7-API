//aqui van las rutas get/post/put/delete correspondientes
const { Router } = require("express");
const favoritesRoutes = Router();

const getFavorites = require("../controllers/favorites-controller/getFavorites");
const patchFavorites = require("../controllers/favorites-controller/patchFavorites");
const deleteFavorites = require("../controllers/favorites-controller/deleteFavorites");

favoritesRoutes.get("/", getFavorites);

favoritesRoutes.post("/", patchFavorites);

favoritesRoutes.delete("/delete", deleteFavorites);

module.exports = favoritesRoutes;
