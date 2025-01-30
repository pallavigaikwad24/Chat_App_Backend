const { where } = require("sequelize");
const { NotificationToken } = require("../models");
const getModelInfo = require("../service/getModelInfo");
const HTTP_CODE = require("../service/enum");

const logoutController = async (req, res) => {
  try {
    // Using Passport
    req.logout(function (err) {
      if (err) {
        console.log(err);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
      }
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
        }
        res.clearCookie("user_SID");
        return res.status(HTTP_CODE.OK.code).send(HTTP_CODE.OK.message);
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
  }
};

module.exports = logoutController;
