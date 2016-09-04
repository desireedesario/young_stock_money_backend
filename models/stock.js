var mongoose = require('../config/database')

var stockSchema = mongoose.Schema({
  fullName: String,
  ticker: String,
  currentPrice: Number
});

var Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
