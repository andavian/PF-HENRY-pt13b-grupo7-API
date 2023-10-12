//Get All Favorites
const { Product, Favorite, Client } = require("../../db");

const getFavorites = async () => {
  const allFavorites = await Favorite.findAll({
    include: [
      {
        model: Product,
        attributes: ["name"],
      },
    ],
    include: [
      {
        model: Client,
        attributes: ["name"],
      },
    ],
  });

  return allFavorites;
};

module.exports = getFavorites;
