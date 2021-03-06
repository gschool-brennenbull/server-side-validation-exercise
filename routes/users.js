'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const ev = require('express-validation');
const validations = require('../validation/users');

router.get('/' , (req, res, next) => {
  knex('users')
    .select( 'id', 'firstname', 'lastname', 'username', 'phone', 'email')
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/', ev(validations.post) ,(req, res, next)=> {
  let firstName = req.body.users.firstName;
  let lastName = req.body.users.lastName;
  let username = req.body.users.username;
  let email = req.body.users.email;
  let phone = req.body.users.phone;
  knex('users')
    .insert({
      firstname: firstName,
      lastname: lastName,
      username: username,
      email: email,
      phone: phone
    })
    .returning(['firstname', 'lastname', 'username','phone','email'])
    .then((results) => {
      console.log(results);
      res.send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
