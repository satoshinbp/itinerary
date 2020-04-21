import React from 'react'
import { connect } from 'react-redux'
import { showUpcomingTrip, showPastTrip, showAllTrip } from '../actions/filters'

const TripListFilters = (props) => {
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
    <select
      className="select"
      value={props.filters.filter}
      onChange={onFilterChange}
    >
      <option value="upcoming">Upcoming Trip</option>
      <option value="past">Past Trip</option>
      <option value="all">All Trip</option>
    </select>
  )
}

const mapStateToProps = state => ({ filters: state.filters })

const mapDispatchToProps = dispatch => ({
  showUpcomingTrip: () => dispatch(showUpcomingTrip()),
  showPastTrip: () => dispatch(showPastTrip()),
  showAllTrip: () => dispatch(showAllTrip()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListFilters)