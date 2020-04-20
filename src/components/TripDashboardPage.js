import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import TripListFilters from './TripListFilters';
import TripList from './TripList';
import TripForm from './TripForm';
import { addTrip, editTrip } from '../actions/trips';

class TripDashboardPage extends React.Component {
  state = {
    addTripIsActivated: false,
    editTripId: undefined
  };

  activateAddTrip = () => {
    this.setState(() => ({ addTripIsActivated: true }));
  };
  deactivateAddTrip = () => {
    this.setState(() => ({ addTripIsActivated: false }));
  }
  activateEditTrip = (id) => {
    this.setState(() => ({ editTripId: id }));
  };
  deactivateEditTrip = () => {
    this.setState(() => ({ editTripId: undefined }));
  };

  render() {
    return (
      <div className="container">
        <div className="btn-bar">
          <TripListFilters />
          <button className="btn-push" onClick={this.activateAddTrip}>Add Trip</button>
        </div>
        <TripList activateEditTrip={this.activateEditTrip} />
        <Modal
          isOpen={!!this.state.addTripIsActivated}
          contentLabel="Add Trip"
          onRequestClose={this.deactivateAddTrip}
          closeTimeoutMS={200}
          className="modal"
        >
          <TripForm
            onSubmit={(trip) => {
              this.props.addTrip(trip);
              this.deactivateAddTrip();
            }}
          />
        </Modal>
        <Modal
          isOpen={!!this.state.editTripId}
          contentLabel="Edit Trip"
          onRequestClose={this.deactivateEditTrip}
          closeTimeoutMS={200}
          className="modal"
        >
          <TripForm
            onSubmit={(trip) => {
              this.props.editTrip(this.state.editTripId, trip);
              this.deactivateEditTrip();
            }}
            trip={this.props.trips.find((trip) => trip.id === this.state.editTripId)}
          />
        </Modal>
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  trips: state.trips
});

const mapDispatchToProps = (dispatch) => ({
  addTrip: (trip) => dispatch(addTrip(trip)),
  editTrip: (id, updates) => dispatch(editTrip(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(TripDashboardPage);