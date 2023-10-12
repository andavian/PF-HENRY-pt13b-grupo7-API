//aqui van las rutas get/post/put/delete correspondientes
const { Router } = require("express");
const clientsRoutes = Router();

const getClients = require("../controllers/clients  - controllers/getClients");
const getClienteByName = require("../controllers/clients  - controllers/getClientByName");
const deleteClients = require("../controllers/clients  - controllers/deleteClients");
const postClients = require("../controllers/clients  - controllers/postClients");

clientsRoutes.get("/", async (req, res) => {
  try {
    const allClients = await getClients();
    return res.status(200).json(allClients);
  } catch (error) {
    res.status(400).json({ message: "No hay clientes para mostrar" });
  }
});

clientsRoutes.get("/name", async (req, res) => {
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

clientsRoutes.post("/", async (req, res) => {
  try {
    const response = req.body;
    const clientPost = await postClients(response);
    res.status(201).json(clientPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

clientsRoutes.delete("/delete", deleteClients);

module.exports = clientsRoutes;
