const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const getModelInfo = require("../service/getModelInfo");
const HTTP_CODE = require("../service/enum");

const registerController = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const arguments = {
      modelName: Users,
      methodType: "create",
      args: { username: username, password: bcrypt.hashSync(password, 8), email, profile_img: "/profile-img.jpg" },
    };
    await getModelInfo(arguments);

    return res.status(HTTP_CODE.OK.code).send(HTTP_CODE.OK.message);
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
  }
};

module.exports = registerController;
