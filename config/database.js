var mongoose = require('mongoose');

var env = require('./environment');

// Use different database URIs based on whether an env var exists.
var dbUri = process.env.MONGODB_URI ||
            'mongodb://localhost/youngStockMoneyApp';

if (!process.env.MONGODB_URI) {
  // check that MongoD is running...
  require('net').connect(27017, 'localhost').on('error', function() {
    console.log("BOW BEFORE THE MONGOD LORD!");
    process.exit(0);
  });
}

if (!mongoose.connection._hasOpened) {
  mongoose.connect(dbUri);
}

module.exports = mongoose;
