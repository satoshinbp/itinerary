import React from 'react';
import { connect } from 'react-redux';
import TripForm from './TripForm';
import { addTrip } from '../actions/trips';

const AddTripPage = (props) => (
  <div className="container">
    <TripForm
      onSubmit={(trip) => {
        props.dispatch(addTrip(trip));
        props.history.push('/');
      }} />
  </div>
);

export default connect()(AddTripPage);