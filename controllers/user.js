// const path = require('path');
// const { getDataFromFile } = require('../helpers/files');
const { errorTypes } = require('../utils');
const User = require('../models/user');
// const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => User.find({})
  .orFail()
  .then((users) => res.status(errorTypes.OK).send(users))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      res
        .status(errorTypes.NOT_FOUND)
        .send({ message: `Requested information not found ${err}` });
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
      res
        .status(errorTypes.BAD_REQUEST)
        .send({ message: `Please make a valid request ${err}` });
    } else {
      res
        .status(errorTypes.SERVER_ERROR)
        .send({ message: `An error has occurred on the server ${err}` });
    }
  });

const getUsersById = (req, res) => User.findById(req.params.id)
  .orFail(() => {
    const error = new Error('No user found with that id');
    error.statusCode = 404;
    throw error;
  })
  .then((user) => res.status(errorTypes.OK).send({ data: user }))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      res
        .status(errorTypes.NOT_FOUND)
        .send({ message: `Requested information not found ${err}` });
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
      res
        .status(errorTypes.BAD_REQUEST)
        .send({ message: `Please make a valid request ${err}` });
    } else {
      res
        .status(errorTypes.SERVER_ERROR)
        .send({ message: `An error has occurred on the server ${err}` });
    }
  });

const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;
  console.log(req.body);
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(errorTypes.NOT_FOUND)
          .send({ message: `Requested information not found ${err}` });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res
          .status(errorTypes.BAD_REQUEST)
          .send({ message: `Please make a valid request ${err}` });
      } else {
        res
          .status(errorTypes.SERVER_ERROR)
          .send({ message: `An error has occurred on the server ${err}` });
      }
    });
};
const updateUserData = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(errorTypes.NOT_FOUND)
          .send({ message: `Requested information not found ${err}` });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res
          .status(errorTypes.BAD_REQUEST)
          .send({ message: `Please make a valid request ${err}` });
      } else {
        res
          .status(errorTypes.SERVER_ERROR)
          .send({ message: `An error has occurred on the server ${err}` });
      }
    });
};
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(errorTypes.NOT_FOUND)
          .send({ message: `Requested information not found ${err}` });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res
          .status(errorTypes.BAD_REQUEST)
          .send({ message: `Please make a valid request ${err}` });
      } else {
        res
          .status(errorTypes.SERVER_ERROR)
          .send({ message: `An error has occurred on the server ${err}` });
      }
    });
};

module.exports = {
  getUsers,
  getUsersById,
  createNewUser,
  updateUserData,
  updateUserAvatar,
};
