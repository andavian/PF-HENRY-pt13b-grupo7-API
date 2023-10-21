const { User } = require("../db");

const userId = async (userEmail) => {
  try {
    const emailLowerCase = userEmail.toLowerCase();
    const user = await User.findOne({
      where: {
        email: emailLowerCase,
      },
    });

    if (user) {
      return user.id;
    } else {
      throw new Error("Usuario no encontrada");
    }
  } catch (error) {
    throw new Error("Error al buscar el usuario: " + error.message);
  }
};

module.exports = userId;
