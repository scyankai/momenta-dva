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

var LoadingComponent = function LoadingComponent() {
	return null;
};

function initialize(initializer) {
	return function (target) {
		return function (_React$PureComponent) {
			_inherits(_class, _React$PureComponent);

			function _class(props) {
				_classCallCheck(this, _class);

				var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

				_this.state = {
					initial: false,
					props: null
				};
				_this.init = _this.init.bind(_this);
				_this.executeInitializer = _this.executeInitializer.bind(_this);
				_this.handleInitializerResult = _this.handleInitializerResult.bind(_this);
				return _this;
			}

			_createClass(_class, [{
				key: 'componentWillMount',
				value: function componentWillMount() {
					this.executeInitializer();
				}
			}, {
				key: 'init',
				value: function init(props) {
					this.setState({ initial: true, props: props });
				}
			}, {
				key: 'executeInitializer',
				value: function executeInitializer() {
					if (typeof initializer === 'function') {
						var result = initializer(this.props);
						this.handleInitializerResult(result);
					} else {
						this.init();
					}
				}
			}, {
				key: 'handleInitializerResult',
				value: function handleInitializerResult(result) {
					if (result && result.then) {
						result.then(this.handleInitializerResult);
					} else if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
						this.init(result);
					} else {
						this.init();
					}
				}
			}, {
				key: 'render',
				value: function render() {
					var _state = this.state,
					    initial = _state.initial,
					    props = _state.props;

					if (initial) {
						return _react2.default.createElement(target, _extends({}, this.props, props));
					} else {
						return _react2.default.createElement(LoadingComponent, { style: { margin: 200 } });
					}
				}
			}]);

			return _class;
		}(_react2.default.PureComponent);
	};
}

initialize.setDefaultLoadingComponent = function (component) {
	LoadingComponent = component;
};

exports.default = initialize;

/**
 * 
 
 @initialize(props => {
	const { match } = props
	return {
		imei: match.params.imei,
	}
})
@initialize(() => {
	return new Promise(resolve => {
		setTimeout(resolve, 2000)
	})
})

*/