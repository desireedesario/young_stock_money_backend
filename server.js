var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('./config/database');
var env = require('dotenv').config();
var io = require('socket.io');
var debug = require('debug')('app:http');
var routes = require('./config/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MIDDLEWARE
// CORS (allows a separate client, like Postman, to send requests)…
app.use(allowCors); // See helper at bottom

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//MIDDLEWARE
// Validate content-type.
app.use(validateContentType);

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error-handling layer.
app.use(addFailedAuthHeader);
app.use(function(err, req, res, next) {
  err = (app.get('env') === 'development') ? err : {};

  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//allows things such as postman to send requests. basically allowing request from any domain
function allowCors(req, res, next) {
  res.header('Access-Control-Allow-Origin',  '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  // Handle "preflight" requests.
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
}

//this is figuring out if the content is properly sent. does it have a put, patch, or delete
function validateContentType(req, res, next) {
  var methods = ['PUT', 'PATCH', 'POST'];
  if (                          // If the request is
    methods.indexOf(req.method) !== -1 && // one of PUT, PATCH or POST, and
    Object.keys(req.body).length !== 0 && // has a body that is not empty, and
    !req.is('json')   // does not have an application/json
    ) {   // Content-Type header, then …
    var message = 'Content-Type header must be application/json.';
    res.status(400).json(message);
    } else {
    next();
  }
}

//this sends an error saying that you need to send a auth with a token
function addFailedAuthHeader(err, req, res, next) {
  var header = {'WWW-Authenticate': 'Token'};
  if (err.status === 401) {
    if (err.realm) header['WWW-Authenticate'] += ` realm="${err.realm}"`;
    res.set(header);
  }
  next(err);
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
