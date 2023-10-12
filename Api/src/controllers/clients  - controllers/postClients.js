//Post Client
const { Client } = require("../../db");

const postClients = async ({
  name,
  email,
  password,
  billingaddress,
  country,
  locality,
  mobilenumber,
}) => {
  const nameLowerCase = name.toLowerCase();
  const emailLowerCase = email.toLowerCase();

  if (
    !name ||
    !email ||
    !password ||
    !billingaddress ||
    !country ||
    !locality ||
    !mobilenumber
  )
    throw Error("Faltan datos");

  const checkExistClient = await Client.findAll({
    where: {
      title: nameLowerCase,
    },
  });
  if (checkExistClient.length > 0) throw Error("Ya existe el cliente");

  const newClient = await Client.create({
    name: nameLowerCase,
    email: emailLowerCase,
    password,
    billingaddress,
    country,
    locality,
    mobilenumber,
  });

  return newClient;
};

module.exports = postClients;
