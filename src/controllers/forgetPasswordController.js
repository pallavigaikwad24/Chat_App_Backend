const { Users, PasswordResetToken } = require("../models");
const { where, Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const getModelInfo = require("../service/getModelInfo");
const HTTP_CODE = require("../service/enum");

const forgetPass = async (req, res) => {
  try {
    const { password } = req.body;
    const token = req.query.token;
    const email = req.session.email;

    const findOneArguments = {
      modelName: PasswordResetToken, methodType: "findOne", args: { where: { token: token, expiretoken: { [Op.gt]: Date.now() } } },
    };

    const currToken = await getModelInfo(findOneArguments);

    if (!email) {
      return res.status(HTTP_CODE.NOT_FOUND.code).send(HTTP_CODE.NOT_FOUND.message); // redirect to email-forgetPass
    }

    const expireMsg =
      "Your Reset Password token has been expired, Please try again!!";
    if (!currToken) {
      return res.status(HTTP_CODE.OK.code).json({ expire: expireMsg, token: token });

    } else {
      const updateArguments = {
        modelName: Users,
        methodType: "update",
        args: [{ password: bcrypt.hashSync(password, 8) }, { where: { google_gmail_id: email } }],
      };

      await getModelInfo(updateArguments);
      return res.status(HTTP_CODE.OK.code).send(HTTP_CODE.OK.message); // redirect to successForgetpass
    }
  } catch (error) {
    console.log("Error while updating password: ", error);
    return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
  }
};

module.exports = forgetPass;
