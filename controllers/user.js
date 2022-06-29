const path = require('path');
const { getDataFromFile } = require('../helpers/files');
const { errorTypes } = require('../utils');

const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) =>
  getDataFromFile(usersDataPath)
    .then((users) => res.status(errorTypes.OK).send(users))
    .catch((err) =>
      res
        .status(errorTypes.SERVER_ERROR)
        .send({ message: `An error has occurred on the server ${err}` })
    );

const getUsersById = (req, res) =>
  getDataFromFile(usersDataPath)
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

module.exports = { getUsers, getUsersById };
