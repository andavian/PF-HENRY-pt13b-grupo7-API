//Get All Favorites
const { Product, User } = require("../../db");

const getFavorites = async (req, res) => {
  try {
    const { userId } = req.body;

    // Buscamos al usuario por su ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const favorites = user.favorites.map((favorite) =>
      Product.findByPk(favorite)
    );
    // Devolvemos la lista de favoritos del usuario
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron obtener los favoritos." });
  }

  return allFavorites;
};

module.exports = getFavorites;
