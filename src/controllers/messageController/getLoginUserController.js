const HTTP_CODE = require("../../service/enum");

const getLoginUserController = (req, res) => {
    try {

        return res.status(HTTP_CODE.OK.code).send(req.user);
    } catch (error) {
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
}

module.exports = getLoginUserController;