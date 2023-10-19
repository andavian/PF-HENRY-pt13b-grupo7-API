//Post Client
const { User } = require("../../db");

const postUser = async ({ email }) => {
  const emailLowerCase = email.toLowerCase();

  if (!email) throw Error("Faltan datos");

  const checkExistUser = await User.findAll({
    where: {
      name: nameLowerCase,
    },
  });
  if (checkExistUser.length > 0) throw Error("Ya existe el cliente");

  const newUser = await User.create({
    email: emailLowerCase,
  });

  return newUser;
};

module.exports = postUser;
