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


// module required for authentication
let passport = require('passport');

// defining the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User Model - User object

// define the contacts model
let contacts = require('../models/contacts');

// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    // If user is not logged in
    return res.redirect('/login');
  }
  next();
}

/* GET Business Contacts page. READ */
router.get('/', (req, res, next) => {
  // find all contacts in contacts collection
  contacts.find( (err, contacts) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('businessContact/index', {
        title: 'Business Contacts',
        contact: contacts,
        userName: req.user ? req.user.username: ''
      });
    }
  });
});

//  GET the Business Contact Details page in order to add a new Contact
router.get('/add', requireAuth, (req, res, next) => {
  // Render businessContact/details when Add a business contact button is clicked
  res.render('businessContact/details', {
    title: 'Add a new contact',
    contact: contacts,
    userName: req.user.username
  });
});

// POST process the Business Contact Details page and create a new Contact - CREATE
router.post('/add', requireAuth, (req, res, next) => {
  contacts.create({
    "Name": req.body.name,
    "Number": req.body.number,
    "Email": req.body.email,
  }, (err, contacts) => {
    // If there is error, respond with error message
    if (err){
      console.log(err);
      res.end(err);}
      else{
        // If there is no error, redirect to /businessContact
        res.redirect('/businessContact');
      }
    }
  );
});

// GET the Business Contact Details page in order to edit an existing
router.get('/:id', requireAuth, (req, res, next) => {
  // Try to prevent server from failing
  try {
    let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
    // Find by ID
    contacts.findById(id, (err, contacts) => {
      // If there is an error
      if (err) {
        // Return error
        return console.error(err);
        res.end(error);
      } else {
        // If no error occurred, render businessContact/details with contacts attributes pulled from database
        res.render('businessContact/details', {
          title: 'Edit business contact details',
          contact: contacts,
          userName: req.user.username
        });
      }    
    });
  } catch (err){
    // If error when trying to get a contact by id, log
    console.log(err);
  }
});

// POST - process the information passed from the details form and update the document
router.post('/:id', requireAuth, (req, res, next) => {
  // Set id as id from request
  let id = req.params.id;
  // Set updated contact as contact (model)
  let updatedContact = contacts({
    "_id": id,
    "Name": req.body.name,
    "Number": req.body.number,
    "Email": req.body.email
  });
  // Execute update function
  contacts.update({_id:id}, updatedContact, (err) => {
    // If there was an error
    if (err){
      console.log(err);
      res.end(err);
    } else {
      // If error does not exist
      res.redirect('/businessContact');
    }
  })
});

// GET - process the delete by _id
router.get('/delete/:id', requireAuth, (req, res, next) => {
  // Set id as id from request
  let id = req.params.id;
  contacts.remove({_id: id}, (err)=>{
    // If error during executing remove function
    if(err){
      console.log(err);
      res.end(err);
    } else{
      // If there was no error, redirect to /businessContact
      res.redirect('/businessContact');
    }
  });
});

module.exports = router;
