class SellingSingle extends React.Component {
    constructor(props) {
        super(props);

        var today = new Date();

        this.state = {
            hasInited: false,
            keyword: '',
            dtFrom: today.yyyymmdd('-'),
            dtTo: today.yyyymmdd('-'),
            msg: '',
        };

        //binding
        this.onKeywordChanged = this.onKeywordChanged.bind(this);
        this.onDateFromChanged = this.onDateFromChanged.bind(this);
        this.onDateToChanged = this.onDateToChanged.bind(this);
    }

    //condition changed
    onKeywordChanged(e) {
        this.setState({ keyword: e.target.value });
    }
    onDateFromChanged(e) {
        this.setState({ dtFrom: e.target.value });
    }
    onDateToChanged(e) {
        this.setState({ dtTo: e.target.value });
    }

    //pull data
    query() {
        return new Promise((resolve, reject) => {
            //do request
            let record = [];
            let url = ["/query/selling/single?k=", this.state.keyword, "&f=", this.state.dtFrom, '&t=', this.state.dtTo].join('');
            $.get(url, function (result) {
                if (result.succeeded) {
                    //show data
                    this.show(result.data);
                    this.setState({ msg: result.message });
                    resolve();
                } else {
                    //failed
                    this.setState({ msg: result.message || 'Query failed, try again.' });
                    reject();
                }
            }.bind(this))
            .fail(function (result) {
                this.setState({ msg: 'Query failed, try again.' });
                reject();
            }.bind(this));
        });
    }

    show(records) {
        let table = $('#' + this.props.id);
        if (!this.state.hasInited) {
            table.DataTable({
                "data": records,
                columns: [
                    { data: "code" },
                    { data: "name" },
                    { data: "unitPrice", className: "dt-body-right" },
                    { data: "quantity", className: "dt-body-right" },
                    { data: "orderCode" },
                    { data: "paidTime" }
                ],
                "paging": true,
                "pageLength": 50,
                "lengthChange": true,
                "searching": true,
                "ordering": true,
                "info": true,
                "autoWidth": true
            });
            this.setState({ hasInited: true });
        } else {
            table.DataTable().clear();
            table.DataTable().rows.add(records);
            table.DataTable().draw();
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12 box">
                    <div className="box-body">
                        <div className="row">
                            <div className="col-xs-10">
                                <div className="input-group">
                                    <label className="input-group-addon">Code/Name</label>
                                    <input type="text" className="form-control" value={this.state.keyword} onChange={this.onKeywordChanged} placeholder="code or name" />
                                    <label className="input-group-addon">From</label>
                                    <input className="form-control" type="date" value={this.state.dtFrom} onChange={this.onDateFromChanged} />
                                    <label className="input-group-addon">To</label>
                                    <input className="form-control" type="date" value={this.state.dtTo} onChange={this.onDateFromChanged} />
                                </div>
                            </div>
                            <div className="col-xs-2">
                                <AsyncButton className="btn btn-primary btn-flat pull-right" text="Query" onClick={this.query.bind(this)} />
                            </div>
                        </div>
                      <div className="row selling-table-msg-bar">
                            <span className="text-danger">{this.state.msg}</span>
                      </div>
                        <div className="row">
                            <table id={this.props.id} className="row-border stripe" style={{ width: '100%' }}>
                            <thead>
                            <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty.</th>
                            <th>Order</th>
                            <th>Paid</th>
                            </tr>
                            </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}