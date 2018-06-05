module.exports = require("./lib/mva");
module.exports.connect = require("dva").connect;
module.exports.initialize = require("./lib/initialize").default;
module.exports.useModel = require("./lib/useModel").default;
module.exports.dispatch = require("./lib/dispatch").default;
