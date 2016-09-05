var express = require('express');
var router = new express.Router();
// Require user controller.
var usersCtrl = require('../controllers/users');

// Require token authentication.
var token = require('../config/token_auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Young Stock Money' });
});


// users resource paths:
router.post('/users', usersCtrl.create);
router.get( '/users/me', token.authenticate, usersCtrl.me);

router.post('/token', token.create);

module.exports = router;
