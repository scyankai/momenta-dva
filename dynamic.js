const mva = require('./lib/mva').default
const dynamic = require('dva/dynamic').default

function mdynamic(opts) {
  const app = mva._get_global_dva_app()
  const newOpts = Object.assign(opts || {}, { app: app })
  return dynamic(newOpts)
}

mdynamic.setDefaultLoadingComponent = dynamic.setDefaultLoadingComponent

module.exports = mdynamic
