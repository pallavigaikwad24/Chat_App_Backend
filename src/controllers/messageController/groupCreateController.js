const HTTP_CODE = require("../../service/enum");
const { Groups } = require("../../models");
const getModelInfo = require("../../service/getModelInfo");

const groupCreateController = async (req, res) => {
    try {
        const { groupName, members } = req.body;

        const argument = {
            modelName: Groups,
            methodType: "create",
            args: {
                group_name: groupName, admin_id: req.user.id,
                user_ids: members, profile_image: 'group_profile.png'
            }
        }

        const newGroup = await getModelInfo(argument);
        console.log("16:", newGroup);
        return res.status(HTTP_CODE.ACCEPTED.code).send(newGroup);
    } catch (error) {
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
}

module.exports = groupCreateController;