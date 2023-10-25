const { Profile, User } = require("../../db");
const userID = require("../../utils/userId");

const getProfile = async (email) => {
  try {
    const userId = await userID(email);

    const profile = await Profile.findAll({
      where: {
        UserId: userId,
      },
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });

    return profile;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getProfile;
