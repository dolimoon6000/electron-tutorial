var React = require('react');

class HeaderNav extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
    }

    handleSearch(e) {
        this.props.onSearch(e.target.value);
    }

    handleSort(e) {
        this.props.onReOrder(e.target.id, this.props.orderDir);
    }

    handleOrder(e) {
        this.props.onReOrder(this.props.orderBy, e.target.id);
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
                                    <li><a href="#" id="petName" onClick={this.handleSort}>Pet Name
                                        {(this.props.orderBy === 'petName') ? <i class="fas fa-check"></i> : null}
                                    </a></li>
                                    <li><a href="#" id="aptDate" onClick={this.handleSort}>Date
                                        {(this.props.orderBy === 'aptDate') ? <i class="fas fa-check"></i> : null}
                                    </a></li>
                                    <li><a href="#" id="ownerName" onClick={this.handleSort}>Owner
                                        {(this.props.orderBy === 'ownerName') ? <i class="fas fa-check"></i> : null}
                                    </a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#" id="asc" onClick={this.handleOrder}>Asc
                                        {(this.props.orderDir === 'asc') ? <i class="fas fa-check"></i> : null}
                                    </a></li>
                                    <li><a href="#" id="desc" onClick={this.handleOrder}>Desc
                                        {(this.props.orderDir === 'desc') ? <i class="fas fa-check"></i> : null}
                                    </a></li>
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