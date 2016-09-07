var PortfolioItem = require('../models/portfolioItem');

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
  var portfolioItem = new PortfolioItem;
  portfolioItem.stockName = req.body.stockName;
  portfolioItem.stockTicker = req.body.stockTicker;
  portfolioItem.shares = req.body.shares;
  portfolioItem.purchasePrice = req.body.purchasePrice;

  portfolioItem.save(function(err) {
    if(err) res.json({msg: "You failed at making a portfolio item because" + err});

    res.json(portfolioItem);
  });
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

  PortfolioItem.findById(id, function(err, portfolioItem) {
    if (err) {
      res.send(err)
    }

    //set only shares
    if (req.body.shares) portfolioItem.shares = req.body.shares;

    //save the nw information
    portfolioItem.save( function(err, updatedPortfolioItem) {
      if (err) {
        res.send(err);
      }
      //log message
      console.log("stock price updated");
      //return new stock
      res.json(updatedPortfolioItem)
    });
  });
}

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
