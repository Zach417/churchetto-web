var React = require('react');
var Stores = require('../../stores');

var ServiceOptions = React.createClass({
    getInitialState: function () {
        return {
            docs: ''
        }
    },

    componentWillMount: function () {
        var store = Stores[this.props.serviceKey];
        store.get(function (docs) {
            this.setState({docs: docs});
        }.bind(this));
    },

    render: function () {
        return (
            <select style={{width:"100%"}} value={this.props.value} onChange={this.props.onChange}>
                <option value=""></option>
                {this.getOptions()}
            </select>
        )
    },

    getOptions: function () {
        if (this.state.docs && this.state.docs.length > 0) {
            return this.state.docs.map(function (doc) {
                var label = doc.name;
                if (this.props.serviceKey === "users") {
                    label = doc.firstName + " " + doc.lastName;
                }
                return (
                    <option value={doc._id}>{label}</option>
                );
            }.bind(this));
        }
    }
});

module.exports = ServiceOptions;
