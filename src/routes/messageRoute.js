const express = require("express");
const { getAllUserController, messageConstrollerGet } = require("../controllers/messageController/messageController");
const { isUserAuthenticated } = require("../Authentication/passportConfig");
const firstMsgController = require("../controllers/messageController/firstMsgController");
const sendMessageNotify = require("../controllers/messageController/sendMsgNotification");
const saveSocketIdController = require("../controllers/messageController/saveSocketIdController");
const loaderController = require("../controllers/messageController/loaderController");
const fileInputRouter = require("../controllers/messageController/fileInputController");
const downloadFile = require("../controllers/messageController/downloadFileController");
const route = express.Router();
const uploads = require("../utils/fileUpload");
const addChatController = require("../controllers/messageController/addChatController");
const groupCreateController = require("../controllers/messageController/groupCreateController");
const getGroupInfoController = require("../controllers/messageController/getGroupInfoController");
const groupChatController = require("../controllers/messageController/groupChatController");
const groupChatAddController = require("../controllers/messageController/groupChatAddController");
const getLoginUserController = require("../controllers/messageController/getLoginUserController");
const receiverChatValidMiddleware = require("../middleware/receiverChatValidMiddleware");
const validationResultFun = require("../middleware/validationResultFun");
const replyToChatController = require("../controllers/messageController/replyToChatController");
const messageIdValidation = require("../middleware/messageIdValidation");
const messageReactionsController = require("../controllers/messageController/messageReactionController");
const allReactionController = require("../controllers/messageController/allReactionController");

route.get("/message/allUser", isUserAuthenticated, getAllUserController)
route.get("/message/:chat_username", isUserAuthenticated, messageConstrollerGet);

route.get("/start-conversation", isUserAuthenticated, firstMsgController);

route.post("/save-socket-id", isUserAuthenticated, saveSocketIdController);

route.get("/loading", isUserAuthenticated, loaderController);

route.post("/file-input-message/:id", isUserAuthenticated, uploads.single("fileInput"), fileInputRouter);

route.get("/download-file/:chat_id", isUserAuthenticated, downloadFile);

route.post("/add-chat", isUserAuthenticated, receiverChatValidMiddleware(), validationResultFun, addChatController);

route.post("/reply-chat", isUserAuthenticated, receiverChatValidMiddleware(), validationResultFun, replyToChatController);

route.post("/add-reaction", isUserAuthenticated, messageIdValidation(), validationResultFun, messageReactionsController);

route.get("/all-reactions", isUserAuthenticated, allReactionController);

// Group chat
route.post("/create-group", isUserAuthenticated, groupCreateController);
route.get("/get-groups", isUserAuthenticated, getGroupInfoController);
route.get("/group-chat/:group_id", isUserAuthenticated, groupChatController);
route.post("/add-group-chat", isUserAuthenticated, groupChatAddController);
route.get("/get-login-user", isUserAuthenticated, getLoginUserController)

module.exports = route;