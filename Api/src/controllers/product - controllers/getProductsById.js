//Get Product Por ID
const { Product, Category } = require("../../db");

const getProductsById = async (id) => {
  const productIdBD = await Product.findOne({
    where: { id },
    include: [
      {
        model: Category,
        attributes: ["name"],
      },
    ],
  });
  return productIdBD;
};

module.exports = getProductsById;

/*Hay que corregir para traer el name de Category. El sig. codigo es para buscar nombre en la relacion con la tabla Category - Ver si se puede implementar o usar otra forma

{
        where: { id },
        include: {
            model: Category,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          }
    }

*/
