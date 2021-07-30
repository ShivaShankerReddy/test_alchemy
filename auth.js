const jwt = require('jsonwebtoken');

const TOKEN_KEY = process.env;

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ msg: 'Authorization is required to view this page' });
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).send({ msg: 'Invalid Token' });
  }
};

module.exports = verifyToken;
