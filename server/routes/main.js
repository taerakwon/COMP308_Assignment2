/*
  File name: index.js
  Author's name: Taera Kwon
  StudentID: 300755802
  Web App name: comp308_authentication
*/

// Modules required for routing
var express = require('express');
var router = express.Router();

// Modules required for MongoDB
let mongoose = require('mongoose');

// defining the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User Model - User object

// define the contacts model
let book = require('../models/contacts');

// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    // If user is not logged in
    return res.redirect('/login');
  }
  next();
}

/* GET home page. */
router.get('/', requireAuth, (req, res, next) => {
  res.render('index', { 
    title: 'Home',
    userName: req.user.userName
  });
});

/* GET home page. */
router.get('/about', requireAuth, (req, res, next) => {
  res.render('index', { title: 'Home' });
});

/* GET home page. */
router.get('/', requireAuth, (req, res, next) =>{
  res.render('index', { title: 'Home' });
});

/* GET home page. */
router.get('/', requireAuth, (req, res, next) => {
  res.render('index', { title: 'Home' });
});

module.exports = router;
