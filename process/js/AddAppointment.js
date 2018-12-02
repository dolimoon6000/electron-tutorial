var React = require('React');

class AddAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.toggleAptDisplay = this.toggleAptDisplay.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    toggleAptDisplay() {
        this.props.handleToggle();
    }

    handleAdd(e) {
        e.preventDefault();
        var tempItem = {
            petName: this.inputPetName.value,
            ownerName: this.inputPetOwner.value,
            aptDate: this.inputAptDate.value + ' ' + this.inputAptTime.value,
            aptNotes: this.inputAptNotes.value
        };

        this.props.addApt(tempItem);
    }

    render() {
        return (
            <div className="modal fade" id="addAppointment" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add an Appointment</h4>
                            <button type="button" className="close float-right" onClick={this.toggleAptDisplay}
                                    aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        </div>

                        <form className="modal-body add-appointment form-horizontal" onSubmit={this.handleAdd}>
                            <div className="form-group row">
                                <label className="col-sm-3 control-label" htmlFor="petName">Pet Name</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control"
                                           id="petName" ref={ref => this.inputPetName = ref } placeholder="Pet's Name"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 control-label" htmlFor="petOwner">Pet Owner</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control"
                                           id="petOwner" ref={ref => this.inputPetOwner = ref } placeholder="Owner's Name"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 control-label" htmlFor="aptDate">Date</label>
                                <div className="col-sm-9">
                                    <input type="date" className="form-control"
                                            ref={ref => this.inputAptDate = ref }
                                           id="aptDate"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 control-label" htmlFor="aptTime">Time</label>
                                <div className="col-sm-9">
                                    <input type="time" className="form-control"
                                            ref={ref => this.inputAptTime = ref }
                                           id="aptTime"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 control-label" htmlFor="aptNotes">Apt. Notes</label>
                                <div className="col-sm-9">
                  <textarea className="form-control" rows="4" cols="50"
                            id="aptNotes" placeholder="Appointment Notes"
                            ref={ref => this.inputAptNotes = ref } ></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-offset-3 col-sm-9">
                                    <div className="pull-right">
                                        <button type="button" className="btn btn-default"
                                                onClick={this.toggleAptDisplay}>Cancel
                                        </button>
                                        &nbsp;
                                        <button type="submit" className="btn btn-primary">Add Appointment</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );

    }
}

module.exports = AddAppointment;