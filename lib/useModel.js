"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mva = require("./mva");

var _mva2 = _interopRequireDefault(_mva);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function useModel() {
  for (
    var _len = arguments.length, models = Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    models[_key] = arguments[_key];
  }

  return function(target) {
    models.forEach(function(m) {
      _mva2.default.model(m);
    });

    return target;
  };
}

exports.default = useModel;
