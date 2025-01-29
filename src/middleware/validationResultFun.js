const { validationResult } = require("express-validator");

function validationResultFun(req, res, next) {
    const result = validationResult(req);
    let error = null;
    if (!result.isEmpty()) {
        error = result.array();
        console.log("Errors from validation result::", error)
        return res.status(403).send(error);
    }
    next();
}

module.exports = validationResultFun;
