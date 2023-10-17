const { User } = require("../../db");

const deleteFavorites = async (req, res) => {
  const { userId, productID } = req.body;

  try {
    // Buscamos al usuario por su ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await user.favorite.filter((favorite) => user.favorite !== productID);

    res.status(200).json(user.favorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteFavorites;
