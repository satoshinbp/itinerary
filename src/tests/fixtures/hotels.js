import moment from 'moment'

export default [{
  id: '1',
  tripId: 'a',
  name: 'Waikiki Resort Hotel',
  checkInDate: moment(0).add(1, 'day').valueOf(),
  checkOutDate: moment(0).add(2, 'day').valueOf(),
  checkInTime: moment().hour(15).minutes(0).valueOf(),
  checkOutTime: moment().hour(11).minutes(0).valueOf(),
  ETA: moment().hour(18).minutes(0).valueOf(),
  ETD: moment().hour(9).minutes(0).valueOf(),
  location: 'Waikiki',
  note: ''
}, {
  id: '2',
  tripId: 'b',
  name: 'Riad Zamane',
  checkInDate: moment(0).subtract(7, 'day').valueOf(),
  checkOutDate: moment(0).subtract(5, 'day').valueOf(),
  checkInTime: moment().hour(15).minutes(0).valueOf(),
  checkOutTime: moment().hour(11).minutes(0).valueOf(),
  ETA: moment().hour(16).minutes(0).valueOf(),
  ETD: moment().hour(11).minutes(0).valueOf(),
  location: 'Fes',
  note: ''
}, {
  id: '3',
  tripId: 'a',
  name: 'Hawai Travellars Inn',
  checkInDate: moment(0).valueOf(),
  checkOutDate: moment(0).add(1, 'day').valueOf(),
  checkInTime: moment().hour(14).minutes(0).valueOf(),
  checkOutTime: moment().hour(10).minutes(0).valueOf(),
  ETA: moment().hour(14).minutes(0).valueOf(),
  ETD: moment().hour(10).minutes(0).valueOf(),
  location: '',
  note: 'Early Check-in'
}, {
  id: '4',
  tripId: 'a',
  name: 'Hawai Hotel',
  checkInDate: moment(0).valueOf(),
  checkOutDate: moment(0).add(2, 'day').valueOf(),
  checkInTime: moment().hour(15).minutes(0).valueOf(),
  checkOutTime: moment().hour(10).minutes(0).valueOf(),
  ETA: moment().hour(17).minutes(0).valueOf(),
  ETD: moment().hour(8).minutes(0).valueOf(),
  location: 'Hawai',
  note: ''
}];