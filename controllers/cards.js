const { errorTypes } = require('../utils');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => res.status(errorTypes.OK).send(cards))
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
const createNewCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
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
const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
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
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
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
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .then((card) => res.send({ data: card }))
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
  getCards, createNewCard, deleteCard, likeCard, dislikeCard,
};
