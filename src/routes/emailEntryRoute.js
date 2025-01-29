const express = require('express');
const route = express.Router();
const emailController = require("../controllers/emailEntryController.js");
const { validEmail } = require('../middleware/forgetPassValid.js');
const validationResultFun = require('../middleware/validationResultFun.js');

route.post("/", validEmail(), validationResultFun, emailController);

module.exports = route;