var React = require('react');

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.toggleAbout = this.toggleAbout.bind(this);
    }
    toggleAbout() {
        this.props.handleAbout();
    }

    render() {
        return (
            <div className="toolbar" onClick={this.toggleAbout}>
                <div className="toolbar-item">
                    <span className="toolbar-item-button glyphicon glyphicon-question-sign"></span>
                    <span className="toolbar-item-text">About this app</span>
                </div>
            </div>
        );
    }
}


module.exports = Toolbar;