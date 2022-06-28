const path = require("path");
const { getDataFromFile } = require("../helpers/files");
const usersDataPath = path.join(__dirname, "..", "data", "users.json");

const getUsers = (req, res) => {
  return getDataFromFile(usersDataPath)
    .then((users) => res.status(200).send(users))
    .catch((err) =>
      res
        .status(500)
        .send({ message: `"An error has occurred on the server ${err}` })
    );
};
const getUsersById = (req, res) => {
  return getDataFromFile(usersDataPath)
    .then((users) =>
      users.find((user) => user._id.toString() === req.params.id)
    )
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: `No user found with id of ${req.params.id}` });
      } else res.status(200).send(user);
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: `"An error has occurred on the server ${err}` })
    );
};
module.exports = { getUsers, getUsersById };
