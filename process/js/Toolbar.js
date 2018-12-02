var React = require('react');

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.toggleAbout = this.toggleAbout.bind(this);
        this.createAppointments = this.createAppointments.bind(this);
    }

    createAppointments() {
        this.props.handleToggle();
    }

    toggleAbout() {
        this.props.handleAbout();
    }

    render() {
        return (
            <div className="toolbar">
                <div className="toolbar-item" onClick={this.createAppointments}>
                    <span className="toolbar-item-button glyphicon glyphicon-plus-sign"></span>
                    <span className="toolbar-item-text">Add Appointment</span>
                </div>
                <div className="toolbar-item"  onClick={this.toggleAbout}>
                    <span className="toolbar-item-button glyphicon glyphicon-question-sign"></span>
                    <span className="toolbar-item-text">About this app</span>
                </div>
            </div>
        );
    }
}


module.exports = Toolbar;