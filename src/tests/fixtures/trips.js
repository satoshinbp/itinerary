import moment from 'moment'

export default [{
  id: 'a',
  title: 'Summer Vacation in Hawai',
  startDate: moment().valueOf(),
  endDate: moment().add(3, 'day').valueOf(),
  note: ''
}, {
  id: 'b',
  title: 'Honeymoon in Morrocco',
  startDate: moment().add(5, 'day').valueOf(),
  endDate: moment().add(7, 'day').valueOf(),
  note: 'Locatin is changed from Canada to Morocco.'
}, {
  id: 'c',
  title: 'Tokyo - 2020 Spring',
  startDate: moment().subtract(3, 'day').valueOf(),
  endDate: moment().subtract(3, 'day').valueOf(),
  note: ''
}];