const { where } = require("sequelize");
const { Users, NotificationToken, Notification } = require("../../models/index.js");
const getModelInfo = require("../../service/getModelInfo.js");
const HTTP_CODE = require("../../service/enum.js");
const getAdminCall = require("../../service/adminNotification.js");

const sendMessageNotify = async (req, res) => {
    try {
        const { senderId, receiverId, msg } = req.body;
        const senderArgs = { modelName: Users, methodType: "findOne", args: { where: { id: senderId } } };
        const sender = await getModelInfo(senderArgs);
        const tokenArgs = { modelName: NotificationToken, methodType: "findOne", args: { where: { user_id: receiverId } } };
        const token = await getModelInfo(tokenArgs);

        if (token) {
            const message = { notification: { title: `${sender.username} sends you a message!`, body: "View account!!", }, token: token.token };

            // Admin function call for push notification
            await getAdminCall(message);
        }

        //   Normal Notification
        const newNotifyArgs = {
            modelName: Notification, methodType: "create",
            args: { sender_id: senderId, receiver_id: receiverId, type: "message", message: msg, post_id: null }
        };

        await getModelInfo(newNotifyArgs);
        res.status(HTTP_CODE.OK.code).send(HTTP_CODE.OK.message);
    } catch (error) {
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
};

module.exports = sendMessageNotify;