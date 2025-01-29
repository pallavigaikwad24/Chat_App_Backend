const { Messages } = require("../models/index.js");
const { body } = require("express-validator");
const { where } = require("sequelize");
const getModelInfo = require("../service/getModelInfo.js");

function messageIdValidation() {
    const result = [
        body("message_id")
            .notEmpty()
            .withMessage("Receiver field is required!!")
            .isNumeric().withMessage("Message id must be integer!"),
        body("message_id").custom(async (value, { req }) => {
            console.log("Message 11:", value);

            const receiverArgs = {
                modelName: Messages,
                methodType: 'findOne',
                args: { attributes: ['id'], where: { id: value } }
            }

            const message_id = await getModelInfo(receiverArgs);
            if (!message_id) throw new Error("Message does not exists!");
        }),

    ];

    return result;
}

module.exports = messageIdValidation;
