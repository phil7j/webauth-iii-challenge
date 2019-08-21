const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js')

// Enpoints beginning with /api/auth
router.post('/register', (req, res) => {
    let user = req.body;

    // hash password
    const hash = bcrypt.hashSync(user.password);
    user.password = hash;

    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);

          res.status(200).json({ message: `Welcome ${user.username}!`, token });
        } else {
          res.status(401).json({ message: 'Invalid Credentials, you shall not pass!' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      // ...other data
    }
    const options = {
      expiresIn: '8h'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
  }

  module.exports = router;