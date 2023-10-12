//Post Favoritos, No permite repetir nombre de categorias, indistintamente se escriban Mayus. y Minus.
const { Favorite } = require("../../db");
const clientID = require("../../utils/clientId");
const prodID = require("../../utils/prodId");

const postFavorites = async ({ nameProd, nameClient }) => {
  if (!nameProd || !nameClient) throw Error("Faltan datos");

  const nameLowerCaseProd = nameProd.toLowerCase();
  const nameLowerCaseClient = nameClient.toLowerCase();
  const clientId = await clientID(nameClient);
  const prodId = await prodID(nameProd);

  const nameFav = nameLowerCaseProd.concat(nameLowerCaseClient);

  const checkExistFavorite = await Favorite.findAll({
    where: {
      name: nameFav,
    },
  });
  if (checkExistFavorite.length > 0) throw Error("Ya existe el favorito");

  const newFavorite = await Favorite.create({
    name: nameFav,
    prodId,
    clientId,
  });
  return newFavorite;
};

module.exports = postFavorites;
