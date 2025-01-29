const { Users, Groups } = require("../models/index.js");
const { body } = require("express-validator");
const { where } = require("sequelize");
const getModelInfo = require("../service/getModelInfo.js");

function receiverChatValidMiddleware() {
    const result = [
        body("receiver").optional()
            .notEmpty()
            .withMessage("Receiver field is required!!")
            .isString().withMessage("Receiver must be string!"),
        body("receiver").optional().custom(async (value, { req }) => {
            if (value) {
                const receiverArgs = {
                    modelName: Users,
                    methodType: 'findOne',
                    args: { attributes: ['id'], where: { username: value } }
                }

                const receiver_id = await getModelInfo(receiverArgs);
                if (!receiver_id) throw new Error("Receiver does not exists!");
            }
        }),
        body("group_id").optional()
            .notEmpty()
            .withMessage("Group ID field is required!!")
            .isNumeric().withMessage("Receiver must be number!"),
        body("group_id").optional().custom(async (value, { req }) => {
            if (value) {
                const receiverArgs = {
                    modelName: Groups,
                    methodType: 'findOne',
                    args: { attributes: ['id'], where: { id: value } }
                }

                const receiver_id = await getModelInfo(receiverArgs);
                if (!receiver_id) throw new Error("Group does not exists!");
            }
        }),

    ];

    return result;
}

module.exports = receiverChatValidMiddleware;
