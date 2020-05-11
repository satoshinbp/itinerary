import moment from 'moment'

export default [{
  id: 'a',
  title: 'Summer Vacation in Hawaii',
  startDate: moment().valueOf(),
  endDate: moment().add(2, 'day').valueOf(),
  note: ''
}, {
  id: 'b',
  title: 'Honeymoon in Morrocco',
  startDate: moment().subtract(10, 'day').valueOf(),
  endDate: moment().subtract(1, 'day').valueOf(),
  note: 'Location is changed from Canada to Morocco.'
}, {
  id: 'c',
  title: 'Tokyo - 2020 Spring',
  startDate: moment().add(10, 'day').valueOf(),
  endDate: moment().add(10, 'day').valueOf(),
  note: ''
}];