const express = require('express');
const route = express.Router();
const { validUserRegister } = require('../middleware/userValid.js');
const validationResultFun = require('../middleware/validationResultFun.js');
const registerController = require('../controllers/registerController.js');

route.post('/', validUserRegister(), validationResultFun, registerController);

module.exports = route;