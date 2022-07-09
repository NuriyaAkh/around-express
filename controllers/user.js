//const path = require('path');
//const { getDataFromFile } = require('../helpers/files');
const { errorTypes } = require("../utils");
const User = require("../models/user");
//const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) =>
  User.find({})
    .then((users) => res.status(errorTypes.OK).send(users))
    .catch((err) =>
      res
        .status(errorTypes.SERVER_ERROR)
        .send({ message: `An error has occurred on the server ${err}` })
    );

const getUsersById = (req, res) =>
  User.findById(req.params.id)
    .then((users) =>
      users.find((user) => user._id.toString() === req.params.id)
    )
    .then((user) => {
      if (!user) {
        res
          .status(errorTypes.NOT_FOUND)
          .send({ message: `No user found with id of ${req.params.id}` });
      } else res.status(errorTypes.OK).send(user);
    })
    .catch((err) =>
      res
        .status(errorTypes.SERVER_ERROR)
        .send({ message: `An error has occurred on the server ${err}` })
    );

const createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res
        .status(errorTypes.SERVER_ERROR)
        .send({ message: `An error has occurred on the server ${err}` })
    );
};


module.exports = { getUsers, getUsersById };
