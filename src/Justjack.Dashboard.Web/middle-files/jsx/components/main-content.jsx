class ContentHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick() {

    }
    render() {
        return (
             <section className="content-header">
                <h1>
                    {this.props.title || 'Dashboard'}
                    <small>{this.props.subTitle || 'JustJack'}</small>
                </h1>
             </section>
        );
    }
}

class MainContent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="content-wrapper">
                <ContentHeader title={this.props.title} subTitle={this.props.subTitle} />
                <section className="content">
                    {this.props.children}
                </section>
            </div>
        );
    }
}