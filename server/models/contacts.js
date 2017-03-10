/*
  File name: contacts.js
  Author's name: Taera Kwon
  StudentID: 300755802
  Web App name: comp308_authentication
*/

let mongoose = require('mongoose');

// create a model class
let contactsSchema = mongoose.Schema({
    Name: String,
    Number: String,
    Email: String,
},
{
  collection: "contacts"
});

module.exports = mongoose.model('contacts', booksSchema);
