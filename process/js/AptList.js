var React = require('react');


class AptList extends React.Component {
    render() {
        const { singleItem } = this.props;
        return (
            <li className="pet-item media">
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
