// utils/firebaseAdmin.js
var admin = require("firebase-admin");
var serviceAccount = require("../config/clirclify-firebase-adminsdk-mocto-c0c8c6022f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
