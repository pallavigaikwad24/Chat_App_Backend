const bcrypt = require("bcryptjs");
const { Users } = require("../models/index.js");
const { body } = require("express-validator");
const { where } = require("sequelize");

function changePasswordValidation() {
  let password = null;
  const result = [
    body("currentPassword")
      .notEmpty()
      .withMessage("Password field is required!!"),
    body("currentPassword").custom(async (value, { req }) => {
      const passwordExist = await Users.findOne({
        where: { id: req.user.id },
      });

      isValidPass = bcrypt.compareSync(value, passwordExist.password);

      if (!isValidPass) {
        throw new Error("Current Password is incorrect!!");
      }
      console.log("Password Exist:::", passwordExist);
    }),
    body("newPassword").notEmpty().withMessage("New Password field is required!!"),
    body("newPassword").custom(async (value) => {
      if (value.trim().length == 0) {
        throw new Error("Please enter new password!");
      }
      password = value;

      if (value.length < 8) {
        throw new Error("New Password should more than 8 characters!");
      }
    }),
    body("newPassword")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/
      )
      .withMessage(
        "Password should contain at least one capital, one small character, one digit and one symbol! "
      ),
    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm Password field is required!"),
    body("confirmPassword").custom(async (value) => {
      if (password !== value) {
        throw new Error("Confirm Password should match with Password field!");
      }
    }),
  ];

  return result;
}

module.exports = changePasswordValidation;
