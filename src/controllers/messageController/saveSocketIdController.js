const { where } = require("sequelize");
const { SocketModels } = require("../../models/index.js");
const getModelInfo = require("../../service/getModelInfo.js");
const HTTP_CODE = require("../../service/enum.js");

const saveSocketIdController = async (req, res) => {
    try {
        const { socketId } = req.body;

        const findOneArgs = { modelName: SocketModels, methodType: "findOne", args: { where: { user_id: req.user.id } } };
        const existedSocketId = await getModelInfo(findOneArgs);

        if (existedSocketId) {
            const socketUpdateArgs = {
                modelName: SocketModels, methodType: "update", args: [{ socket_id: socketId }, { where: { user_id: req.user.id } }],
            };
            await getModelInfo(socketUpdateArgs);
        } else {
            const createArgs = { modelName: SocketModels, methodType: "create", args: { user_id: req.user.id, socketId }, };
            await getModelInfo(createArgs);
        }
        
        return res.status(HTTP_CODE.OK.code).send(HTTP_CODE.OK.message);
    } catch (error) {
        console.log("Error while saving socket id", error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
};


module.exports = saveSocketIdController;