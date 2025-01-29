const jwt = require('jsonwebtoken');

async function generateToken(user) {
    //  JWT Token
    const secret_jwt = process.env.JWT_SECRET_KEY;

    return jwt.sign(user, secret_jwt);
}

function validateToken(token) {
   if(!token) return null;
   return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = {
    generateToken,
    validateToken
}