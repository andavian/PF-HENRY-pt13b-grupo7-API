const { Router } = require("express");
const usersRoutes = Router();

const getUsers = require("../controllers/users  - controllers/getUsers");
const getUsersByEmail = require("../controllers/users  - controllers/getUsersByEmail");
const deleteUsers = require("../controllers/users  - controllers/deleteUsers");
const postUsers = require("../controllers/users  - controllers/postUsers");

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del usuario a eliminar.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito.
 *       400:
 *         description: No existe un usuario con el ID proporcionado.
 */

usersRoutes.delete("/:id", deleteUsers);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene la lista de todos los usuarios.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito.
 *       400:
 *         description: No hay usuarios para mostrar.
 */

usersRoutes.get("/", async (req, res) => {
  try {
    const allUsers = await getUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ message: "No hay usuarios para mostrar" });
  }
});

/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Busca usuarios por su dirección de correo electrónico.
 *     parameters:
 *       - in: query
 *         name: email
 *         description: Dirección de correo electrónico del usuario a buscar.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito.
 *       404:
 *         description: No se encontraron usuarios con el email proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */

usersRoutes.get("/search", async (req, res) => {
  try {
    const { email } = req.query;
    const usersByEmail = await getUsersByEmail(email);
    if (usersByEmail.length === 0) {
      return res.status(404).json({
        message: `No se encontraron usuarios con el email: ${email}`,
      });
    }
    res.status(200).json(usersByEmail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario.
 *               email:
 *                 type: string
 *                 description: Dirección de correo electrónico del usuario.
 *     responses:
 *       201:
 *         description: Usuario creado con éxito.
 *       500:
 *         description: Error interno del servidor.
 */

usersRoutes.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const userPost = await postUsers(name, email);
    res.status(201).json(userPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = usersRoutes;
