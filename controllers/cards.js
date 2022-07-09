//const path = require('path');
//const { getDataFromFile } = require('../helpers/files');
const { errorTypes } = require("../utils");
const Card = require("../models/card");
//const cardsDataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(errorTypes.OK).send(cards))
    .catch((err) =>
      res
        .status(errorTypes.SERVER_ERROR)
        .send({ message: `An error has occurred on the server ${err}` })
    );
};
const createNewCard =(req,res) =>{
  const {name, link} = req.body;
  const owner = req.user._id;
  Card.create({name, link,owner})
  .then (card => res.send({data:card}))
  .catch((err) =>
      res
        .status(errorTypes.SERVER_ERROR)
        .send({ message: `An error has occurred on the server ${err}` })
    );
};
const deleteCard = (req,res) =>{
console.log("delete");
 }


module.exports = { getCards, createNewCard,deleteCard };
