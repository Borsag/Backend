// * create middleware for authentication page using jwt

const jwt = require('jsonwebtoken');

const verifToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(!token) {
    return res.status(403).send({message: 'A token is required for authentication'});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({message: 'Invalid Token'});
  }
  return next();
};

module.exports = verifToken;