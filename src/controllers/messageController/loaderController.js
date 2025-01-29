const { where, Op } = require("sequelize");
const { Messages } = require("../../models/index.js");
const getModelInfo = require("../../service/getModelInfo.js");
const HTTP_CODE = require("../../service/enum.js");

const loaderController = async (req, res) => {
    try {
        const limit = 10;
        const offSet = parseInt(req.query.offset) || 0;

        const messagesArgs = {
            modelName: Messages,
            methodType: "findAll",
            args: {
                where: {
                    [Op.or]: [{ sender_id: req.user.id, receiver_id: req.query.receiverId },
                    { receiver_id: req.user.id, sender_id: req.query.receiverId }],
                },
                order: [["createdAt", "DESC"]],
                offset: offSet,
                limit,
            },
        };
        const messages = await getModelInfo(messagesArgs);

        return res.status(HTTP_CODE.OK.code).json(messages);
    } catch (error) {
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message)
    }
};

module.exports = loaderController;