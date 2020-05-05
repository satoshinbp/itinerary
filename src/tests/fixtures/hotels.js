import moment from 'moment'

export default [{
  id: '1',
  tripId: 'b',
  name: 'Riad Zamane',
  checkInDate: moment(0).add(1004, 'day').valueOf(),
  checkOutDate: moment(0).add(1006, 'day').valueOf(),
  checkInTime: moment().hour(15).minutes(0).valueOf(),
  checkOutTime: moment().hour(11).minutes(0).valueOf(),
  ETA: moment().hour(18).minutes(0).valueOf(),
  ETD: moment().hour(9).minutes(0).valueOf(),
  location: 'Fes',
  note: ''
}, {
  id: '2',
  tripId: 'a',
  name: 'Hawai Resort Hotel',
  checkInDate: 0,
  checkOutDate: moment(0).add(2, 'day').valueOf(),
  checkInTime: moment().hour(15).minutes(0).valueOf(),
  checkOutTime: moment().hour(11).minutes(0).valueOf(),
  ETA: moment().hour(16).minutes(0).valueOf(),
  ETD: moment().hour(11).minutes(0).valueOf(),
  location: 'Hawai',
  note: ''
}, {
  id: '3',
  tripId: 'a',
  name: 'Waikiki Hotel',
  checkInDate: moment(0).add(2, 'day').valueOf(),
  checkOutDate: moment(0).add(3, 'day').valueOf(),
  checkInTime: moment().hour(14).minutes(0).valueOf(),
  checkOutTime: moment().hour(10).minutes(0).valueOf(),
  ETA: moment().hour(17).minutes(0).valueOf(),
  ETD: moment().hour(10).minutes(0).valueOf(),
  location: 'Hawai',
  note: 'Early Check-in'
}];