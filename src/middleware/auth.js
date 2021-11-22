const jwt = require("jsonwebtoken");


const config = process.env;

exports.verifyToken = function (req, res, next) {
  const authorizationHeader = req.headers['authorization'];
  const token = authorizationHeader.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
  }
  else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      console.log(err, data);
      if (err) {
        res.sendStatus(403);
      }
      next();
    })
  }
};



