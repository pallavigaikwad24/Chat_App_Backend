const { where } = require("sequelize");
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const getModelInfo = require("../service/getModelInfo");
const HTTP_CODE = require("../service/enum");

const setPassController = async (req, res) => {
  try {
    const { password } = req.body;
    const arguments = {
      modelName: Users, methodType: "update", args: [{ password: bcrypt.hashSync(password, 8) }, { where: { id: req.user.id } }],
    };
    await getModelInfo(arguments);
    return res.status(HTTP_CODE.OK.code).send(HTTP_CODE.OK.message);
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR.code).send(HTTP_CODE.INTERNAL_SERVER_ERROR.message)
  }
};

module.exports = setPassController;
