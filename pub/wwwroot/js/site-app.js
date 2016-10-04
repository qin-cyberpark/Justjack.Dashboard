'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//common
Date.prototype.yyyymmdd = function (splitter) {
    splitter = splitter || '\/';
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(), splitter, mm < 10 ? '0' : '', mm, splitter, dd < 10 ? '0' : '', dd].join('');
};

//application

var SiteApp = function () {
    function SiteApp() {
        _classCallCheck(this, SiteApp);
    }

    _createClass(SiteApp, [{
        key: 'contractor',
        value: function contractor() {}
    }, {
        key: 'show',
        value: function show(pageId) {
            pageId = pageId || "Login";
            var fun = this["show" + pageId];
            if (fun) {
                fun.apply(this);
            }
        }
        //login

    }, {
        key: 'showLogin',
        value: function showLogin() {
            ReactDOM.render(React.createElement(LoginBar, { username: $("#username"), password: $("#password") }), document.getElementById('login-bar'));
        }

        //dashboard

    }, {
        key: 'showDashboard',
        value: function showDashboard() {
            ReactDOM.render(React.createElement(
                MainContent,
                { title: 'Dashboard', subTitle: 'in progress' },
                React.createElement(Dashboard, null)
            ), document.getElementById('main-content'));
        }

        //selling overall

    }, {
        key: 'showSellingOverall',
        value: function showSellingOverall() {
            ReactDOM.render(React.createElement(
                MainContent,
                { title: 'Selling', subTitle: 'overall' },
                React.createElement(SellingOverall, { id: 'selling-overall' })
            ), document.getElementById('main-content'));
        }

        //selling sigle

    }, {
        key: 'showSellingSingle',
        value: function showSellingSingle() {
            ReactDOM.render(React.createElement(
                MainContent,
                { title: 'Selling', subTitle: 'by product' },
                React.createElement(SellingSingle, { id: 'selling-single' })
            ), document.getElementById('main-content'));
        }
    }]);

    return SiteApp;
}();