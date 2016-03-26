var React = require('react');
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var PlanManagerService = require('../../services/PlanManagerService');

var Register = React.createClass({
	render: function () {
		return (
			<div style={Style.container}>
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<h1 className="hidden-sm hidden-xs">Join PlanManager</h1>
					<h2 className="hidden-lg hidden-md">Join PlanManager</h2>
	            	<div style={Style.header}>
	            		{"You'll wonder how you ever managed without it."}
	            	</div>
	            </div>
				<div style={{height:"20px"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<ol style={{border:"1px solid #ccc",display:"inline-block",width:"100%",display:"table",listStyle:"none",padding:"0"}}>
						<li style={{padding:"10px",borderLeft:"0",display:"table-cell",width:"33.33%",backgroundColor:"#fff"}}>
							<div style={{float:"left",fontSize:"28px",paddingRight:"10px"}}>👨</div>
							<div><b>Step 1:</b></div>
							<div>Create an account</div>
						</li>
						<li style={{padding:"10px",borderLeft:"1px solid #ccc",backgroundColor:"transparent",color:"#ccc",display:"table-cell",width:"33.33%"}}>
							<div style={{float:"left",fontSize:"28px",paddingRight:"10px"}}>📜</div>
							<div><b>Step 2:</b></div>
							<div>Choose your plan</div>
						</li>
						<li style={{padding:"10px",borderLeft:"1px solid #ccc",backgroundColor:"transparent",color:"#ccc",display:"table-cell",width:"33.33%"}}>
							<div style={{float:"left",fontSize:"28px",paddingRight:"10px"}}>💻</div>
							<div><b>Step 3:</b></div>
							<div>Go to your dashboard</div>
						</li>
					</ol>
				</div>
				<div style={{height:"20px"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
				<div style={Style.register}>
                	<div style={Style.loginForm} className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
						{this.props.children}
					</div>
                	<div style={Style.rightColumn} className="col-lg-4 col-md-4 hidden-sm hidden-xs">
                		<div style={Style.highlights}>
	                		<div style={Style.highlightsHeader}>{"You'll love PlanManager"}</div>
	                		<div style={Style.highlightsBody}>
	                			<div><b>Powerful</b> tools</div>
	                			<div><b>Powerful</b> recomendations</div>
	                		</div>
	                		<div style={{padding:"10px"}}>
	                			<div><span style={{color:"green"}}><b>✓</b></span> Unlimited Storage</div>
	                			<div><span style={{color:"green"}}><b>✓</b></span> Clear Reminders</div>
	                			<div><span style={{color:"green"}}><b>✓</b></span> Essential Analytics</div>
	                		</div>
	                	</div>
                	</div>
				</div>
			</div>
		)
	}
});

module.exports = Register;
