const HTTP_CODE = require("../../service/enum");
const { Messages } = require("../../models");
const getModelInfo = require("../../service/getModelInfo");

const groupChatAddController = async (req, res) => {
    try {

        const { group_id, content, file_type, filename, file_url, file_size } = req.body;
        console.log("add group chat:", group_id, content, file_type, filename, file_url, file_size);

        const arguments = {
            methodType: 'create',
            modelName: Messages,
            args: {
                sender_id: req.user.id,
                group_id,
                content,
                file_type, filename, file_url, file_size,
                profile_image: 'group_profile.png'
            }
        }

        const newChat = await getModelInfo(arguments);

        return res.status(HTTP_CODE.OK.code).send(newChat);

    } catch (error) {
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
}

module.exports = groupChatAddController;