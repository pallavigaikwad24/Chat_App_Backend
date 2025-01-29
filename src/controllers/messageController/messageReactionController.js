const HTTP_CODE = require("../../service/enum");
const getModelInfo = require("../../service/getModelInfo");
const { MessageReactions } = require("../../models");
const { where } = require("sequelize");

const messageReactionsController = async (req, res) => {
    try {

        const { message_id, reaction } = req.body;
        const isExistsArgument = {
            modelName: MessageReactions,
            methodType: 'findOne',
            args: { where: { message_id, user_id: req.user.id } }
        }

        const isExist = await getModelInfo(isExistsArgument);

        if (!isExist) {
            const arguments = {
                modelName: MessageReactions,
                methodType: 'create',
                args: { message_id, reaction, user_id: req.user.id }
            }
            const newReaction = await getModelInfo(arguments);
            return res.status(HTTP_CODE.OK.code).send(newReaction);
        } else {
            const arguments = {
                modelName: MessageReactions,
                methodType: 'update',
                args: [{ reaction }, { where: { message_id, reaction, user_id: req.user.id } }]
            }

            const newReaction = await getModelInfo(arguments);
            return res.status(HTTP_CODE.OK.code).send(newReaction);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
}

module.exports = messageReactionsController;