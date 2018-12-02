var React = require('react');

class HeaderNav extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        this.props.onSearch(e.target.value);
    }

    render() {
        return (
            <nav className="navigation navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header"><a className="navbar-brand" href="#">Wisdom Pet Medicine</a></div>
                    <div className="navbar-form navbar-right search-appointments">
                        <div className="input-group">
                            <input id="SearchApts" onChange={this.handleSearch} placeholder="Search" autoFocus type="text" className="form-control"
                                   aria-label="Search Appointments"/>
                            <div className="input-group-btn">
                                <button type="button" className="btn btn-info dropdown-toggle"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort by: <span
                                    className="caret"></span></button>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a href="#" id="petName">Pet Name</a></li>
                                    <li><a href="#" id="aptDate">Date</a></li>
                                    <li><a href="#" id="ownerName">Owner</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#" id="asc">Asc</a></li>
                                    <li><a href="#" id="desc">Desc</a></li>
                                </ul>
                            </div>
                            {/* input-group-btn */}
                        </div>
                        {/* input-group */}
                    </div>
                    {/* navbar-form */}
                </div>
                {/* container-fluid */}
            </nav>
        );
    }
}

module.exports = HeaderNav;