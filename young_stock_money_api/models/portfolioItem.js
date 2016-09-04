var mongoose = require('../config/database')

var portfolioItemSchema = mongoose.Schema({
  stock: {type: Number, ref: "Stock"},
  shares: Number,
  purchasePrice: Number
});

var PortfolioItem = mongoose.model('PortfolioItem', portfolioItemSchema);

module.exports = PortfolioItem;
