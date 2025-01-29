const path = require("path");
const getModelInfo = require("../../service/getModelInfo.js");
const HTTP_CODE = require("../../service/enum.js");
const { Messages } = require("../../models");
const fs = require("fs");

const getFileArgs = (chatId) => {
    const fileArgs = { modelName: Messages, methodType: "findOne", args: { where: { id: chatId } } };
    return fileArgs;
};

const downloadFile = async (req, res) => {
    try {
        const file = await getModelInfo(getFileArgs(req.params.chat_id));

        const downloadPath = path.join(__dirname, "../../../public/uploads/fileSend", file?.sender_id.toString(), file?.filename);
        if (!fs.existsSync(downloadPath)) {
            return res.status(HTTP_CODE.NOT_FOUND.code).send("File does not exist");
        }
        res.setHeader("Content-Disposition", `attachment; filename="${file.content}"`);
        return res.status(HTTP_CODE.OK.code).sendFile(downloadPath);
    } catch (error) {
        console.log("Error while downloading file", error);
        return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR.code).send(HTTP_CODE.INTERNAL_SERVER_ERROR.message);
    }
};

module.exports = downloadFile;