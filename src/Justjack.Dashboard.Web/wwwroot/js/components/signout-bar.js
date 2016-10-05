'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignoutBar = function (_React$Component) {
    _inherits(SignoutBar, _React$Component);

    function SignoutBar(props) {
        _classCallCheck(this, SignoutBar);

        var _this = _possibleConstructorReturn(this, (SignoutBar.__proto__ || Object.getPrototypeOf(SignoutBar)).call(this, props));

        _this.state = { msg: '' };

        //binding
        _this.signout = _this.signout.bind(_this);
        return _this;
    }

    _createClass(SignoutBar, [{
        key: 'signout',
        value: function signout() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.setState({ msg: '' });
                $.post("/home/signout", function (result) {
                    if (result.succeeded) {
                        //redirect to
                        window.location.href = result.data;
                    }
                }.bind(_this2)).fail(function (result) {
                    this.setState({ msg: 'Signout failed.' });
                    reject();
                }.bind(_this2));
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'text-center' },
                React.createElement(
                    'div',
                    { className: 'danger' },
                    this.state.msg
                ),
                React.createElement(AsyncButton, { className: 'btn btn-default btn-flat', onClick: this.signout, text: 'Sign Out' })
            );
        }
    }]);

    return SignoutBar;
}(React.Component);