const express = require("express");

const app = express();
const { PORT = 3000 } = process.env;
const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use("/", userRouter);
app.use("/", cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});