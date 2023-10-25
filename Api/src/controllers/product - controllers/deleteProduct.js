const { Product } = require("../../db");

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el producto por ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Realizar el borrado lógico actualizando el campo "hidden"
    product.hidden
      ? await product.update({ hidden: false })
      : await product.update({ hidden: true });

    // Obtener los productos restantes (no ocultos)
    const remainingProducts = await Product.findAll({
      where: { hidden: false },
    });

    res.status(200).json(remainingProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOffer = async (req, res) => {
  const { id } = req.query;

  try {
    // Buscar el producto por ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Realizar el borrado lógico actualizando el campo "hidden"
    product.offer
      ? await product.update({ offer: false })
      : await product.update({ offer: true });

    // Obtener los productos restantes (no ocultos)
    const remainingProducts = await Product.findAll({
      where: { offer: true },
    });

    res.status(200).json(remainingProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { deleteProduct, deleteOffer };
