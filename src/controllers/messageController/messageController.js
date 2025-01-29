const { where, Op } = require("sequelize");
const { Users, Messages, MessageReactions } = require("../../models/index.js");
const getModelInfo = require("../../service/getModelInfo.js");
const HTTP_CODE = require("../../service/enum.js");

const findAllArgs = { modelName: Users, methodType: "findAll", args: { attributes: ['id', 'username', 'profile_img'] } };

const getAllUserController = async (req, res) => {
  try {
    const users = await getModelInfo(findAllArgs);
    return res.status(HTTP_CODE.OK.code).json(users);
  } catch (error) {
    console.log(error);
    return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message)
  }
}

const messageConstrollerGet = async (req, res) => {
  try {
    const findOneArguments = {
      modelName: Users, methodType: "findOne",
      args: {
        attributes: ['id', 'username', 'profile_img'],
        where: { username: req.params.chat_username },
      }
    };
    const receiverUser = await getModelInfo(findOneArguments);

    const findAllArguments = {
      modelName: Messages,
      methodType: "findAll",
      args: {
        where: {
          [Op.or]: [
            { sender_id: req.user.id, receiver_id: receiverUser.id },
            { sender_id: receiverUser.id, receiver_id: req.user.id }
          ]
        },
        include: [{ model: MessageReactions }],
        order: [['createdAt', 'ASC']]
      }
    };

    const allChats = await getModelInfo(findAllArguments);

    return res.status(HTTP_CODE.OK.code).json({ receiverUser, loginUser: req.user, allChats })

  } catch (error) {
    console.log("Error occure while getting messages:", error);
    return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message)
  }
};

module.exports = { getAllUserController, messageConstrollerGet };
