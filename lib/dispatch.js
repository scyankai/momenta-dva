'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mva = require('./mva');

var _mva2 = _interopRequireDefault(_mva);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _mva2.default._get_global_dva_app();

exports.default = function (action) {
	app._store.dispatch(action);
};