var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');

var NavigationActions = require('../../actions/NavigationActions');
var Style = require('./Style.jsx');
var Register = require('../Register/index.jsx');

var HomePage = React.createClass({
	getInitialState: function () {
		return {
			signUpButtonStyle: Style.signUpButton
		}
	},

    render: function(){
        return (
        	<div>
	            <div style={$.extend({}, Style.marketingContainer, {backgroundColor: "#0e2e47"})}>
	            	<div className="container-fluid">
	            		<div className="row-fluid" style={{textAlign:"center"}}>
			            	<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
			            		<div style={{height:"150px"}} className="col-lg-12 col-md-12 hidden-sm hidden-xs"/>
			            		<div style={{height:"50px"}} className="hidden-lg hidden-md col-sm-12 hidden-xs"/>
				                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				                	<div style={Style.mainHeader} className="hidden-xs">
				                		Make the DOL Proud
				                	</div>
				                	<div style={Style.mainHeaderMobile} className="hidden-lg hidden-md hidden-sm">
				                		Make the DOL Proud
				                	</div>
				                	<div style={Style.marketingBody}>
				                		Effortlessly manage your fiduciary responsibilties, plan documents, and
				                		liabilities from one place.
				                	</div>
				                </div>
				                <div style={{paddingTop:"40px"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				                	<div className="btn btn-warning text-uppercase" style={this.state.signUpButtonStyle}
				                		onMouseOver={this.handleSignUpMouseOver} onMouseOut={this.handleSignUpMouseOut} onClick={this.handleClickRegister}>
				                		🔒 Sign Up Free
				                	</div>
				                </div>
			            		<div style={{height:"120px"}} className="col-lg-12 col-md-12 hidden-sm hidden-xs"/>
			            		<div style={{height:"40px"}} className="hidden-lg hidden-md col-sm-12 hidden-xs"/>
			            	</div>
			            </div>
		            </div>
	            </div>
	            <div style={Style.marketingContainer}>
	            	<div className="container-fluid">
	            		<div className="row-fluid">
			            	<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
			            		<div style={Style.subHeader} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			            			The three keys to fiduciary prudence
			            		</div>
			            		<div className="row-fluid hidden-sm hidden-xs">
				            		<div className="row-fluid">
					            		<div style={Style.oversightComponent} className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
					            			<div style={Style.subSubHeader} className="col-lg-12 col-md-12 hidden-sm hidden-xs">Investment Oversight</div>
					            			<div style={Style.subSubHeaderMobile} className="hidden-lg hidden-md col-sm-12 col-xs-12">Investment Oversight</div>
					            		</div>
					            		<div style={Style.oversightComponent} className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
					            			<div style={Style.subSubHeader} className="col-lg-12 col-md-12 hidden-sm hidden-xs">Vendor Oversight</div>
					            			<div style={Style.subSubHeaderMobile} className="hidden-lg hidden-md col-sm-12 col-xs-12">Vendor Oversight</div>
					            		</div>
					            		<div style={Style.oversightComponent} className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
					            			<div style={Style.subSubHeader} className="col-lg-12 col-md-12 hidden-sm hidden-xs">Administration Oversight</div>
					            			<div style={Style.subSubHeaderMobile} className="hidden-lg hidden-md col-sm-12 col-xs-12">Administration Oversight</div>
					            		</div>
					            	</div>
				            		<div className="row-fluid">
					            		<div style={Style.oversightComponent} className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
											<span style={{fontSize:"62px",float:"left"}}>💰</span>
					            			<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
					            				Lorem ipsum dolor sit amet, no quo dicat meliore. Sed ei omnis dolore postea, est an ullum ubique appellantur.
					            			</div>
					            		</div>
					            		<div style={Style.oversightComponent} className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
											<span style={{fontSize:"62px",float:"left"}}>🏬</span>
					            			<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
					            				Lorem ipsum dolor sit amet, no quo dicat meliore. Sed ei omnis dolore postea, est an ullum ubique appellantur.
					            			</div>
					            		</div>
					            		<div style={Style.oversightComponent} className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
											<span style={{fontSize:"62px",float:"left"}}>🏢</span>
					            			<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
					            				Lorem ipsum dolor sit amet, no quo dicat meliore. Sed ei omnis dolore postea, est an ullum ubique appellantur.
					            			</div>
					            		</div>
					            	</div>
					            </div>
			            		<div className="row-fluid hidden-lg hidden-md">
				            		<div style={Style.oversightComponent} className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
				            			<div style={Style.subSubHeader} className="col-lg-12 col-md-12 hidden-sm hidden-xs">Investment Oversight</div>
				            			<div style={Style.subSubHeaderMobile} className="hidden-lg hidden-md col-sm-12 col-xs-12">Investment Oversight</div>
											<span style={{fontSize:"62px",float:"left"}}>💰</span>
				            			<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
				            				Lorem ipsum dolor sit amet, no quo dicat meliore. Sed ei omnis dolore postea, est an ullum ubique appellantur.
				            			</div>
				            		</div>
				            		<div style={Style.oversightComponent} className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
				            			<div style={Style.subSubHeader} className="col-lg-12 col-md-12 hidden-sm hidden-xs">Vendor Oversight</div>
				            			<div style={Style.subSubHeaderMobile} className="hidden-lg hidden-md col-sm-12 col-xs-12">Vendor Oversight</div>
											<span style={{fontSize:"62px",float:"left"}}>🏬</span>
				            			<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
				            				Lorem ipsum dolor sit amet, no quo dicat meliore. Sed ei omnis dolore postea, est an ullum ubique appellantur.
				            			</div>
				            		</div>
				            		<div style={Style.oversightComponent} className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
				            			<div style={Style.subSubHeader} className="col-lg-12 col-md-12 hidden-sm hidden-xs">Administration Oversight</div>
				            			<div style={Style.subSubHeaderMobile} className="hidden-lg hidden-md col-sm-12 col-xs-12">Administration Oversight</div>
											<span style={{fontSize:"62px",float:"left"}}>🏢</span>
				            			<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
				            				Lorem ipsum dolor sit amet, no quo dicat meliore. Sed ei omnis dolore postea, est an ullum ubique appellantur.
				            			</div>
				            		</div>
				            	</div>
			            	</div>
			            </div>
		            </div>
	            </div>
	        </div>
        );
    },

    handleClickRegister: function () {
    	NavigationActions.changeCurrentPage("/register");
    },

    handleSignUpMouseOver: function () {
    	this.setState({
    		signUpButtonStyle: Style.signUpButtonHover
    	});
    },

    handleSignUpMouseOut: function () {
    	this.setState({
    		signUpButtonStyle: Style.signUpButton
    	});
    },
});

module.exports = HomePage;
