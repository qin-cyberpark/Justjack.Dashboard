class LoginBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { msg: '', isErrorMsg: false };
    }

    login() {
        return new Promise((resolve, reject) => {
            this.setState({ msg: '' });
            var loginVM = { username: this.props.username.val(), password: this.props.password.val() }
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
            }.bind(this))
            .fail(function (result) {
                this.setState({ msg: 'Login failed, try again.', isErrorMsg: true });
                reject();
            }.bind(this));
        });
    }
    render() {
        return (
            <div className="row">
                <div className="col-xs-8">
                    <span className={this.state.isErrorMsg?'text-danger':'text-success'}>{this.state.msg}</span>
                </div>
                <div className="col-xs-4">
                   <AsyncButton className="btn btn-primary btn-block btn-flat" text="Sign In" onClick={this.login.bind(this)} />
                </div>
            </div>
        );
    }
}