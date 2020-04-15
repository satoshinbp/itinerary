import React from 'react';
import { connect } from 'react-redux';
import TripForm from './TripForm';
import { editTrip, removeTrip } from '../actions/trips';

const EditTripPage = (props) => {
  return (
    <div className="container">
      <TripForm
        trip={props.trip}
        onSubmit={(trip) => {
          props.dispatch(editTrip(props.trip.id, trip));
          props.history.push('/');
        }} />
      <button
        className="btn-push btn-push--secondary"
        onClick={() => {
          props.dispatch(removeTrip({ id: props.trip.id }));
          props.history.push('/');
        }}>Remove Expense</button>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  trip: state.trips.find((trip) => trip.id === props.match.params.id)
});

export default connect(mapStateToProps)(EditTripPage);
