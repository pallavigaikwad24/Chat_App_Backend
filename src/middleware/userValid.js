const bcrypt = require("bcryptjs");
const { Users } = require("../models/index.js");
const { body } = require("express-validator");
const getModelInfo = require("../service/getModelInfo.js");
const { Op } = require("sequelize");

const commonArgument = (value) => {
  const CommonArgument = {
    modelName: Users,
    args: {
      where: { [Op.or]: [{ username: value }, { email: value }] },
    },
    methodType: "findOne",
  };
  return CommonArgument;
};

// ---------- Login validation ------ḍ------

function validUserLogin() {
  let username = null;
  const result = [
    body("username").notEmpty().withMessage("Username is required!"),
    body("username").custom(async (value) => {
      if (value.trim().length == 0) {
        throw new Error("Please enter username!");
      }

      username = await getModelInfo(commonArgument(value));

      if (!username) {
        throw new Error("Username does not exist!! Please register first.");
      }
    }),
    body("password").notEmpty().withMessage("Password field is required!!"),
    body("password").custom(async (value) => {
      if (value.trim().length == 0) {
        throw new Error("Please enter password!");
      }

      isValidPass = bcrypt.compareSync(value, username.password);
      if (!isValidPass) {
        throw new Error("Password is incorrect!!");
      }
    }),
  ];

  return result;
}

// // ---------- Register validation ----------

function validUserRegister() {
  const result = [
    body("username").notEmpty().withMessage("Username is required!"),
    body("username").custom(async (value) => {
      if (value.trim().length == 0) {
        throw new Error("Please enter username!");
      }
      const username = await getModelInfo(commonArgument("username", value));
      if (username) {
        throw new Error("Users already exist!! Please login in.");
      }
    }),
    body("email").notEmpty().withMessage("Email is required!"),
    body("email")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .withMessage("Please enter valid Email ID!"),
    body("email").custom(async (value) => {
      if (value.trim().length == 0) {
        throw new Error("Please enter Email ID!");
      }
      const email = await getModelInfo(commonArgument(value));
      if (email) {
        throw new Error("Email ID already exist!! Please login in.");
      }
    }),
    body("password").notEmpty().withMessage("Password field is required!!"),
    body("password").custom(async (value) => {
      if (value.trim().length == 0) {
        throw new Error("Please enter password!");
      }

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
    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm Password field is required!"),
    body("confirmPassword").custom(async (value, { req }) => {
      if (req.body.password !== value) {
        throw new Error("Confirm Password should match with Password field!");
      }
    }),
  ];
  return result;
}

// ------------ Set Password Validation -----------

function validSetPassword() {
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

module.exports = { validUserLogin, validUserRegister, validSetPassword };
