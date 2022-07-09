const router = require('express').Router();
const { getCards, createNewCard, deleteCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createNewCard);
router.delete('/cards/:cardId', deleteCard);

module.exports = router;
