//aqui van las rutas get/post/put/delete correspondientes
const { Router } = require("express");
const productsRoutes = Router();

const getProducts = require("../controllers/product - controllers/getProducts");
const getProductByName = require("../controllers/product - controllers/getProductByName");
const getProductsById = require("../controllers/product - controllers/getProductsById");

const postProducts = require("../controllers/product - controllers/postProducts");

productsRoutes.get("/search", async (req, res) => {
  try {
    const { name } = req.query;
    const productByName = await getProductByName(name);
    if (productByName.length === 0) {
      return res.status(404).json({
        message: `No se encontraron productos con el nombre: ${name}`,
      });
    }
    res.status(200).json(productByName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

productsRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const productById = await getProductsById(id);
    res.status(200).json(productById);
  } catch (error) {
    res.status(400).json({ error: `No existe producto con el id: ${id}` });
  }
});

productsRoutes.get("/", async (req, res) => {
  try {
    const allProducts = await getProducts();
    return res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).json({ message: "No hay productos para mostrar" });
  }
});

productsRoutes.post("/", async (req, res) => {
  try {
    const response = req.body;
    console.log(response);
    const productPost = await postProducts(response);
    
    res.status(201).json(productPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = productsRoutes;
