const router = require('express').Router();
const { getUsers, getUsersById, createNewUser } = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users', createNewUser);

module.exports = router;
