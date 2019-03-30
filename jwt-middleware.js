const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are converted to lowercase
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    res.json('Token not supplied');
  }

  // Check if token is valid
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      res.json('Token not valid');
    }

    req.decoded = decoded;
    next();
  });
};

module.exports = checkToken;
