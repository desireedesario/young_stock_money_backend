var PortfolioItem = require('../models/portfolioItem');
var User = require('../models/user');

//GET all PortfolioItems
function index(req, res){
  PortfolioItem.find({},
    function(err, portfolioitems) {
      if (err) res.json({msg: "Cannot find any of your stock items"});

      res.json({portfolioitems: portfolioitems});
    });
}

//create a new PortfolioItem
function create(req, res) {
  var portfolioItem = new PortfolioItem(req.body);
  var totalPrice = portfolioItem.shares * portfolioItem.purchasePrice;
  console.log('hi')
  User.findById(req.decoded._id, function(err, user) {
    console.log('finding user')
    if(totalPrice <= user.cash) {
      portfolioItem.save(function(err, savedPortItem) {
        user.portfolio.push(savedPortItem._id);
        user.cash = user.cash - totalPrice;
        user.save(function(err, user) {
          res.json(savedPortItem);
        })
      })
    } else {
      res.json({message: "Go rob a bank first"})
    }
  })
}

//SHOW a new portfolio item
function show(req, res) {
  var id = req.params.id;

  PortfolioItem.findById({_id: id},
  function(err, portfolioItem) {
    if(err) res.json({msg: "Cannot show this portfolio item, because" + err});

    res.json({portfolioItem: portfolioItem});
  });
}

//update a portfolio item
var update = function(req, res) {
  var id = req.params.id;

  PortfolioItem.findById(id, function(err, portfolioItem){
    portfolioItem.shares = portfolioItem.shares - req.body.sharesSold;
    portfolioItem.save(function(err, updatedPortfolioItem) {
      if (err) {
        console.log("cannot do this b/c" + err)
      } else {
        User.findById(req.decoded._id, function(err, user) {
          if (err){
            console.log(err)
          } else {
            var cashMoney = req.body.currentPrice * req.body.sharesSold;
            user.cash = user.cash + cashMoney;
            user.save(function(err, updatedUser){
              if (err) {
                console.log(err)
              } else {
                updatedUser.populate('portfolio', function(err, populatedUser) {
                  res.json(populatedUser)
                })

              }
            })
          }
        })
      }
    })
  })
}

  // User.findById(req.decoded._id, function(err, user) {
  //   PortfolioItem.findById(id, function(err, portfolioItem) {
  //     var sellPrice = portfolioItem.shares * portfolioItem.purchasePrice;
  //     //set only shares
  //     //req.body.shares are the shares you are selling
  //     if (req.body.shares) req.body.shares = portfolioItem.shares - req.body.shares;
  //     user.cash = user.cash + sellPrice;
  //     //save the new information
  //     user.save(function(err, user) {
  //       res.json(user);
  //     })
  //     portfolioItem.save( function(err, updatedPortfolioItem) {
  //       if (err) {
  //         res.send(err);
  //       }
  //       //log message
  //       console.log("stock price updated");
  //       //return new stock
  //       res.json(updatedPortfolioItem)
  //     });
  //   });
  // });





//DELETE (sell) a stock
var destroy = function(req, res) {
    var id = req.params.id;
  PortfolioItem.remove({'_id': id}, function(err) {
    if (err) {
      res.send(err);
    }
    res.json({msg: 'stocks have been sold'});
  });
}


module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy
}
