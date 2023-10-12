const { Favorite } = require("../../db");

const deleteFavorites = async (req, res) => {
  const { name } = req.query;
  console.log(name);

  const nameToLowerCase = name.toLowerCase();
  console.log(nameToLowerCase);
  try {
    await Favorite.destroy({
      where: { name: nameToLowerCase },
    });
    const allFavorite = await Favorite.findAll();
    res.status(200).json(allFavorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteFavorites;
