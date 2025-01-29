const path = require("path");
const fs = require("fs");
const HTTP_CODE = require("../../service/enum.js");

const fileInputRouter = (req, res) => {
    try {
        const { file } = req;
        const {id} = req.params;
        if (file) {

            const userDirPath = path.join(__dirname, "../../../public/uploads/fileSend", id.toString());
            // Create the user-specific directory if it doesn't exist
            if (!fs.existsSync(userDirPath))
                fs.mkdirSync(userDirPath, { recursive: true });

            const src = path.join(__dirname, "../../../public/temp/", file.filename);
            const dest = path.join(userDirPath, file.originalname);
            fs.copyFileSync(src, dest);
        }

        return res.status(HTTP_CODE.OK.code).send(HTTP_CODE.OK.message);
    } catch (error) {
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
};

module.exports = fileInputRouter;