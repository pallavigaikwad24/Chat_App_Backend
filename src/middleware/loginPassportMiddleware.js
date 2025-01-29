const passport = require("passport");

const loginPassportMiddleware = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("5", user);
    if (err) {
      return next(err);
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  })(req, res, next);
};

module.exports = loginPassportMiddleware;
