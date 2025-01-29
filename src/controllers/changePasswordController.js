const { where } = require("sequelize");
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const getModelInfo = require("../service/getModelInfo");
const HTTP_CODE = require("../service/enum");

const changePasswordController = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const argument = {
      modelName: Users, methodType: "update", args: [{ password: bcrypt.hashSync(newPassword, 8) }, { where: { id: req.user.id } }],
    };

    await getModelInfo(argument);

    return res.status(HTTP_CODE.OK.code).json({ success: true });
  } catch (error) {
    console.log("Error while changing password!!", error);
    res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
  }
};

module.exports = changePasswordController;
