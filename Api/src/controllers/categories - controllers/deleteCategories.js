const { Category } = require("../../db");

const deleteCategory = async (req, res) => {
  const { name } = req.query;
  console.log(name);

  const nameToLowerCase = name.toLowerCase();
  console.log(nameToLowerCase);
  try {
    await Category.destroy({
      where: { name: nameToLowerCase },
    });
    const pokemons = await Category.findAll();
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteCategory;
