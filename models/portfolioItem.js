var mongoose = require('../config/database')

var portfolioItemSchema = mongoose.Schema({
  stockName: String,
  stockTicker: String,
  shares: Number,
  purchasePrice: Number
});

var PortfolioItem = mongoose.model('PortfolioItem', portfolioItemSchema);

module.exports = PortfolioItem;
