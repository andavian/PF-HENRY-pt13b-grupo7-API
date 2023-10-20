//Post Client
const { User } = require("../../db");

const postUser = async (name, email) => {
  const nameLowerCase = name.toLowerCase();
  const emailLowerCase = email.toLowerCase();

  if (!name || !email) throw Error("Faltan datos");

  const checkExistUser = await User.findAll({
    where: {
      email: emailLowerCase,
    },
  });
  if (checkExistUser.length > 0) return checkExistUser;

  const newUser = await User.create({
    name: nameLowerCase,
    email: emailLowerCase,
  });

  return newUser;
};

module.exports = postUser;
