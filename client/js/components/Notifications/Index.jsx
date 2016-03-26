var React = require('react');
var Style = require('./Style.jsx');

function getNotificationItems() {
    return (
        <div>
            <div style={{borderBottom:"1px solid #ccc",cursor:"pointer",backgroundColor:"#d0dae1"}}>
                <div style={{padding:"5px"}}>You must file your 5500 by this Sunday</div>
            </div>
            <div style={{borderBottom:"1px solid #ccc",cursor:"pointer",backgroundColor:"#d0dae1"}}>
                <div style={{padding:"5px"}}>You must file your 5500 by this Sunday</div>
            </div>
            <div style={{borderBottom:"1px solid #ccc",cursor:"pointer"}}>
                <div style={{padding:"5px"}}>You must file your 5500 by this Sunday</div>
            </div>
            <div style={{borderBottom:"1px solid #ccc",cursor:"pointer"}}>
                <div style={{padding:"5px"}}>You must file your 5500 by this Sunday</div>
            </div>
            <div style={{borderBottom:"1px solid #ccc",cursor:"pointer"}}>
                <div style={{padding:"5px"}}>You must file your 5500 by this Sunday</div>
            </div>
            <div style={{borderBottom:"1px solid #ccc",cursor:"pointer"}}>
                <div style={{padding:"5px"}}>You must file your 5500 by this Sunday</div>
            </div>
            <div style={{borderBottom:"1px solid #ccc",cursor:"pointer"}}>
                <div style={{padding:"5px"}}>You must file your 5500 by this Sunday</div>
            </div>
            <div style={{borderBottom:"1px solid #ccc",cursor:"pointer"}}>
                <div style={{padding:"5px"}}>You must file your 5500 by this Sunday</div>
            </div>
            <div style={{borderBottom:"1px solid #ccc",cursor:"pointer"}}>
                <div style={{padding:"5px"}}>You must file your 5500 by this Sunday</div>
            </div>
            <div style={{borderBottom:"1px solid #ccc",cursor:"pointer"}}>
                <div style={{padding:"5px"}}>You must file your 5500 by this Sunday</div>
            </div>
            <div style={{borderBottom:"1px solid #ccc",cursor:"pointer"}}>
                <div style={{padding:"5px"}}>You must file your 5500 by this Sunday</div>
            </div>
            <div style={{borderBottom:"1px solid #ccc",cursor:"pointer"}}>
                <div style={{padding:"5px"}}>You must file your 5500 by this Sunday</div>
            </div>
        </div>
    )
}

var Notifications = React.createClass({
    render: function () {
        return (
            <div>
                <div className="hidden-lg hidden-md col-sm-12 col-xs-12">
                    <div style={{border:"1px solid #ccc",backgroundColor:"#fff",color:"#000",padding:"0",margin:"0",width:"100%",boxShadow:"5px 5px 5px #888888"}} >
                        <div style={{borderBottom:"1px solid #ccc"}}>
                            <div style={{padding:"5px"}}>
                                <span><b>Notifications</b></span>
                                <span style={{float:"right",cursor:"pointer"}} onClick={this.handleClickNotification}>
                                    <div style={{padding:"0 5px 0 5px"}} onClick={this.props.handleClose}>x</div>
                                </span>
                            </div>
                        </div>
                        <div style={{maxHeight:"400px",overflowY:"auto"}}>
                            {getNotificationItems()}
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 col-md-12 hidden-sm hidden-xs">
                    <div className="col-lg-4 col-md-4" />
                    <div className="col-lg-4 col-md-4" />
                    <div className="hidden-lg col-md-1" />
                    <div className="col-lg-2 col-md-3" style={{border:"1px solid #ccc",backgroundColor:"#fff",color:"#000",padding:"0",margin:"0",boxShadow:"5px 5px 5px #888888"}} >
                        <div style={{borderBottom:"1px solid #ccc"}}>
                            <div style={{padding:"5px"}}>
                                <span><b>Notifications</b></span>
                                <span style={{float:"right",cursor:"pointer"}} onClick={this.handleClickNotification}>
                                    <div style={{padding:"0 5px 0 5px"}} onClick={this.props.handleClose}>x</div>
                                </span>
                            </div>
                        </div>
                        <div style={{maxHeight:"400px",overflowY:"auto"}}>
                            {getNotificationItems()}
                        </div>
                    </div>
                    <div className="col-lg-2 hidden-md" />
                </div>
            </div>
        )
    }
});

module.exports = Notifications;
