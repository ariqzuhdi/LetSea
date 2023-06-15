const jwt = require("jsonwebtoken");

const jwtMiddleware = (request, response, next) => {
  const token = request.headers["token"];

  if (request.path === "/login") {
    next();
  } else {
    jwt.verify(token, "secretkey", (err, authData) => {
      if (err) {
        response.status(403).json("Forbidden");
      } else {
        next();
      }
    });
  }
};

module.exports = {
  jwtMiddleware,
};
