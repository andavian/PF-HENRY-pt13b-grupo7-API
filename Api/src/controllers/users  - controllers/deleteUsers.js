const { User } = require("../../db");

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    // Buscar el usuario por ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "usuario no encontrado" });
    }

    // Realizar el borrado lógico actualizando el campo "banned"
    user.banned
      ? await user.update({ banned: false })
      : await user.update({ banned: true });

    // Obtener los usuarios restantes (no baneados)
    const unbannedUsers = await User.findAll({
      where: { banned: false },
    });

    res.status(200).json(unbannedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteUser;
