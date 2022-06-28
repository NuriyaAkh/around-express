const fsPromises = require("fs").promises;

const getDataFromFile = (pathToFile) => {
  return (
    fsPromises
      .readFile(pathToFile, { encoding: "utf8" })
      .then((data) => {
        JSON.parse(data);
      })
      // .catch((err) => console.log(err));
      .catch((err) =>
        res
          .status(500)
          .send({ message: `An error has occurred on the server ` })
      )
  );
};
module.exports = { getDataFromFile };
