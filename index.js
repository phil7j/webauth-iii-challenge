const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


// const db = require('./db/dbConfig.js');
const authRouter = require('./authRoutes/authRouter')
const Users = require('./users/users-model.js');
const restricted = require('./middleware/restricted.js');

const server = express();



server.use(helmet());
server.use(express.json());
server.use(cors());


server.use('/api/restricted', restricted)

server.use('/api/auth', authRouter)




// can only be accessed by clients with valid credentials
server.get('/api/users',  restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.delete('/api/:id', (req,res)=>{
  const id = req.params.id

  Users.remove(id)
    .then(response => {
      res.status(200).json({message: "successfully deleted!"})
    })
    .catch(err => {
      res.status(400).json({message: "can't delete!"})
    })
})

// can only be accessed by clients with valid credentials
server.get('/api/restricted', (req, res) => {
    res.send("It's alive!");
});

const port = process.env.PORT || 5000;
const serverHere = server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));

module.exports = serverHere