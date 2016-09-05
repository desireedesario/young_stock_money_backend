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
    stock          : 1,
    shares         : 4,
    purchasePrice  : 236.76
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
