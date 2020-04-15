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

// export default (trips, { filter }) => {
//   return trips.filter((trip) => {
// switch (filter){
//       case 'upcoming':
//         return moment(trip.endDate).isSameOrAfter(moment(), 'day');
//       case 'past':
//         return moment(trip.endDate).isBefore(moment(), 'day');
//       case 'all':
//         return true;
//     }
//   }).sort((a, b) => {
//     if (sortBy === 'date') {
//       return a.createdAt < b.createdAt ? 1 : -1;
//     } else if (sortBy === 'amount') {
//       return a.amount < b.amount ? 1 : -1;
//     }
//   });
// };