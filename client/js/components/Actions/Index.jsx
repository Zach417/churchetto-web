var React = require('react');
var S = require('string');
var Style = require('./Style.jsx');
var ActionExecute = require('./Execute.jsx');

var ActionStore = require('../../stores/ActionStore');

var ModalWindow = require('../ModalWindow/Index.jsx');
var LinkItem = require('../Navigation/LinkItem.jsx');
var Spacer = require('../Navigation/Spacer.jsx');
var Header = require('../Navigation/Header.jsx');

function getState(callback) {
    ActionStore.get(function (docs) {
        callback({ actions: docs });
    });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function createComponentIncreaseTopN (state, handleClick) {
    if (state.topN >= state.actions.length) {
        return;
    }

    return (
        <div style={{marginBottom:"5px"}}>
            <div style={{color:"#f1f4f6",textDecoration:"none",display:"block",width:"100%",whiteSpace:"normal"}} onClick={handleClick}>
                <div style={{color:"rgb(241, 244, 246)",fontSize: "14px",padding:"20px 10px",marginBottom: "5px",width: "100%",textAlign:"left",whiteSpace:"normal",backgroundColor: "#666666"}} className="btn btn-link">
                    {"+ Load More"}
                </div>
            </div>
        </div>
    )
}

function createNavigationItemComponents (state) {
    if (!state.actions || state.actions.length === 0){
        return;
    }
    return state.actions.slice(0,state.topN).map(function (action) {
        var loadModalWindow = function () {
            if (getParameterByName('action') == action._id) {
                var id = getParameterByName('action');
                var content = <ActionExecute action={action} />
                return (
                    <ModalWindow content={content} parentPath={window.location.pathname.split("?")[0]} />
                );
            }
        }

        return (
            <div>
                {loadModalWindow()}
                <LinkItem
                    key={action._id}
                    label={"🔨 " + action.name}
                    link={window.location.pathname + "?action=" + action._id}
                    backgroundColor="#222222"
                    backgroundColorHover="#0d0d0d" />
            </div>
        );
    });
}

var ActionSettings = React.createClass({
    getInitialState: function () {
        return {
            actions: '',
            topN: '',
        }
    },

    componentWillMount: function () {
        getState(function (state) {
            this.setState({
                actions: state.actions,
                topN: 5,
            });
        }.bind(this));
    },

    render: function () {
        if (this.props.options && this.props.options.isComponent === true) {
            return (
                <div>
                    <Header label={"🔨 Actions"} />
                    <div style={{marginBottom:"5px"}}>
                        <input type="text" placeholder="🔎 Search for an action" style={{padding:"5px",width:"100%"}} onChange={this.handleChange_Search} />
                    </div>
                    {createNavigationItemComponents(this.state)}
                    {createComponentIncreaseTopN(this.state, this.handleClickIncreaseTopN)}
                </div>
            )
        }

        return (
            <div style={{paddingTop:"60px"}} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                <Header label={"🔨 Actions"} />
                <div style={{marginBottom:"5px"}}>
                    <input type="text" placeholder="🔎 Search for an action" style={{padding:"5px",width:"100%"}} onChange={this.handleChange_Search} />
                </div>
                {createNavigationItemComponents(this.state)}
                {createComponentIncreaseTopN(this.state, this.handleClickIncreaseTopN)}
            </div>
        )
    },

    handleChange_Search: function (event) {
        getState(function (state) {

            if (S(event.target.value).isEmpty()) {
                return this.setState(state);
            }

            var _actions = [];
            var _searchResults = [];

            for (var i = 0; i < state.actions.length; i++) {
                var keywords = event.target.value.split(" ");

                var result = {
                    score: 0,
                    object: {},
                };

                for (var j = 0; j < keywords.length; j++) {
                    if (S(keywords[j]).isEmpty()) {
                        continue;
                    }

                    if (S(state.actions[i].name.toUpperCase()).contains(keywords[j].toUpperCase())) {
                        result.score++;
                        result.object = state.actions[i];
                    }
                }

                if (result.score > 0 && result.object) {
                    _searchResults.push(result);
                }
            }

            _searchResults.sort(function (a, b) {
                return b.score - a.score;
            });

            for (var i = 0; i < _searchResults.length; i++) {
                _actions.push(_searchResults[i].object);
            }

            this.setState({
                actions: _actions,
                topN: this.state.topN,
            });

        }.bind(this));
    },

    handleClickIncreaseTopN: function () {
        this.setState({
            actions: this.state.actions,
            topN: this.state.topN + 5,
        })
    }
});

module.exports = ActionSettings;
