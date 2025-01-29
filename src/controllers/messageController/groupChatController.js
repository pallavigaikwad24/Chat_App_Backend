const HTTP_CODE = require("../../service/enum");
const { Groups, Messages, Users, MessageReactions } = require("../../models");
const { where } = require("sequelize");
const getModelInfo = require("../../service/getModelInfo");

const groupChatController = async (req, res) => {
    try {

        const { group_id } = req.params;

        const arguments = {
            modelName: Groups,
            methodType: 'findOne',
            args: {
                where: { id: group_id }, include: [{
                    model: Messages,
                    include: [{ model: MessageReactions }],
                }, { model: Users }],
                order: [['createdAt', 'ASC']]
            }
        }

        const allChat = await getModelInfo(arguments);

        return res.status(HTTP_CODE.OK.code).send(allChat);

    } catch (error) {
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
}

module.exports = groupChatController;