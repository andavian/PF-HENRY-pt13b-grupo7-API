const { Client } = require("../../db");

const deleteClients = async (req, res) => {
  const { name } = req.query;
  console.log(name);

  const nameToLowerCase = name.toLowerCase();
  console.log(nameToLowerCase);
  try {
    await Client.destroy({
      where: { name: nameToLowerCase },
    });
    const allClient = await Client.findAll();
    res.status(200).json(allClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteClients;
