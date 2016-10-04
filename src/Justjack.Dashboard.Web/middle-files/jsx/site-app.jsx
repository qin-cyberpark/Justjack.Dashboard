//common
Date.prototype.yyyymmdd = function (splitter) {
    splitter = splitter || '\/';
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(), splitter, mm < 10 ? '0' : '', mm, splitter, dd < 10 ? '0' : '', dd].join('');
};


//application
class SiteApp {
    contractor() {

    }
    show(pageId) {
        pageId = pageId || "Login";
        var fun = this["show" + pageId];
        if (fun) {
            fun.apply(this);
        }
    }
    //login
    showLogin() {
        ReactDOM.render(
                  <LoginBar username={$("#username")} password={$("#password")} />,
                  document.getElementById('login-bar'));
    }

    //dashboard
    showDashboard() {
        ReactDOM.render(
                  <MainContent title="Dashboard" subTitle="in progress">
                    <Dashboard />
                  </MainContent>,
                  document.getElementById('main-content'));
    }

    //selling overall
    showSellingOverall() {
        ReactDOM.render(
                  <MainContent title="Selling" subTitle="overall">
                    <SellingOverall id="selling-overall" />
                  </MainContent>,
        document.getElementById('main-content'));
    }

    //selling sigle
    showSellingSingle() {
        ReactDOM.render(
                  <MainContent title="Selling" subTitle="by product">
                    <SellingSingle id="selling-single" />
                  </MainContent>,
        document.getElementById('main-content'));
    }
}