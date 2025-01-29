const HTTP_CODE = require("../service/enum");

const loginController = async (req, res) => {
  try {
    return res.status(HTTP_CODE.OK.code).send(HTTP_CODE.OK.message);
  } catch (error) {
    console.log("Error while login!", error);
    return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message)
  }
};

module.exports = loginController;
