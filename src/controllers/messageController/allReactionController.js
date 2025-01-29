const HTTP_CODE = require("../../service/enum");
const getModelInfo = require("../../service/getModelInfo");
const { EmojiModel } = require("../../models");

const allReactionController = async (req, res) => {
    try {
        const arguments = {
            modelName: EmojiModel,
            methodType: 'findAll',
            args: { attributes: ['id', 'code', 'name'] }
        }
        const newReaction = await getModelInfo(arguments);
        console.log("Reactions:", newReaction);
        return res.status(HTTP_CODE.OK.code).send(newReaction);
    } catch (error) {
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
}

module.exports = allReactionController;