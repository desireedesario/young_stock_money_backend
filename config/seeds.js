var mongoose = require('./database');

var User = require ('../models/user');

var users = [
  {
    email        : 'email@email.com',
    username     : 'user123',
    name         : 'Fake User',
    password     : 'password',
    cash         : 50000
  }
]

var PortfolioItem = require ('../models/PortfolioItem');

var portfolioItems = [
  {
    stockName: 'Some good shit',
    stockTicker: 'SGH',
    shares: 3,
    purchasePrice: 27.50
  },
  {
    stockName: 'This dank shit',
    stockTicker: 'TDS',
    shares: 2,
    purchasePrice: 304.82
  },
  {
    stockName: 'SUPAH DANK AWESOME',
    stockTicker: 'SDA',
    shares: 5,
    purchasePrice: 274.92
  }
]

var Stock = require ('../models/stock');

var stocks = [
  {
    fullName      : "Activision Blizzard, Inc.",
    ticker        : 'ATVI',
    currentPrice  : 42.81
  }
]

User.remove({}, function  (err){
  if(err) console.log(err);
  User.create(users, function(err, users){
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + users.length + " users.");
    }
  });
});

PortfolioItem.remove({}, function  (err){
  if(err) console.log(err);
  PortfolioItem.create(portfolioItems, function(err, portfolioItems){
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + portfolioItems.length + " portfolio items.");
    }
  });
});

Stock.remove({}, function  (err){
  if(err) console.log(err);
  Stock.create(stocks, function(err, stocks){
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + stocks.length + " stocks.");
    }
    process.exit();
  });
});
