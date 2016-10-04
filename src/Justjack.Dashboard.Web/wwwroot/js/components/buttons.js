"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncButton = function (_React$Component) {
    _inherits(AsyncButton, _React$Component);

    function AsyncButton(props) {
        _classCallCheck(this, AsyncButton);

        var _this = _possibleConstructorReturn(this, (AsyncButton.__proto__ || Object.getPrototypeOf(AsyncButton)).call(this, props));

        _this.state = { isPending: false };
        return _this;
    }

    _createClass(AsyncButton, [{
        key: "handleClick",
        value: function handleClick() {
            var _props,
                _this2 = this;

            this.setState({ isPending: true });

            var promise = (_props = this.props).onClick.apply(_props, arguments);
            if (promise && promise.then) {
                promise.then(function () {
                    //fulfilled
                    _this2.setState({ isPending: false });
                }).catch(function (error) {
                    //rejected
                    _this2.setState({ isPending: false });
                });
            } else {
                this.setState({ isPending: false });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var extClassName = this.state.isPending ? " pending" : "";
            return React.createElement(
                "button",
                { type: "button", className: this.props.className + " async-button" + extClassName, disabled: this.state.isPending, onClick: this.handleClick.bind(this) },
                React.createElement("i", { className: "fa fa-spinner glyphicon-spin" }),
                this.props.text
            );
        }
    }]);

    return AsyncButton;
}(React.Component);