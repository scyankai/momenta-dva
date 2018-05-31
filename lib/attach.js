'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mva = require('./mva');

var _mva2 = _interopRequireDefault(_mva);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function modelNotExisted(model) {
	/* eslint-disable */
	var app = _mva2.default._get_global_dva_app();
	return !app._models().some(function (_ref) {
		var namespace = _ref.namespace;

		return namespace === model.namespace.substring(model.namespace.lastIndexOf('/') + 1);
	});
}

function attach() {
	for (var _len = arguments.length, models = Array(_len), _key = 0; _key < _len; _key++) {
		models[_key] = arguments[_key];
	}

	models.filter(modelNotExisted).forEach(function (m) {
		_mva2.default.model(m);
	});
	return function (target) {
		return target;
	};
}

exports.default = attach;