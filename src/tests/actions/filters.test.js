import {
  showUpcomingTrip,
  showPastTrip,
  showAllTrip,
} from '../../actions/filters'

test('should setup showUpcomingTrip action object', () => {
  expect(showUpcomingTrip()).toEqual({
    type: 'SHOW_UPCOMING_TRIP',
  })
})

test('should setup showPastTrip action object', () => {
  expect(showPastTrip()).toEqual({
    type: 'SHOW_PAST_TRIP',
  })
})

test('should setup showAllTrip action object', () => {
  expect(showAllTrip()).toEqual({
    type: 'SHOW_ALL_TRIP',
  })
})