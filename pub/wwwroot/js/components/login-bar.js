'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginBar = function (_React$Component) {
    _inherits(LoginBar, _React$Component);

    function LoginBar(props) {
        _classCallCheck(this, LoginBar);

        var _this = _possibleConstructorReturn(this, (LoginBar.__proto__ || Object.getPrototypeOf(LoginBar)).call(this, props));

        _this.state = { msg: '', isErrorMsg: false };
        return _this;
    }

    _createClass(LoginBar, [{
        key: 'login',
        value: function login() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.setState({ msg: '' });
                var loginVM = { username: _this2.props.username.val(), password: _this2.props.password.val() };
                $.post("/home/login", loginVM, function (result) {
                    if (result.succeeded) {
                        //redirect to
                        this.setState({ msg: 'Login succeeded, redirect ...', isErrorMsg: false });
                        window.location.href = "/";
                    } else {
                        //failed
                        this.setState({ msg: result.message, isErrorMsg: true });
                        reject();
                    }
                }.bind(_this2)).fail(function (result) {
                    this.setState({ msg: 'Login failed, try again.', isErrorMsg: true });
                    reject();
                }.bind(_this2));
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-8' },
                    React.createElement(
                        'span',
                        { className: this.state.isErrorMsg ? 'text-danger' : 'text-success' },
                        this.state.msg
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-xs-4' },
                    React.createElement(AsyncButton, { className: 'btn btn-primary btn-block btn-flat', text: 'Sign In', onClick: this.login.bind(this) })
                )
            );
        }
    }]);

    return LoginBar;
}(React.Component);