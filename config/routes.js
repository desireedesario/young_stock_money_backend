var express = require('express');
var router = new express.Router();
// Require user controller.
var usersCtrl = require('../controllers/users');
var portItemsCtrl = require('../controllers/portfolioItems');

// Require token authentication.
var token = require('../config/token_auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Young Stock Money' });
});

//portfolioItems restful paths
router.route('/portfolioitems')
  //GET all portfolio items
  .get(portItemsCtrl.index)
  //POST a portfolio item
  .post(token.authenticate, portItemsCtrl.create);

router.route('/portfolioitems/:id')
  //SHOW one portfolio item
  .get(token.authenticate, portItemsCtrl.show)
  .put(token.authenticate, portItemsCtrl.update)
  .delete(portItemsCtrl.destroy);

// users resource paths:
router.post('/users', usersCtrl.create);
router.get( '/users/me', token.authenticate, usersCtrl.me);

router.post('/token', token.create);

module.exports = router;
