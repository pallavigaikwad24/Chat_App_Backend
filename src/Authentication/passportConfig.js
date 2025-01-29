const { Strategy } = require("passport-local");
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { where, Op } = require("sequelize");
const HTTP_CODE = require("../service/enum");

function initializationPassport(passport) {
  passport.use(
    new Strategy(async (username, password, done) => {
      try {
        const user = await Users.findOne({
          where: {
            [Op.or]: [{ username: username }, { email: username }],
          },
        });

        if (!user)
          return done(null, false, { message: "Incorrect username or email!" });

        const isValidPass = bcrypt.compareSync(
          password,
          user.dataValues.password
        );

        if (!isValidPass)
          return done(null, false, { message: "Incorrect password!" });

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );

  passport.serializeUser(function (user, done) {
    try {
      console.log("THis is done", done, user.id);
      done(null, user.id);
    } catch (error) {
      console.log("Error from serialize", error);
      done(error, null);
    }
  });

  passport.deserializeUser(async function (id, done) {
    try {
      // console.log("Users found:", user);
      const user = await Users.findOne({
        where: { id: Number(id) },
      });
      done(null, user);
    } catch (error) {
      console.error("Error during deserialization:", error);
      done(error, null);
    }
  });
}

const isUserAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(HTTP_CODE.UNAUTHORIZED.code).send(HTTP_CODE.UNAUTHORIZED.message);
};

const isLogin = (req, res, next) => {
  if (req.user) return res.redirect("/home");
  return next();
};

module.exports = { initializationPassport, isUserAuthenticated, isLogin };
