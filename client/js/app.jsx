var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var Church = require('./components/Church/Page.jsx');
var ChurchInfo = require('./components/Church/Info.jsx');
var ChurchMembers = require('./components/Church/Members.jsx');
var ChurchCampuses = require('./components/Church/Campuses.jsx');
var ChurchEvents = require('./components/Church/Events.jsx');
var ChurchCreate = require('./components/Church/Create.jsx');
var Churches = require('./components/Churches/Page.jsx');
var Event = require('./components/Event/Page.jsx');
var EventCreate = require('./components/Event/Create.jsx');
var EventInfo = require('./components/Event/Info.jsx');
var EventAttendees = require('./components/Event/Attendees.jsx');
var EventVolunteers = require('./components/Event/Volunteers.jsx');
var Member = require('./components/Member/Page.jsx');
var MemberInfo = require('./components/Member/Info.jsx');
var MemberContact = require('./components/Member/Contact.jsx');
var MemberCreate = require('./components/Member/Create.jsx');
var Campus = require('./components/Campus/Page.jsx');
var CampusInfo = require('./components/Campus/Info.jsx');
var CampusContact = require('./components/Campus/Contact.jsx');
var CampusCreate = require('./components/Campus/Create.jsx');
var Footer = require('./components/Footer/Index.jsx');
var Header = require('./components/Header/Index.jsx');
var Home = require('./components/Home/Index.jsx');
var Navigation = require('./components/Navigation/Index.jsx');
var SignOut = require('./components/SignOut/Index.jsx');

function handleRouterUpdate () {
	$("#menu-sub").slideUp("fast");
	$("#menu-button").text(". . .");
}

var MobileNavigation = React.createClass({
  render: function() {
    var headerSpacingStyle = {
	    paddingTop: "65px",
	    height: "100%",
    };
    return (
      <div style={headerSpacingStyle} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
				{this.props.children}
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div style={{height: "100%"}}>
        <Header/>
				{this.props.children}
        <Footer/>
      </div>
    )
  }
});

var Routes = (
  <Route path="/" component={App}>
		<IndexRoute component={Home} />
    <Route path="sign-out" component={SignOut}/>
    <Route path="church">
      <IndexRoute component={Churches}/>
			<Route path="info" component={ChurchInfo} />
			<Route path="contact" component={ChurchContact} />
      <Route path="create" component={ChurchCreate}>
				<IndexRoute component={ChurchInfo} />
				<Route path="info" component={ChurchInfo} />
      </Route>
      <Route path=":id" component={Church}>
				<IndexRoute component={ChurchInfo} />
				<Route path="info" component={ChurchInfo} />
				<Route path="member" component={ChurchMembers}/>
				<Route path="campus" component={ChurchCampuses}/>
				<Route path="event" component={ChurchEvents} />
			</Route>
    </Route>
		<Route path="church/:id/event/create" component={EventCreate}>
			<IndexRoute component={EventInfo} />
			<Route path="info" component={EventInfo} />
			<Route path="attendees" component={EventAttendees} />
			<Route path="volunteers" component={EventVolunteers} />
		</Route>
		<Route path="church/:id/event/:mid" component={Event}>
			<IndexRoute component={EventInfo} />
			<Route path="info" component={EventInfo} />
			<Route path="attendees" component={EventAttendees} />
			<Route path="volunteers" component={EventVolunteers} />
		</Route>
		<Route path="church/:id/campus/create" component={CampusCreate}>
			<IndexRoute component={CampusInfo} />
			<Route path="info" component={CampusInfo} />
			<Route path="contact" component={CampusContact} />
		</Route>
		<Route path="church/:id/campus/:mid" component={Campus}>
			<IndexRoute component={CampusInfo} />
			<Route path="info" component={CampusInfo} />
			<Route path="contact" component={CampusContact} />
		</Route>
		<Route path="church/:id/member/create" component={MemberCreate}>
			<IndexRoute component={MemberInfo} />
			<Route path="info" component={MemberInfo} />
			<Route path="contact" component={MemberContact} />
		</Route>
		<Route path="church/:id/member/:mid" component={Member}>
			<IndexRoute component={MemberInfo} />
			<Route path="info" component={MemberInfo} />
			<Route path="contact" component={MemberContact} />
		</Route>
  </Route>
);

ReactDOM.render(
  <Router history={browserHistory} onUpdate={handleRouterUpdate} routes={Routes}/>,
	document.getElementById("container")
);
