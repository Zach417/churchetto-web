var React = require('react');
var Link = require('react-router').Link;

var Style = require('./Style.jsx');

var IndexBanner = React.createClass({
	render: function(){
		return (
            <div style={Style.indexBanner}>
                <div className="col-lg-7 col-md-11 col-sm-12 col-xs-12 col-centered">
                    <div className="text-centered">
                        <div id="marketing-widescreen-head">
                            <h1 className="hidden-sm hidden-xs">PlanManager</h1>
                            <h2 className="hidden-lg hidden-md">PlanManager</h2>
                            <p>A INTUITIVE TOOL FOR GUIDING PLAN FIDUCIARIES</p>
                        </div>
                        <div className="hidden-sm hidden-xs">
                            <Link to="/"><a className="btn btn-default btn-lg marketing-widescreen-button">Get Started</a></Link>
                            <Link to="/"><a className="btn btn-default btn-lg marketing-widescreen-button">Login</a></Link>
                        </div>
                        <div className="hidden-lg hidden-md">
                            <Link to="/"><a className="btn btn-default btn-md marketing-widescreen-button">Get Started</a></Link>
                            <Link to="/"><a className="btn btn-default btn-md marketing-widescreen-button">Login</a></Link>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
});

var IndexDetails = React.createClass({
	render: function(){
		return (
            <div style={Style.indexDetail} className="col-lg-7 col-md-11 col-sm-12 col-xs-12 col-centered">
                <div className="col-md-4">
                    <h3>OVERSIGHT</h3>
                    <p>
                        Lorem ipsum dolor sit amet, no quo dicat meliore. Sed ei omnis dolore postea, est an ullum ubique appellantur. His ut admodum voluptua, ne idque dicant interesset per. Quaeque copiosae facilisis id pri. Usu ad atqui tritani, no pro wisi euismod. An nam convenire iudicabit percipitur, at assum noluisse sed, summo euripidis et nec. Ius sonet iisque delicatissimi ei. Pri ad magna neglegentur consequuntur, utinam iuvaret luptatum sit ea, id est velit debet intellegam. Ius quis liberavisse id. Usu et legimus accusamus, iudico sensibus vituperata ad pri. Cu habeo latine epicurei mel, usu id aliquando dissentiet consectetuer. Ea sint velit honestatis nec. Te unum melius repudiandae vis, dico primis ex sed. Tacimates patrioque sed an. Legendos corrumpit ne sit. Labore laoreet salutatus ei mei, ne sea prima noster mediocrem, ullum molestiae vituperata eum te. Vim causae aperiri ut. Te phaedrum periculis eos. Inani audiam tincidunt quo in, vel impedit patrioque laboramus id. Pri illum voluptatum cu, vis sumo invenire similique et. Disputando efficiantur quo eu, nam no nibh nobis volumus, nobis numquam sapientem sea no. Id pri postea incorrupte.
                    </p>
                </div>
                <div className="col-md-4">
                    <h3>GUIDANCE</h3>
                    <p>
                        Lorem ipsum dolor sit amet, no quo dicat meliore. Sed ei omnis dolore postea, est an ullum ubique appellantur. His ut admodum voluptua, ne idque dicant interesset per. Quaeque copiosae facilisis id pri. Usu ad atqui tritani, no pro wisi euismod. An nam convenire iudicabit percipitur, at assum noluisse sed, summo euripidis et nec. Ius sonet iisque delicatissimi ei. Pri ad magna neglegentur consequuntur, utinam iuvaret luptatum sit ea, id est velit debet intellegam. Ius quis liberavisse id. Usu et legimus accusamus, iudico sensibus vituperata ad pri. Cu habeo latine epicurei mel, usu id aliquando dissentiet consectetuer. Ea sint velit honestatis nec. Te unum melius repudiandae vis, dico primis ex sed. Tacimates patrioque sed an. Legendos corrumpit ne sit. Labore laoreet salutatus ei mei, ne sea prima noster mediocrem, ullum molestiae vituperata eum te. Vim causae aperiri ut. Te phaedrum periculis eos. Inani audiam tincidunt quo in, vel impedit patrioque laboramus id. Pri illum voluptatum cu, vis sumo invenire similique et. Disputando efficiantur quo eu, nam no nibh nobis volumus, nobis numquam sapientem sea no. Id pri postea incorrupte.
                    </p>
                </div>
                <div className="col-md-4">
                    <h3>FIDUCIARY PRUDENCE</h3>
                    <p>
                        Lorem ipsum dolor sit amet, no quo dicat meliore. Sed ei omnis dolore postea, est an ullum ubique appellantur. His ut admodum voluptua, ne idque dicant interesset per. Quaeque copiosae facilisis id pri. Usu ad atqui tritani, no pro wisi euismod. An nam convenire iudicabit percipitur, at assum noluisse sed, summo euripidis et nec. Ius sonet iisque delicatissimi ei. Pri ad magna neglegentur consequuntur, utinam iuvaret luptatum sit ea, id est velit debet intellegam. Ius quis liberavisse id. Usu et legimus accusamus, iudico sensibus vituperata ad pri. Cu habeo latine epicurei mel, usu id aliquando dissentiet consectetuer. Ea sint velit honestatis nec. Te unum melius repudiandae vis, dico primis ex sed. Tacimates patrioque sed an. Legendos corrumpit ne sit. Labore laoreet salutatus ei mei, ne sea prima noster mediocrem, ullum molestiae vituperata eum te. Vim causae aperiri ut. Te phaedrum periculis eos. Inani audiam tincidunt quo in, vel impedit patrioque laboramus id. Pri illum voluptatum cu, vis sumo invenire similique et. Disputando efficiantur quo eu, nam no nibh nobis volumus, nobis numquam sapientem sea no. Id pri postea incorrupte.
                    </p>
                </div>
            </div>
		);
	}
});

var IndexMoreInfoDetails = React.createClass({
	render: function(){
		return (
            <div style={Style.indexDetail} className="col-lg-7 col-md-11 col-sm-12 col-xs-12 col-centered">
                <div className="col-md-6">
                    <h3>OVERSIGHT</h3>
                    <p>
                        Lorem ipsum dolor sit amet, no quo dicat meliore. Sed ei omnis dolore postea, est an ullum ubique appellantur. His ut admodum voluptua, ne idque dicant interesset per. Quaeque copiosae facilisis id pri. Usu ad atqui tritani, no pro wisi euismod. An nam convenire iudicabit percipitur, at assum noluisse sed, summo euripidis et nec. Ius sonet iisque delicatissimi ei. Pri ad magna neglegentur consequuntur, utinam iuvaret luptatum sit ea, id est velit debet intellegam. Ius quis liberavisse id. Usu et legimus accusamus, iudico sensibus vituperata ad pri. Cu habeo latine epicurei mel, usu id aliquando dissentiet consectetuer. Ea sint velit honestatis nec. Te unum melius repudiandae vis, dico primis ex sed. Tacimates patrioque sed an. Legendos corrumpit ne sit. Labore laoreet salutatus ei mei, ne sea prima noster mediocrem, ullum molestiae vituperata eum te. Vim causae aperiri ut. Te phaedrum periculis eos. Inani audiam tincidunt quo in, vel impedit patrioque laboramus id. Pri illum voluptatum cu, vis sumo invenire similique et. Disputando efficiantur quo eu, nam no nibh nobis volumus, nobis numquam sapientem sea no. Id pri postea incorrupte.
                    </p>
                </div>
                <div className="col-md-6">
                    <h3>GUIDANCE</h3>
                    <p>
                        Lorem ipsum dolor sit amet, no quo dicat meliore. Sed ei omnis dolore postea, est an ullum ubique appellantur. His ut admodum voluptua, ne idque dicant interesset per. Quaeque copiosae facilisis id pri. Usu ad atqui tritani, no pro wisi euismod. An nam convenire iudicabit percipitur, at assum noluisse sed, summo euripidis et nec. Ius sonet iisque delicatissimi ei. Pri ad magna neglegentur consequuntur, utinam iuvaret luptatum sit ea, id est velit debet intellegam. Ius quis liberavisse id. Usu et legimus accusamus, iudico sensibus vituperata ad pri. Cu habeo latine epicurei mel, usu id aliquando dissentiet consectetuer. Ea sint velit honestatis nec. Te unum melius repudiandae vis, dico primis ex sed. Tacimates patrioque sed an. Legendos corrumpit ne sit. Labore laoreet salutatus ei mei, ne sea prima noster mediocrem, ullum molestiae vituperata eum te. Vim causae aperiri ut. Te phaedrum periculis eos. Inani audiam tincidunt quo in, vel impedit patrioque laboramus id. Pri illum voluptatum cu, vis sumo invenire similique et. Disputando efficiantur quo eu, nam no nibh nobis volumus, nobis numquam sapientem sea no. Id pri postea incorrupte.
                    </p>
                </div>
            </div>
		);
	}
});

var IndexMoreInfoBanner = React.createClass({
	render: function(){
		return (
            <div style={Style.indexBannerAlt}>
                <div className="col-lg-7 col-md-11 col-sm-12 col-xs-12 col-centered">
                    <div className="text-centered">
                        <div id="marketing-widescreen-head">
                            <h1 className="hidden-sm hidden-xs">Helping you manage your employer-sponsored retirement plan.</h1>
                            <h2 className="hidden-lg hidden-md">Helping you manage your employer-sponsored retirement plan.</h2>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
});

var IndexContent = React.createClass({
	render: function(){
		return (
            <div>
                <IndexBanner />
                <IndexDetails />
                <IndexMoreInfoBanner />
                <IndexMoreInfoDetails />
            </div>
		);
	}
});

var WelcomePage = React.createClass({
	render: function(){
		return(
			<div id="page">
                <IndexContent />
			</div>
		);
	}
});
		
module.exports = WelcomePage;