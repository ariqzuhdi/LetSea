const jwt = require("jsonwebtoken");

const jwtMiddleware = (request, response, next) => {
    const token = request.headers["token"];
    console.log(request.path);
    if (request.path === '/login' || request.path === '/user') {
        next();
    } else {
        jwt.verify(token, "secretkey", (err, authData) => {
            console.log(err);
            if (err) {
                response.status(403).json('Forbidden');
            } else {
                next();
            }
        })
    }
}

module.exports = {
    jwtMiddleware,
};