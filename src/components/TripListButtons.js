import React from 'react'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { showUpcomingTrip, showPastTrip, showAllTrip } from '../actions/filters'

const TripListButtons = (props) => {
  const onFilterChange = e => {
    if (e.target.value === 'upcoming') {
      props.showUpcomingTrip()
    } else if (e.target.value === 'past') {
      props.showPastTrip()
    } else if (e.target.value === 'all') {
      props.showAllTrip()
    }
  }

  return (
    <div className="btn-bar">
      <select className="select" value={props.filters.filter} onChange={onFilterChange}>
        <option className="option" value="upcoming">Upcoming Trip</option>
        <option className="option" value="past">Past Trip</option>
        <option className="option" value="all">All Trip</option>
      </select>
      <button className="btn-push" onClick={() => props.setTripId(uuidv4())}>Add Trip</button>
    </div>
  )
}

const mapStateToProps = state => ({ filters: state.filters })

const mapDispatchToProps = dispatch => ({
  showUpcomingTrip: () => dispatch(showUpcomingTrip()),
  showPastTrip: () => dispatch(showPastTrip()),
  showAllTrip: () => dispatch(showAllTrip()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListButtons)