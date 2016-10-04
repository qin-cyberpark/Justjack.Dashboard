'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SellingOverall = function (_React$Component) {
    _inherits(SellingOverall, _React$Component);

    function SellingOverall(props) {
        _classCallCheck(this, SellingOverall);

        var _this = _possibleConstructorReturn(this, (SellingOverall.__proto__ || Object.getPrototypeOf(SellingOverall)).call(this, props));

        var today = new Date();

        _this.state = {
            hasInited: false,
            dtFrom: today.yyyymmdd('-'),
            dtTo: today.yyyymmdd('-'),
            msg: ''
        };

        //binding
        _this.onDateFromChanged = _this.onDateFromChanged.bind(_this);
        _this.onDateToChanged = _this.onDateToChanged.bind(_this);
        return _this;
    }

    //condition changed


    _createClass(SellingOverall, [{
        key: 'onDateFromChanged',
        value: function onDateFromChanged(e) {
            this.setState({ dtFrom: e.target.value });
        }
    }, {
        key: 'onDateToChanged',
        value: function onDateToChanged(e) {
            this.setState({ dtTo: e.target.value });
        }

        //pull data

    }, {
        key: 'query',
        value: function query() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                //do request
                var record = [];
                var url = ["/query/selling/overall?f=", _this2.state.dtFrom, '&t=', _this2.state.dtTo].join('');
                $.get(url, function (result) {
                    if (result.succeeded) {
                        //show data
                        this.show(result.data);
                        resolve();
                    } else {
                        //failed
                        this.setState({ msg: result.message || 'Query failed, try again.' });
                        reject();
                    }
                }.bind(_this2)).fail(function (result) {
                    this.setState({ msg: 'Query failed, try again.' });
                    reject();
                }.bind(_this2));
            });
        }
    }, {
        key: 'show',
        value: function show(records) {
            var table = $('#' + this.props.id);
            if (!this.state.hasInited) {
                table.DataTable({
                    "data": records,
                    columns: [{ data: "code" }, { data: "name" }, { data: "unitPrice", className: "dt-body-right" }, { data: "orders", className: "dt-body-right" }, { data: "quantity", className: "dt-body-right" }, { data: "amount", className: "dt-body-right" }],
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
    }, {
        key: 'render',
        value: function render() {
            var extTblClass = this.state.hasInited ? "" : " uninited";

            return React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-12 box' },
                    React.createElement(
                        'div',
                        { className: 'box-body' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-xs-10' },
                                React.createElement(
                                    'div',
                                    { className: 'input-group' },
                                    React.createElement(
                                        'label',
                                        { className: 'input-group-addon' },
                                        'From'
                                    ),
                                    React.createElement('input', { className: 'form-control', type: 'date', value: this.state.dtFrom, onChange: this.onDateFromChanged }),
                                    React.createElement(
                                        'label',
                                        { className: 'input-group-addon' },
                                        'To'
                                    ),
                                    React.createElement('input', { className: 'form-control', type: 'date', value: this.state.dtTo, onChange: this.onDateFromChanged })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-xs-2' },
                                React.createElement(AsyncButton, { className: 'btn btn-primary btn-flat pull-right', text: 'Query', onClick: this.query.bind(this) })
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row selling-table-msg-bar' },
                            React.createElement(
                                'span',
                                { className: 'text-danger' },
                                this.state.msg
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'table',
                                { id: this.props.id, className: 'row-border stripe', style: { width: '100%' } },
                                React.createElement(
                                    'thead',
                                    null,
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'th',
                                            null,
                                            'Code'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            'Name'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            'Price'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            'Orders'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            'Qty.'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            'Amount'
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SellingOverall;
}(React.Component);