'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dva = require('dva');

var _dva2 = _interopRequireDefault(_dva);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var global_dva_app = null;

function mva(opts) {
	global_dva_app = (0, _dva2.default)(opts);
	return mva;
}

mva.use = function () {
	var _global_dva_app;

	(_global_dva_app = global_dva_app).use.apply(_global_dva_app, arguments);
	return mva;
};

mva.onError = function () {
	var _global_dva_app2;

	(_global_dva_app2 = global_dva_app).onError.apply(_global_dva_app2, arguments);
	return mva;
};

mva.onAction = function () {
	var _global_dva_app3;

	(_global_dva_app3 = global_dva_app).onAction.apply(_global_dva_app3, arguments);
	return mva;
};

mva.onStateChange = function () {
	var _global_dva_app4;

	(_global_dva_app4 = global_dva_app).onStateChange.apply(_global_dva_app4, arguments);
	return mva;
};

mva.onEffect = function () {
	var _global_dva_app5;

	(_global_dva_app5 = global_dva_app).onEffect.apply(_global_dva_app5, arguments);
	return mva;
};

mva.onHmr = function () {
	var _global_dva_app6;

	(_global_dva_app6 = global_dva_app).onHmr.apply(_global_dva_app6, arguments);
	return mva;
};

mva.model = function () {
	var _global_dva_app7;

	(_global_dva_app7 = global_dva_app).model.apply(_global_dva_app7, arguments);
	return mva;
};

mva.unmodel = function () {
	var _global_dva_app8;

	(_global_dva_app8 = global_dva_app).unmodel.apply(_global_dva_app8, arguments);
	return mva;
};

mva.router = function () {
	var _global_dva_app9;

	(_global_dva_app9 = global_dva_app).router.apply(_global_dva_app9, arguments);
	return mva;
};

// eslint-disable-next-line no-underscore-dangle
mva._get_global_dva_app = function () {
	return global_dva_app;
};

exports.default = mva;