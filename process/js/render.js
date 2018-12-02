var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');
var fs = eRequire('fs');
var loadApts = JSON.parse(fs.readFileSync(dataLocation));
var _ = require('lodash');

var React = require('react');
var ReactDOM = require('react-dom');
var AptList = require('./AptList');

class MainInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myAppointments: loadApts
        };

        this.deleteMessage = this.deleteMessage.bind(this);
    }

    componentDidUpdate() {
        fs.writeFile(dataLocation, JSON.stringify(this.state.myAppointments), 'utf8', function (err) {
            if (err) {
                console.log(err);
            }
        });
    }

    deleteMessage(item) {
       var allApts = this.state.myAppointments;
       var newApts = _.without(allApts, item);
       this.setState({
           myAppointments: newApts
       });
    }

    render() {
        var myAppointments = this.state.myAppointments;
        myAppointments = myAppointments.map((item, index) => {
            return <AptList key={index} singleItem={item} whichItem={item} onDelete={this.deleteMessage}/>
        });

        return (
            <div className="application">
                <div className="container">
                    <div className="row">
                        <div className="appointments col-sm-12">
                            <h2 className="appointments-headline">Current Appointments</h2>
                            <ul className="item-list media-list">
                                {myAppointments}
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
