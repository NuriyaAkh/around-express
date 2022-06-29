const path = require('path');
const { getDataFromFile } = require('../helpers/files');
const { errorTypes } = require('../utils');

const cardsDataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) =>
  getDataFromFile(cardsDataPath)
    .then((cards) => res.status(errorTypes.OK).send(cards))
    .catch((err) =>
      res
        .status(errorTypes.SERVER_ERROR)
        .send({ message: `An error has occurred on the server ${err}` })
    );

module.exports = { getCards };
