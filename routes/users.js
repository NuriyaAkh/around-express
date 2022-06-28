const router = require("express").Router(); 
const { getUsers, getUsersById } = require("../controllers/user");

router.get("/users", getUsers);
router.get("/users/:id", getUsersById);


module.exports = router;
