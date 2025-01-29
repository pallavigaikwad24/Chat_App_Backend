const { where } = require("sequelize");
const { Messages, Users } = require("../../models/index.js");
const getModelInfo = require("../../service/getModelInfo.js");
const HTTP_CODE = require("../../service/enum.js");

const findAllArgs = { modelName: Users, methodType: "findAll", args: { attributes: ['id', 'username', 'profile_img'] } };

const firstMsgController = async (req, res) => {
    try {
        const users = await getModelInfo(findAllArgs);

        const allMsgFindAllArgs = { modelName: Messages, methodType: "findAll", args: { where: { receiver_id: req.user.id } } };
        const currLoginAllMsg = await getModelInfo(allMsgFindAllArgs);
        let allSender_id = currLoginAllMsg.map((msg) => msg.sender_id);

        return res.status(HTTP_CODE.OK.code).json({ users: users, loginUser: req.user, allSender_id })
    } catch (error) {
        console.log("Error while geeting messages:", error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
};

module.exports = firstMsgController;