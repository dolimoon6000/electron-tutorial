var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');
var fs = eRequire('fs');
var loadApts = JSON.parse(fs.readFileSync(dataLocation));
var _ = require('lodash');
var electron = eRequire('electron');
var ipc = electron.ipcRenderer;

var React = require('react');
var ReactDOM = require('react-dom');
var AptList = require('./AptList');
var Toolbar = require('./Toolbar');
var AddAppointment = require('./AddAppointment');

class MainInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myAppointments: loadApts,
            aptBodyVisible: false
        };

        this.deleteMessage = this.deleteMessage.bind(this);
        this.showAbout = this.showAbout.bind(this);
        this.toggleAptDisplay = this.toggleAptDisplay.bind(this);
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

    toggleAptDisplay() {
        console.log('toggleAptDisplay');
        var tempVisibility = !this.state.aptBodyVisible;
        this.setState({
            aptBodyVisible: tempVisibility
        });
    }

    showAbout() {
       ipc.sendSync('openInfoWindow');
    }

    render() {
        var myAppointments = this.state.myAppointments;

        if (this.state.aptBodyVisible === true) {
            $('#addAppointment').modal('show');
        } else {
            $('#addAppointment').modal('hide');
        }

        myAppointments = myAppointments.map((item, index) => {
            return <AptList key={index} singleItem={item} whichItem={item} onDelete={this.deleteMessage}/>
        });

        return (
            <div className="application">
                <div className="interface">
                    <Toolbar handleAbout={this.showAbout} handleToggle={this.toggleAptDisplay}/>
                    <AddAppointment handleToggle={this.toggleAptDisplay} />
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
            </div>
        );
    }
}

ReactDOM.render(
    <MainInterface/>,
    document.getElementById('petAppointments')
); // render
