import React from 'react';
import { connect } from 'react-redux';
import { showUpcomingTrip, showPastTrip, showAllTrip } from '../actions/filters';

export class TripListFilters extends React.Component {
  onFilterChange = (e) => {
    if (e.target.value === 'upcoming') {
      this.props.showUpcomingTrip();
    } else if (e.target.value === 'past') {
      this.props.showPastTrip();
    } else if (e.target.value === 'all') {
      this.props.showAllTrip();
    }
  };
  render() {
    return (
      <select
        className="select"
        value={this.props.filters.filter}
        onChange={this.onFilterChange}
      >
        <option value="upcoming">Upcoming Trip</option>
        <option value="past">Past Trip</option>
        <option value="all">All Trip</option>
      </select>
    );
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  showUpcomingTrip: () => dispatch(showUpcomingTrip()),
  showPastTrip: () => dispatch(showPastTrip()),
  showAllTrip: () => dispatch(showAllTrip()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListFilters);
