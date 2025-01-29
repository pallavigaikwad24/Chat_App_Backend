const { body } = require('express-validator');
const { Users } = require("../models");

function validForgetPassword() {
  let password = null;
  const result = [
    body("password").notEmpty().withMessage("Password field is required!!"),
    body("password").custom(async (value) => {
      if (value.trim().length == 0) {
        throw new Error("Please enter password!");
      }
      password = value;
      console.log("Password: ", password);
      if (value.length < 8) {
        throw new Error("Password should more than 8 characters!");
      }
    }),
    body("password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/
      )
      .withMessage(
        "Password should contain at least one capital, one small character, one digit and one symbol! "
      ),
    body("confirm_password")
      .notEmpty()
      .withMessage("Confirm Password field is required!"),
    body("confirm_password").custom(async (value) => {
      if (password !== value) {
        throw new Error("Confirm Password should match with Password field!");
      }
    }),
  ];

  return result;
}

function validEmail() {
  let password = null;
  const result = [
    body("email").notEmpty().withMessage("Email field is required!!"),
    body("email").custom(async (value) => {
      if (value.trim().length == 0) {
        throw new Error("Please enter password!");
      }
    }),
    body("email")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .withMessage("Please enter valid Email ID!"),
    body("email").custom(async (value) => {
      if (value.trim().length == 0) {
        throw new Error("Please enter Email ID!");
      }

      username = await Users.findOne({ where: { google_gmail_id: value } });
      if (!username) {
        throw new Error("Email ID does not exist!");
      }
    }),
  ];

  return result;
}

module.exports = { validForgetPassword, validEmail };
