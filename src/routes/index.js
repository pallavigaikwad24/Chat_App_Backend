const express = require("express");
const route = express.Router();
const otherRoute = require("../routes/otherRoute");
const login = require("../routes/login");
const register = require("../routes/register");
const messageRoute = require("../routes/messageRoute");
const emailEntryRoute = require("../routes/emailEntryRoute");
const forgetpass = require("../routes/passwordRoute");

route.use("/", otherRoute);
route.use("/login", login);
route.use("/register", register);
route.use("/", messageRoute);
route.use("/email-forgetPass", emailEntryRoute);
route.use("/forgetpassword", forgetpass);


module.exports = route;


