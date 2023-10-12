const { Client } = require("../db");

const clientId = async (clientName) => {
  try {
    const clientNameLowerCase = clientName.toLowerCase();
    const client = await Client.findOne({
      where: {
        name: clientNameLowerCase,
      },
    });

    if (client) {
      return client.id;
    } else {
      throw new Error("Cliente no encontrada");
    }
  } catch (error) {
    throw new Error("Error al buscar el cliente: " + error.message);
  }
};

module.exports = clientId;