import React from 'react';
import { connect } from 'react-redux';
import TripListItem from './TripListItem';
import selectTrips from '../selectors/trips';

const TripList = (props) => (
  <div>
    <div className="list-header">
      <div className="show-for-mobile">Trips</div>
      <div className="list-item__title show-for-desktop">Title</div>
      <div className="list-item__dates show-for-desktop">Dates</div>
      <div className="list-item__location show-for-desktop">Location</div>
      <div className="list-item__delete show-for-desktop"></div>
    </div>
    <div className="list-body">
      {
        props.trips.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No trips</span>
          </div>
        ) : (
            props.trips.map((trip) => {
              return <TripListItem key={trip.id} {...trip} />;
            })
          )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    trips:  selectTrips(state.trips, state.filters)
  };
};

export default connect(mapStateToProps)(TripList);