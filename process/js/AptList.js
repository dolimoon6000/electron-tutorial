var React = require('react');


class AptList extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete() {
        this.props.onDelete(this.props.whichItem);
    }

    render() {
        const { singleItem } = this.props;
        return (
            <li className="pet-item media">
                <div className="media-left">
                    <button className="pet-delete btn btn-xs btn-danger" onClick={this.handleDelete}>
                        <span className="glyphicon glyphicon-remove">X</span>
                    </button>

                </div>
                <div className="pet-info media-body">
                    <div className="pet-head">
                        <span className="pet-name">{singleItem.petName}</span>
                        <span className="apt-date float-right">{singleItem.aptDate}</span>
                    </div>
                    <div className="owner-name"><span className="label-item">Owner:</span>
                        {singleItem.ownerName}</div>
                    <div className="apt-notes">{singleItem.aptNotes}</div>
                </div>
            </li>
        );
    }
}


module.exports = AptList;
