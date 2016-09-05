var _ = require('lodash');

var localEnvVars = {
  TITLE:          'youngStockMoneyApp',
  SAFE_TITLE:     'youngStockMoneyApp',
  TOKEN_SECRET:   'SirPimpsALotBlingBlingSugarDaddyGQBoombasticRomanticWomanLovingMackTasticFantasticLover'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
