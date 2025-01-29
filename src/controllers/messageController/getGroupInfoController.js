const HTTP_CODE = require("../../service/enum");
const { Groups, Messages } = require("../../models");
const getModelInfo = require("../../service/getModelInfo");

const getGroupInfoController = async (req, res) => {
    try {

        const argument = {
            modelName: Groups,
            methodType: "findAll",
            args: { include: [{ model: Messages }] }
        }
        const groupInfo = await getModelInfo(argument);

        console.log("Group Info:", groupInfo);
        return res.status(HTTP_CODE.OK.code).send(groupInfo);

    } catch (error) {
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
}

module.exports = getGroupInfoController;