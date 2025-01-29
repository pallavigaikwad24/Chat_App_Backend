const HTTP_CODE = require("../../service/enum");
const getModelInfo = require("../../service/getModelInfo");
const { Users, Messages } = require("../../models");
const { where } = require("sequelize");

const replyToChatController = async (req, res) => {
    try {

        const { group_id, reply_to_message_id, receiver, content, file_type, filename, file_url, file_size } = req.body;
        let addChatArgs = null;
        if (receiver) {
            const receiverArgs = {
                modelName: Users,
                methodType: 'findOne',
                args: { attributes: ['id'], where: { username: receiver } }
            }

            const receiver_id = await getModelInfo(receiverArgs);

            addChatArgs = {
                modelName: Messages,
                methodType: 'create',
                args: { reply_to_message_id, sender_id: req.user.id, receiver_id: receiver_id.id, content, file_type, filename, file_url, file_size }
            }
        }
        if (group_id) {

            addChatArgs = {
                modelName: Messages,
                methodType: 'create',
                args: { reply_to_message_id, sender_id: req.user.id, group_id, content, file_type, filename, file_url, file_size }
            }
        }

        const newChat = await getModelInfo(addChatArgs);

        return res.status(HTTP_CODE.ACCEPTED.code).send(newChat);
    } catch (error) {
        console.log("Error while Replying to chat", error);
        return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR.code).send(HTTP_CODE.INTERNAL_SERVER_ERROR.message);
    }
}

module.exports = replyToChatController;