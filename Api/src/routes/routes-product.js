const { Router } = require("express");
const productsRoutes = Router();

const getProducts = require("../controllers/product - controllers/getProducts");
const getProductByName = require("../controllers/product - controllers/getProductByName");
const getProductsById = require("../controllers/product - controllers/getProductsById");
const postProducts = require("../controllers/product - controllers/postProducts");
const updateProduct = require("../controllers/product - controllers/updateProduct");
const deleteProduct = require("../controllers/product - controllers/deleteProduct");

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Busca productos por nombre.
 *     parameters:
 *       - in: query
 *         name: name
 *         description: Nombre del producto a buscar.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito.
 *       404:
 *         description: No se encontraron productos con el nombre proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
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

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un producto por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a eliminar.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito.
 *       400:
 *         description: No existe un producto con el ID proporcionado.
 */
productsRoutes.delete("/:id", deleteProduct);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto obtenido con éxito.
 *       400:
 *         description: No existe un producto con el ID proporcionado.
 */
productsRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await getProductsById(id);
    res.status(200).json(productById);
  } catch (error) {
    res.status(400).json({ error: `No existe producto con el ID: ${id}` });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Actualiza un producto por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nuevo título del producto.
 *               price:
 *                 type: number
 *                 description: Nuevo precio del producto.
 *               description:
 *                 type: string
 *                 description: Nueva descripción del producto.
 *               primaryimage:
 *                 type: string
 *                 description: Nueva URL de la imagen principal del producto.
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
productsRoutes.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAttributes = req.body;
    const updatedProduct = await updateProduct(id, updatedAttributes);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene todos los productos.
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito.
 *       400:
 *         description: No hay productos para mostrar.
 */
productsRoutes.get("/", async (req, res) => {
  try {
    const allProducts = await getProducts();
    return res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).json({ message: "No hay productos para mostrar" });
  }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuevo producto.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del producto.
 *               price:
 *                 type: number
 *                 description: Precio del producto.
 *               description:
 *                 type: string
 *                 description: Descripción del producto.
 *               primaryimage:
 *                 type: string
 *                 description: URL de la imagen principal del producto.
 *               stock:
 *                 type: number
 *                 description: Cantidad en stock del producto.
 *               categoryName:
 *                 type: string
 *                 description: Nombre de la categoría a la que pertenece el producto.
 *     responses:
 *       201:
 *         description: Producto creado con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
productsRoutes.post("/", async (req, res) => {
  try {
    const response = req.body;
    const productPost = await postProducts(response);
    res.status(201).json(productPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = productsRoutes;
