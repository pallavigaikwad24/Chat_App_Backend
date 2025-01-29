const { isUserAuthenticated } = require("../Authentication/passportConfig");
const express = require("express");
const changePasswordController = require("../controllers/changePasswordController");
const changePasswordValidation = require("../middleware/changePasswordMiddleware");
const validationResultFun = require("../middleware/validationResultFun");
const { validForgetPassword } = require("../middleware/forgetPassValid");
const forgetPass = require("../controllers/forgetPasswordController");
const { validSetPassword } = require("../middleware/userValid");
const setPassController = require("../controllers/setPasswordController");
const route = express.Router();

route.post("/", isUserAuthenticated, changePasswordValidation(), validationResultFun, changePasswordController);

// Forget password route

route.post("/:token", validForgetPassword(), validationResultFun, forgetPass);
route.post("/set-password", isUserAuthenticated, validSetPassword(), validationResultFun, setPassController);


module.exports = route;
