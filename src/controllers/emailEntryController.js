const { where } = require("sequelize");
const { Users, PasswordResetToken } = require("../models");
const { sendMail } = require("../email/emailSend");
const { v4: uuidv4 } = require("uuid");
const getModelInfo = require("../service/getModelInfo");
const HTTP_CODE = require("../service/enum");

const emailHtml = (host, token) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        /* Main email container */
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
            color: #444444;
            background-color: #f7f7f7;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        /* Header section */
        .email-header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 1px solid #dddddd;
            margin-bottom: 20px;
        }

        .email-header h1 {
            color: #333333;
        }

        /* Body section */
        .email-body {
            text-align: center;
            padding: 20px;
        }

        .email-body p {
            font-size: 16px;
            line-height: 1.6;
            color: #555555;
        }

        /* Button styling */
        .reset-button {
            display: inline-block;
            margin: 20px auto;
            padding: 12px 25px;
            background-color: #28a745;
            color: #ffffff;
            font-size: 16px;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        .reset-button:hover {
            background-color: #218838;
        }

        /* Footer section */
        .email-footer {
            text-align: center;
            font-size: 14px;
            color: #777777;
            padding: 10px 0;
            border-top: 1px solid #dddddd;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Email Header -->
        <div class="email-header">
            <h1>Password Reset Request</h1>
        </div>

        <!-- Email Body -->
        <div class="email-body">
            <p>Hi there,</p>
            <p>We received a request to reset your password. Click the button below to reset your password:</p>

            <a href="http://${host}/forgetpassword/query?token=${token}" class="reset-button">Reset Your Password</a>

            <p>If you did not request a password reset, please ignore this email or reply to let us know.</p>
        </div>

        <!-- Email Footer -->
        <div class="email-footer">
            <p>Thank you,</p>
            <p>The Team</p>
        </div>
    </div>
</body>
</html>
`;

const emailController = async (req, res) => {
  try {
    const { email } = req.body;
    req.session.email = email;

    const arguments = { modelName: Users, methodType: "findOne", args: { where: { google_gmail_id: email } } };
    const user = await getModelInfo(arguments);
    const token = uuidv4();

    const createArgument = {
      modelName: PasswordResetToken,
      methodType: "create",
      args: { user_id: user.dataValues.id, token: token, expiretoken: Date.now() + 3600000 },
    };

    await getModelInfo(createArgument);
    sendMail(
      email,
      "Welcome to Our App!",
      `Hello ${email},\n\nYour request for forget password is successfully sed! \n\nPlease below link to Update your password.`,
      emailHtml(req.headers.host, token)
    );

    return res.status(HTTP_CODE.OK.code).json({ success: true, email: email });
  } catch (error) {
    console.log("Error while entering email!", error);
    return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
  }
};

module.exports = emailController;
