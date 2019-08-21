const jwt = require('jsonwebtoken')

const secrets = require('../config/secrets.js')

module.exports = function restricted(req, res, next) {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if(err){
        // token is invalid
        res.status(401).json({message: 'you shall not pass, invalid token'})
      } else {
        // good token
        req.user = { username: decodedToken.username}
        next();
      }
    })
  } else {
    res.status(400).json({message: 'bad panda. gimme token'})
  }

};