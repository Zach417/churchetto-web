var React = require('react');
var Link = require('react-router').Link;

var Style = require('./Style.jsx');

var TaskStore = require('../../stores/TaskStore');
var TaskActions = require('../../actions/TaskActions');
var FeedItemConstants = require('../../constants/FeedItemConstants.js');

var Task = require('../Task/Index.jsx');
var ModalWindow = require('../ModalWindow/Index.jsx');
var FeedItem = require('../Feed/Item.jsx');

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getState (callback) {
	TaskStore.get(function (json) {
        callback({
            tasks: json
        });
	});
}

var Home = React.createClass({
	getInitialState: function () {
		return {
			tasks: []
		}
	},

	componentWillMount: function () {
        getState(function (state) {
            this.setState(state);
        }.bind(this));
	},

    componentDidMount: function() {
        window.scrollTo(0, 0);
        TaskStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TaskStore.removeChangeListener(this._onChange);
    },

	render: function () {
		var createTaskLinkOptions = {
			pathname: '/fiduciary',
			query: {
				action: 'create-task'
			}
		};
		return (
			<div>
                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" style={{padding:"0",margin:"0"}}>
					<Link to={createTaskLinkOptions} replace={true}>
						<div style={Style.newTaskButton} onClick={this.createTaskOnClick}>
							+ Create Task
						</div>
					</Link>
					{this.loadModalWindow()}
					{this.loadTasks()}
				</div>
                <div className="col-lg-3 col-md-3 hidden-sm hidden-xs" style={{paddingRight:"0",marginRight:"0"}}>
                	<div style={{marginBottom:"10px",padding:"5px",backgroundColor:"#fff",border:"1px solid #ccc"}}>
                		<div style={{color:"#0e2e47"}}><b>Investments</b></div>
                		<div>Your investments have grown by 4.32% since Q4 2015.</div>
                	</div>
                	<div style={{marginBottom:"10px",padding:"5px",backgroundColor:"#fff",border:"1px solid #ccc"}}>
                		<div style={{color:"#0e2e47"}}><b>Vendors</b></div>
                		<div>You have added 2 vendors since Q4 2015.</div>
                	</div>
                	<div style={{marginBottom:"10px",padding:"5px",backgroundColor:"#fff",border:"1px solid #ccc"}}>
                		<div style={{color:"#0e2e47"}}><b>Administration</b></div>
                		<div>You have missed 2 deadlines since Q4 2015.</div>
                	</div>
                </div>
			</div>
		)
	},

	loadTasks: function () {
	    if (!this.state.tasks || this.state.tasks.length === 0){
	        return;
	    }
	    return this.state.tasks.map(function (task) {
	        return (
	            <FeedItem
	            	key={task._id}
	            	object={task}
	            	linkPath={"/fiduciary/?action=open-task&id=" + task._id}
	            	type={FeedItemConstants.TASK} />
	        );
	    });
	},

	_onChange: function () {
        getState(function (state) {
            this.setState(state);
        }.bind(this));
	},

    loadModalWindow: function (content) {
        if (getParameterByName('action') == 'create-task' ) {
            var id = getParameterByName('id');
            var content = <Task />
            return (
                <ModalWindow content={content} parentPath={"/fiduciary"} />
            )
        }
    },
});

module.exports = Home;
