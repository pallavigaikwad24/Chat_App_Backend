const express = require("express");
const route = express.Router();
const logoutController = require("../controllers/logout.js");
const { isUserAuthenticated } = require("../Authentication/passportConfig.js");
const { saveToken, getTokenController } = require("../controllers/firebaseNotificationController.js");

// Logout Route
route.get("/logout", logoutController);

// ------ Save Token Route
route.post("/save-token", isUserAuthenticated, saveToken);

// -------- Get Token Route
route.get("/get-token", isUserAuthenticated, getTokenController);

module.exports = route;
