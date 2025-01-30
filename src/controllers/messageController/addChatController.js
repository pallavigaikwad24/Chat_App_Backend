const HTTP_CODE = require("../../service/enum");
const { Users, Messages } = require("../../models");
const { where } = require("sequelize");
const getModelInfo = require("../../service/getModelInfo");

const addChatController = async (req, res) => {
    try {
        const { receiver, content, file_type, filename, file_url, file_size } = req.body;

        console.log("Receiver:::", receiver);

        const receiverArgs = {
            modelName: Users,
            methodType: 'findOne',
            args: { where: { username: receiver }, attributes: ['id'], }
        }

        const receiver_id = await getModelInfo(receiverArgs);

        const addChatArgs = {
            modelName: Messages,
            methodType: 'create',
            args: {
                sender_id: req.user.id,
                receiver_id: receiver_id.id,
                content,
                file_type,
                filename,
                file_url,
                file_size,
                profile_img: 'profile-img.jpg'
            }
        }

        const newChat = await getModelInfo(addChatArgs);

        return res.status(HTTP_CODE.OK.code).send(newChat);
    } catch (error) {
        console.log("Error while adding chat:", error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
}

module.exports = addChatController;