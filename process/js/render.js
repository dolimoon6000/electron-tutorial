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
var HeaderNav = require('./HeaderNav');


class MainInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myAppointments: loadApts,
            orderBy: 'petName',
            orderDir: 'asc',
            aptBodyVisible: false,
            queryText: ''
        };

        this.deleteMessage = this.deleteMessage.bind(this);
        this.showAbout = this.showAbout.bind(this);
        this.toggleAptDisplay = this.toggleAptDisplay.bind(this);
        this.addItem = this.addItem.bind(this);
        this.searchApts = this.searchApts.bind(this);
        this.reOrder = this.reOrder.bind(this);
    }

    componentDidUpdate() {
        fs.writeFile(dataLocation, JSON.stringify(this.state.myAppointments), 'utf8', function (err) {
            if (err) {
                console.log(err);
            }
        });
    }

    componentDidMount() {
        ipc.on('addAppointment', (event, message) => {
            this.toggleAptDisplay();
        });
    }

    componentWillUnmount() {
        ipc.removeListener('addAppointment', (event, message) => {
            this.toggleAptDisplay();
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

    addItem(tempItem) {
        var tempApts = this.state.myAppointments;
        tempApts.push(tempItem);
        this.setState({
            myAppointments: tempApts,
            aptBodyVisible: false
        });
    }

    searchApts(query) {
        this.setState({
            queryText: query
        });
    }

    reOrder(orderBy, orderDir) {
        this.setState({
            orderBy,
            orderDir
        });
    }

    render() {
        var filteredApts = [];
        var { orderBy, orderDir, queryText, myAppointments } = this.state;

        if (this.state.aptBodyVisible === true) {
            $('#addAppointment').modal('show');
        } else {
            $('#addAppointment').modal('hide');
        }

        myAppointments.forEach(appointment => {
            if (
                (appointment.petName.toLowerCase().indexOf(queryText) !== -1) ||
                (appointment.ownerName.toLowerCase().indexOf(queryText) !== -1) ||
                (appointment.aptDate.toLowerCase().indexOf(queryText) !== -1) ||
                (appointment.aptNotes.toLowerCase().indexOf(queryText) !== -1)
            ) {
                filteredApts.push(appointment);
            }
        });

        filteredApts = _.orderBy(filteredApts, item => {
            return item[orderBy].toLowerCase();
        }, orderDir);

        filteredApts = filteredApts.map((item, index) => {
            return <AptList key={index} singleItem={item} whichItem={item} onDelete={this.deleteMessage}/>
        });

        return (
            <div className="application">
                <HeaderNav
                    onSearch={this.searchApts}
                    orderBy={this.state.orderBy}
                    orderDir={this.state.orderDir}
                    onReOrder={this.reOrder}
                />
                <div className="interface">
                    <Toolbar handleAbout={this.showAbout} handleToggle={this.toggleAptDisplay}/>
                    <AddAppointment
                        handleToggle={this.toggleAptDisplay}
                        addApt={this.addItem}
                    />
                    <div className="container">
                        <div className="row">
                            <div className="appointments col-sm-12">
                                <h2 className="appointments-headline">Current Appointments</h2>
                                <ul className="item-list media-list">
                                    {filteredApts}
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
