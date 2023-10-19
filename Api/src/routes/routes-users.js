//aqui van las rutas get/post/put/delete correspondientes
const { Router } = require("express");
const usersRoutes = Router();

const getUsers = require("../controllers/users  - controllers/getUsers");
const getUsersByName = require("../controllers/users  - controllers/getUsersByName");
const deleteUsers = require("../controllers/users  - controllers/deleteUsers");
const postUsers = require("../controllers/users  - controllers/postUsers");

usersRoutes.get("/", async (req, res) => {
  try {
    const allUsers = await getUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ message: "No hay clientes para mostrar" });
  }
});

usersRoutes.get("/name", async (req, res) => {
  try {
    const { name } = req.query;
    const clientByName = await getClienteByName(name);
    if (clientByName.length === 0) {
      return res.status(404).json({
        message: `No se encontraron clientes con el nombre: ${name}`,
      });
    }
    res.status(200).json(clientByName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

usersRoutes.post("/", async (req, res) => {
  try {
    const userData = req.body.user;
    const clientPost = await postUsers(userData);
    res.status(201).json(clientPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

usersRoutes.delete("/delete", deleteUsers);

module.exports = usersRoutes;
