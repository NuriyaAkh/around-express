const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {errorTypes} = require ('./utils');

app.use('/', userRouter);
app.use('/', cardsRouter);
app.use((req, res) => {
  res.status(errorTypes.NOT_FOUND).send({ message: 'The requested resource was not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
