/*
  File name: users.js
  Author's name: Taera Kwon
  StudentID: 300755802
  Web App name: comp308_authentication
*/

// require modules for our User Model
let mongoose = require('mongoose');
let Schema = mongoose.Schema; //alias for mongoose Schema
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new Schema({
  username: {
    type: String,
    default: '',
    trim: true,
    required: 'Username is required'
  },
  email: {
    type: String,
    default: '',
    trim: true,
    required: 'Email is required'
  },
  created: {
    type: Date,
    default: Date.now
  }
},{
  collection: "users"
});

let options = ({missingPasswordError: "Wrong Password"});

UserSchema.plugin(passportLocalMongoose, options);

exports.User = mongoose.model('users', UserSchema);