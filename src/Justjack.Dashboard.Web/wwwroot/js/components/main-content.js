'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentHeader = function (_React$Component) {
    _inherits(ContentHeader, _React$Component);

    function ContentHeader(props) {
        _classCallCheck(this, ContentHeader);

        return _possibleConstructorReturn(this, (ContentHeader.__proto__ || Object.getPrototypeOf(ContentHeader)).call(this, props));
    }

    _createClass(ContentHeader, [{
        key: 'handleClick',
        value: function handleClick() {}
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'section',
                { className: 'content-header' },
                React.createElement(
                    'h1',
                    null,
                    this.props.title || 'Dashboard',
                    React.createElement(
                        'small',
                        null,
                        this.props.subTitle || 'JustJack'
                    )
                )
            );
        }
    }]);

    return ContentHeader;
}(React.Component);

var MainContent = function (_React$Component2) {
    _inherits(MainContent, _React$Component2);

    function MainContent(props) {
        _classCallCheck(this, MainContent);

        return _possibleConstructorReturn(this, (MainContent.__proto__ || Object.getPrototypeOf(MainContent)).call(this, props));
    }

    _createClass(MainContent, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'content-wrapper' },
                React.createElement(ContentHeader, { title: this.props.title, subTitle: this.props.subTitle }),
                React.createElement(
                    'section',
                    { className: 'content' },
                    this.props.children
                )
            );
        }
    }]);

    return MainContent;
}(React.Component);