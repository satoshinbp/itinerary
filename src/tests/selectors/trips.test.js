import selectTrips from '../../selectors/trips';
import trips from '../fixtures/trips';

test('should show upcoming trips', () => {
  const filter = 'upcoming'
  const result = selectTrips(trips, filter)
  expect(result).toEqual([trips[2], trips[0]])
})

test('should show past trips', () => {
  const filter = 'past'
  const result = selectTrips(trips, filter)
  expect(result).toEqual([trips[1]])
})

test('should show all trips', () => {
  const filter = 'all'
  const result = selectTrips(trips, filter)
  expect(result).toEqual([trips[2], trips[0], trips[1]])
})