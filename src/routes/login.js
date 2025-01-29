const express = require('express');
const route = express.Router();
const { validUserLogin } = require('../middleware/userValid.js');
const loginController = require('../controllers/loginController.js');
const { isLogin } = require('../Authentication/passportConfig.js');
const loginPassportMiddleware = require('../middleware/loginPassportMiddleware.js');
const validationResultFun = require('../middleware/validationResultFun.js');

route.post('/', validUserLogin(), validationResultFun, loginPassportMiddleware, loginController);

module.exports = route;