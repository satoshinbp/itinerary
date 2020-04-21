import React from 'react'
import { connect } from 'react-redux'
import TripListItem from './TripListItem'
import selectTrips from '../selectors/trips'

const TripList = (props) => (
  <div>
    <div className="list-header">
      <div className="show-for-mobile">Trips</div>
      <div className="list-item__actions show-for-desktop">Actions</div>
      <div className="list-item__title show-for-desktop">Title</div>
      <div className="list-item__dates show-for-desktop">Dates</div>
    </div>
    <div className="list-body">
      {
        props.trips.length === 0 ?
          <div className="list-item list-item--message">
            <span>No trips</span>
          </div>
          :
          props.trips.map((trip) => <TripListItem key={trip.id} {...trip} setTripId={props.setTripId} />)
      }
    </div>
  </div>
);

const mapStateToProps = state => ({ trips: selectTrips(state.trips, state.filters) })

export default connect(mapStateToProps)(TripList)