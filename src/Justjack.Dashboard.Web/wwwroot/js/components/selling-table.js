'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SellingTable = function (_React$Component) {
    _inherits(SellingTable, _React$Component);

    function SellingTable(props) {
        _classCallCheck(this, SellingTable);

        var _this = _possibleConstructorReturn(this, (SellingTable.__proto__ || Object.getPrototypeOf(SellingTable)).call(this, props));

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


    _createClass(SellingTable, [{
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
                var url = ["/query/selling?f=", _this2.state.dtFrom, '&t=', _this2.state.dtTo].join('');
                console.log(url);
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
            console.log("show");
            var table = $('#' + this.props.id);
            if (!this.state.hasInited) {
                table.DataTable({
                    "data": records,
                    "paging": true,
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
            var tableStyle = {
                display: this.state.hasInited ? "" : "none",
                width: '100%'
            };

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
                            null,
                            React.createElement('input', { type: 'date', value: this.state.dtFrom, onChange: this.onDateFromChanged }),
                            React.createElement('input', { type: 'date', value: this.state.dtTo, onChange: this.onDateToChanged }),
                            React.createElement(AsyncButton, { className: 'btn btn-primary btn-flat', text: 'Query', onClick: this.query.bind(this) }),
                            React.createElement(
                                'span',
                                { className: 'text-danger' },
                                this.state.msg
                            )
                        ),
                        React.createElement(
                            'table',
                            { id: this.props.id, className: 'table table-striped table-bordered', style: tableStyle },
                            React.createElement(
                                'thead',
                                null,
                                React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'th',
                                        null,
                                        'Name'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Position'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Office'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Extn.'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Start date'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Salary'
                                    )
                                )
                            ),
                            React.createElement(
                                'tfoot',
                                null,
                                React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'th',
                                        null,
                                        'Name'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Position'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Office'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Extn.'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Start date'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Salary'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SellingTable;
}(React.Component);