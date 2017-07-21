'use strict';

const express = require('express');
const app = express();
var ev = require('express-validation');

const bodyParser = require('body-parser');

app.use(express.static('./public'));

app.use(bodyParser.json());

const users = require('./routes/users');

app.use('/users', users);

// app.use(function (err, req, res, next) {
//   console.log('in errror');
//   if (err instanceof ev.ValidationError) return res.status(err.status).json(err);
// });
app.use((err, _req, res, _next) => {
  if (err.status) {
    console.log(err.message);
    return res.status(err.status).send(err);
  }

  console.error(err);
  res.sendStatus(500);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
