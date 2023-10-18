const { Router } = require("express");
const categoriesRoutes = Router();

const getCategories = require("../controllers/categories - controllers/getCategories");
const postCategories = require("../controllers/categories - controllers/postCategories");
const getProductByCategoryId = require("../controllers/product - controllers/getProductByCategoryId");
const deleteCategories = require("../controllers/categories - controllers/deleteCategories");

/**
 * @swagger
 * categories/{id}:
 *   get:
 *     summary: Obtiene una categoría por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la categoría.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría obtenida con éxito.
 *       400:
 *         description: No existe una categoría con el ID proporcionado.
 */
categoriesRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const categoryById = await getProductByCategoryId(id);
    res.status(200).json(categoryById);
  } catch (error) {
    res.status(400).json({ error: `No existe categoría con el ID: ${id}` });
  }
});

/**
 * @swagger
 * categories:
 *   get:
 *     summary: Obtiene todas las categorías.
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida con éxito.
 *       400:
 *         description: No hay categorías para mostrar.
 */
categoriesRoutes.get("/", async (req, res) => {
  try {
    const allCategories = await getCategories();
    return res.status(200).json(allCategories);
  } catch (error) {
    res.status(400).json({ message: "No hay categorías para mostrar" });
  }
});

/**
 * @swagger
 * categories:
 *   post:
 *     summary: Crea una nueva categoría.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría.
 *               thumbnail:
 *                 type: string
 *                 description: URL de la imagen en miniatura.
 *     responses:
 *       201:
 *         description: Categoría creada con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
categoriesRoutes.post("/", async (req, res) => {
  try {
    const response = req.body;
    const categoryPost = await postCategories(response);
    res.status(201).json(categoryPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * categories/delete:
 *   delete:
 *     summary: Borra una categoría (lógicamente).
 *     responses:
 *       200:
 *         description: Categoría eliminada con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
categoriesRoutes.delete("/delete", deleteCategories);

module.exports = categoriesRoutes;
