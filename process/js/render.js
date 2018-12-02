var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');
var fs = eRequire('fs');
var loadApts = JSON.parse(fs.readFileSync(dataLocation));

var React = require('react');
var ReactDOM = require('react-dom');
var AptList = require('./AptList');

class MainInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myAppointments: loadApts
        };
    }

    render() {
        var myAppointments = this.state.myAppointments;
        return (
            <div className="application">
                <div className="container">
                    <div className="row">
                        <div className="appointments col-sm-12">
                            <h2 className="appointments-headline">Current Appointments</h2>
                            <ul className="item-list media-list">
                                {
                                    myAppointments.map(function (item, index) {
                                        return <AptList key={index} singleItem={item} />
                                    })
                                }
                            </ul>
                        </div>
                        {/* col-sm-12 */}
                    </div>
                    {/* row */}
                </div>
                {/* container */}
            </div>
        );
    }
}

ReactDOM.render(
    <MainInterface/>,
    document.getElementById('petAppointments')
); // render
