import moment from 'moment';

export default (trips, { filter }) => {
  return trips.filter((trip) => {
    switch (filter) {
      case 'upcoming':
        return moment(trip.endDate).isSameOrAfter(moment(), 'day');
      case 'past':
        return moment(trip.endDate).isBefore(moment(), 'day');
      case 'all':
        return true;
    }
  }).sort((a, b) => {
    return a.startDate < b.startDate ? 1 : -1;
  });
};