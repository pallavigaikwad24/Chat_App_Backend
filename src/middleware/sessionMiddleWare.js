const { validateToken } = require("../services-JWT/auth");


const sessionMiddle =  (req, res, next) =>{
    // if(!req.session.userlogin) {
    //     res.redirect('/login');
    // } else {
    //     next();
    // }

    // if(req.cookies.uid == undefined) {
    //     return res.redirect('/login');
    // } 

    // Using JWT Token
    if (!req.cookies || !req.cookies.uid) {
        console.log(req.cookies.uid);
        return res.redirect('/login');
    }

    const token = req.cookies.uid;

    const payload = validateToken(token);

    console.log("Payload",payload);

    // if(payload.username == req.body.username) {
    //     return next();
    // } else {
    //     return res.redirect('/login');
    // }

    next();

}

module.exports = sessionMiddle;