import moment from 'moment'

export default [{
  id: '1',
  tripId: 'c',
  title: '大相撲観戦',
  date: moment(0).subtract(998, 'day').valueOf(),
  startTime: moment().hour(16).minutes(0).valueOf(),
  endTime: moment().hour(18).minutes(0).valueOf(),
  location: '両国',
  note: '枡席A23'
}, {
  id: '2',
  tripId: 'b',
  title: 'Desert Tour',
  date: moment(0).add(1001, 'day').valueOf(),
  startTime: moment().hour(6).minutes(0).valueOf(),
  endTime: moment().hour(20).minutes(0).valueOf(),
  location: 'Marakesh',
  note: ''
}, {
  id: '3',
  tripId: 'c',
  title: '浅草寺お参り',
  date: moment(0).subtract(999, 'day').valueOf(),
  startTime: moment().hour(11).minutes(0).valueOf(),
  endTime: moment().hour(12).minutes(0).valueOf(),
  location: '浅草',
  note: ''
}];