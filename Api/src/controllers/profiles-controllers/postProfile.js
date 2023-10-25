//Post Products
const { Profile } = require("../../db");
const userID = require("../../utils/userId");

const postProfile = async ({
  image,
  billingaddress,
  country,
  locality,
  mobilenumber,
  email,
}) => {
  try {
    const billingaddressLowerCase = billingaddress.toLowerCase();

    const userId = await userID(email);

    if (!billingaddress) throw Error("Faltan datos");

    const checkExistPofile = await Profile.findAll({
      where: {
        billingaddress: billingaddressLowerCase,
        UserId: userId,
      },
    });

    if (checkExistPofile.length > 0) {
      throw Error("Ya existe el perfil");
    }

    const newProfile = await Profile.create({
      billingaddress: billingaddressLowerCase,
      country,
      locality,
      image,
      mobilenumber,
      UserId: userId,
    });

    return newProfile;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = postProfile;
