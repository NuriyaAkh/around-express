const router = require('express').Router(); // creating a router
const { users } = require('./data/users');

router.get('/users/:id', (req, res) => {
  if (!users[req.params.id]) {
    res.send(`This user doesn't exist`);
    return;
  }



  res.send(`User `);
});

module.exports = router; // exporting the router