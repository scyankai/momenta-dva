'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var config = {};

var defaultLoadingComponent = function defaultLoadingComponent() {
  return null;
};
var onLoadingFailDefault = function onLoadingFailDefault() {
  return null;
};

var STATE = {
  INITIALIZING: 1,
  SUCCESS: 2,
  FAIL: 3
};

function initializeComponent(key, initializer) {
  var _ref = config[key] || {},
      _ref$loadingComponent = _ref.loadingComponent,
      loadingComponent = _ref$loadingComponent === undefined ? defaultLoadingComponent : _ref$loadingComponent,
      _ref$onLoadingFail = _ref.onLoadingFail,
      onLoadingFail = _ref$onLoadingFail === undefined ? onLoadingFailDefault : _ref$onLoadingFail;

  return function (target) {
    return function (_React$PureComponent) {
      _inherits(_class, _React$PureComponent);

      function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.state = {
          initializationState: STATE.INITIALIZING,
          props: null
        };
        _this.handleSuccess = _this.handleSuccess.bind(_this);
        _this.handleFail = _this.handleFail.bind(_this);
        _this.runInitializer = _this.runInitializer.bind(_this);
        _this.handleInitializerResult = _this.handleInitializerResult.bind(_this);
        return _this;
      }

      _createClass(_class, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.runInitializer();
        }
      }, {
        key: 'handleSuccess',
        value: function handleSuccess(props) {
          this.setState({ initializationState: STATE.SUCCESS, props: props });
        }
      }, {
        key: 'handleFail',
        value: function handleFail(err) {
          this.setState({ initializationState: STATE.FAIL });
        }
      }, {
        key: 'runInitializer',
        value: function runInitializer() {
          if (typeof initializer === 'function') {
            try {
              var result = initializer(this.props);
              this.handleInitializerResult(result);
            } catch (err) {
              this.handleFail(err);
            }
          } else {
            this.handleSuccess();
          }
        }
      }, {
        key: 'handleInitializerResult',
        value: function handleInitializerResult(result) {
          if (result && typeof result.then === 'function') {
            result.then(this.handleInitializerResult, this.handleFail);
          } else if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
            this.handleSuccess(result);
          } else {
            this.handleSuccess();
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var _state = this.state,
              initializationState = _state.initializationState,
              props = _state.props;

          if (initializationState === STATE.SUCCESS) {
            return _react2.default.createElement(target, _extends({}, this.props, props));
          } else if (initializationState === STATE.INITIALIZING) {
            return _react2.default.isValidElement(loadingComponent) ? loadingComponent : _react2.default.createElement(loadingComponent);
          } else {
            return onLoadingFail();
          }
        }
      }]);

      return _class;
    }(_react2.default.PureComponent);
  };
}

var initialize = initializeComponent.bind(null, null);

initialize.configureDefault = function (options) {
  var loadingComponent = options.loadingComponent,
      onLoadingFail = options.onLoadingFail;

  if (loadingComponent) defaultLoadingComponent = loadingComponent;
  if (onLoadingFail) onLoadingFailDefault = onLoadingFail;
};

initialize.configure = function (key, options) {
  if (key == null || typeof key !== 'string') throw Error('key is invalid');
  config[key] = options || {};
};

initialize.of = function (key) {
  return initializeComponent.bind(null, key);
};

exports.default = initialize;