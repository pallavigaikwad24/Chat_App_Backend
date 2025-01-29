const { where } = require("sequelize");
const { NotificationToken, Notification, Users } = require("../models/index.js");
const getAdminCall = require("../service/adminNotification.js");

const sendMessageNotification = async (receiverId, senderId, msg) => {

  // Firebase notification
  const sender = await Users.findOne({ where: { id: senderId } });

  const token = await NotificationToken.findOne({ where: { user_id: receiverId } });

  if (token) {
    const message = { notification: { title: `${sender.username} sends you a message!`, body: "View account!!" }, token: token.token };
    // Admin function call
    await getAdminCall(message);
  }

  //   Normal Notification
  await Notification.create({ sender_id: senderId, receiver_id: receiverId, type: "message", message: msg, post_id: null });
}

module.exports = sendMessageNotification;