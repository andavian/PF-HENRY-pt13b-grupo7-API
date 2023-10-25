const { Profile } = require("../../db");

const updateProfile = async (id, updatedAttributes) => {
  try {
    // Buscar el perfil por ID
    const profile = await Profile.findByPk(id);

    if (!profile) {
      throw Error("Pefil no encontrado");
    }

    // Actualizar los atributos proporcionados en updatedAttributes
    if (updatedAttributes.billingaddress) {
      profile.billingaddress = updatedAttributes.billingaddress;
    }

    if (updatedAttributes.country) {
      profile.country = updatedAttributes.country;
    }

    if (updatedAttributes.locality) {
      profile.locality = updatedAttributes.locality;
    }

    if (updatedAttributes.image) {
      profile.image = updatedAttributes.image;
    }

    if (updatedAttributes.mobilenumber) {
      profile.mobilenumber = updatedAttributes.mobilenumber;
    }

    // Guardar los cambios en la base de datos
    await profile.save();

    return profile;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = updateProfile;
