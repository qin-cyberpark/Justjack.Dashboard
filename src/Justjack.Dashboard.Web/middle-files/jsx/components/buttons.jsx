class AsyncButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isPending: false }
    }

    handleClick() {
        this.setState({ isPending: true });

        let promise = this.props.onClick(...arguments);
        if (promise && promise.then) {
            promise.then(() => {
                //fulfilled
                this.setState({ isPending: false });
            }).catch((error) => {
                //rejected
                this.setState({ isPending: false });
            })
        } else {
            this.setState({ isPending: false });
        }
    }

    render() {
        var extClassName = this.state.isPending ? " pending" : "";
        return (
            <button type="button" className={this.props.className + " async-button" + extClassName} disabled={this.state.isPending} onClick={this.handleClick.bind(this)}>
                <i className="fa fa-spinner glyphicon-spin"></i>
                {this.props.text}
            </button>
        );
    }
}