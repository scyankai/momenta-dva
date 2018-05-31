const mva = require("./libs/mva");
const dynamic = require("dva/dynamic");

module.exports = function(opts) {
  const app = mva._get_global_dva_app();
  const newOpts = Object.assign(opts || {}, { app: app });
  return dynamic(newOpts);
};
