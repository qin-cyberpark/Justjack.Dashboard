class SignoutBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { msg: '' };

        //binding
        this.signout = this.signout.bind(this);
    }

    signout() {
        return new Promise((resolve, reject) => {
            this.setState({ msg: '' });
            $.post("/home/signout", function (result) {
                if (result.succeeded) {
                    //redirect to
                    window.location.href = result.data;
                }
            }.bind(this))
            .fail(function (result) {
                this.setState({ msg: 'Signout failed.' });
                reject();
            }.bind(this));
        });
    }
    render() {
        return (
            <div className="text-center">
                <div className="danger">{this.state.msg}</div>
                <AsyncButton className="btn btn-default btn-flat" onClick={this.signout} text="Sign Out" />
            </div>
        );
    }
}