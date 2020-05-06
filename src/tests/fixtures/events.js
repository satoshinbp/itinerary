import moment from 'moment'

export default [{
  id: '1',
  tripId: 'a',
  title: 'Shopping',
  date: moment(0).add(1, 'day').valueOf(),
  startTime: moment().hour(13).minutes(0).valueOf(),
  endTime: moment().hour(16).minutes(0).valueOf(),
  location: 'Waikiki',
  note: ''
}, {
  id: '2',
  tripId: 'b',
  title: 'Desert Tour',
  date: moment(0).subtract(9, 'day').valueOf(),
  startTime: moment().hour(6).minutes(0).valueOf(),
  endTime: moment().hour(20).minutes(0).valueOf(),
  location: 'Marakesh',
  note: ''
}, {
  id: '3',
  tripId: 'c',
  title: '大相撲観戦',
  date: moment(0).add(10, 'day').valueOf(),
  startTime: moment().hour(16).minutes(0).valueOf(),
  endTime: moment().hour(18).minutes(0).valueOf(),
  location: '両国',
  note: '枡席A23'
}];