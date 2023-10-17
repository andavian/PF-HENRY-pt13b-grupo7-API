const { User } = require("../../db");
// const clientID = require("../../utils/clientId");
// const prodID = require("../../utils/prodId");

const patchFavorites = // Ruta para agregar un producto a favoritos (routes/favorites.js)
  async (req, res) => {
    try {
      const { userId, productId } = req.body;

      // Buscamos al usuario por su ID
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // Verificamos si el producto ya está en la lista de favoritos
      if (!user.favorites.includes(productId)) {
        // Agregamos el ID del producto a la propiedad 'favorites' del usuario
        user.favorites.push(productId);

        // Guardamos los cambios en la base de datos
        await user.save();

        res.json({ message: "Producto agregado a favoritos" });
      } else {
        res
          .status(400)
          .json({ error: "El producto ya está en la lista de favoritos" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo agregar el favorito." });
    }
  };

// async ({ nameProd, nameClient }) => {
//   if (!nameProd || !nameClient) throw Error("Faltan datos");

//   const nameLowerCaseProd = nameProd.toLowerCase();
//   const nameLowerCaseClient = nameClient.toLowerCase();
//   const clientId = await clientID(nameClient);
//   const prodId = await prodID(nameProd);

//   const nameFav = nameLowerCaseProd.concat(nameLowerCaseClient);

//   const checkExistFavorite = await Favorite.findAll({
//     where: {
//       name: nameFav,
//     },
//   });
//   if (checkExistFavorite.length > 0) throw Error("Ya existe el favorito");

//   const newFavorite = await Favorite.create({
//     name: nameFav,
//     prodId,
//     clientId,
//   });
//   return newFavorite;
// };

module.exports = patchFavorites;
