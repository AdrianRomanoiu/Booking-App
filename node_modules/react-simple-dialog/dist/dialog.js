'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = function (_Component) {
	_inherits(Dialog, _Component);

	function Dialog(props, context) {
		_classCallCheck(this, Dialog);

		var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props, context));

		_this.state = {
			visible: false,

			config: {
				type: props.type || 'confirm',
				title: 'tip',
				tip: ''
			},

			okfunc: null,
			cancelfunc: null
		};
		return _this;
	}

	_createClass(Dialog, [{
		key: 'show',
		value: function show(_ref) {
			var config = _ref.config,
			    data = _ref.data,
			    okfunc = _ref.okfunc,
			    cancelfunc = _ref.cancelfunc;

			this.setState({
				visible: true,
				config: config,
				okfunc: okfunc,
				cancelfunc: cancelfunc
			});
		}
	}, {
		key: 'hide',
		value: function hide(data) {
			this.setState({
				visible: false
			});
		}
	}, {
		key: 'okfunc',
		value: function okfunc() {
			if (this.state.okfunc) {
				this.state.okfunc.apply(this);
			}
			this.hide();
		}
	}, {
		key: 'cancelfunc',
		value: function cancelfunc() {
			if (this.state.cancelfunc) {
				this.state.cancelfunc.apply(this);
			}
			this.hide();
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				this.state.visible && _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement('div', { className: _index2.default.mask }),
					_react2.default.createElement(
						'div',
						{ className: _index2.default.dialog },
						_react2.default.createElement(
							'div',
							{ className: _index2.default.header },
							_react2.default.createElement(
								'span',
								{ className: _index2.default.title },
								this.state.config.title
							),
							' ',
							_react2.default.createElement(
								'span',
								{ onClick: this.cancelfunc.bind(this), className: _index2.default.close },
								'x'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: _index2.default.content },
							this.state.config.tip,
							(!this.state.config.type || this.state.config.type == 'confirm') && _react2.default.createElement(
								'div',
								{ className: _index2.default.buttonarea },
								_react2.default.createElement(
									'button',
									{ type: 'button', onClick: this.okfunc.bind(this, this.state.data), className: _index2.default.btn + ' ' + _index2.default.btnprimary, style: { marginRight: '5px' } },
									'\u786E\u5B9A'
								),
								_react2.default.createElement(
									'button',
									{ type: 'button', onClick: this.cancelfunc.bind(this), className: _index2.default.btn },
									'\u53D6\u6D88'
								)
							),
							this.state.config.type == 'error' && _react2.default.createElement(
								'div',
								{ className: _index2.default.buttonarea },
								_react2.default.createElement(
									'button',
									{ type: 'button', onClick: this.okfunc.bind(this, this.state.data), className: _index2.default.btn + ' ' + _index2.default.btnprimary, style: { marginRight: '5px' } },
									'\u786E\u5B9A'
								)
							),
							this.state.config.type == 'success' && _react2.default.createElement(
								'div',
								{ className: _index2.default.buttonarea },
								_react2.default.createElement(
									'button',
									{ type: 'button', onClick: this.okfunc.bind(this, this.state.data), className: _index2.default.btn + ' ' + _index2.default.btnprimary, style: { marginRight: '5px' } },
									'\u786E\u5B9A'
								)
							)
						)
					)
				)
			);
		}
	}]);

	return Dialog;
}(_react.Component);

exports.default = Dialog;
