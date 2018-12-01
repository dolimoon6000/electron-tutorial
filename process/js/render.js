var React = require('react');
var ReactDOM = require('react-dom');

var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');


class MainInterface extends React.Component {
    render() {
        return (
            <h1>Wisdom Pet Application</h1>
        );
    }
}

ReactDOM.render(
    <MainInterface/>,
    document.getElementById('petAppointments')
); // render
