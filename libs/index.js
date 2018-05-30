'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dvaApp = null;

function dva(app) {
	dvaApp = app;
}

var modelNotExisted = function modelNotExisted(m) {
	return (
		// eslint-disable-next-line
		!dvaApp._models.some(function (_ref) {
			var namespace = _ref.namespace;

			return namespace === m.namespace.substring(m.namespace.lastIndexOf('/') + 1);
		})
	);
};

function model() {
	for (var _len = arguments.length, models = Array(_len), _key = 0; _key < _len; _key++) {
		models[_key] = arguments[_key];
	}

	return function (target) {
		models.filter(modelNotExisted).forEach(function (m) {
			dvaApp.model(m);
		});
		return target;
	};
}

exports.default = { dva: dva, model: model, init: _init2.default };