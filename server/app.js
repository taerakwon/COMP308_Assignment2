/*
  File name: app.js
  Author's name: Taera Kwon
  StudentID: 300755802
  Web App name: comp308_authentication
*/

// MODULES REQUIRED FOR THE PROJECT
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

// MONGOOSE FOR DB ACCESS
let mongoose = require('mongoose');
// MONGODB URI
let config = require('./config/db');

// MONGO DB CONNECTION (DEFINING DB)
mongoose.connect(process.env.URI || config.URI);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error:'));
db.once('open', () => {
  console.log("Successfully connected to MongoDB");
})

// DEFINE ROUTES
let index = require('./routes/index');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
