import {
  addTrip,
  editTrip,
  removeTrip,
} from '../../actions/trips'
import trips from '../fixtures/trips'

test('should setup addTrip action object with provided values', () => {
  const action = addTrip(trips[1])
  expect(action).toEqual({
    type: 'ADD_TRIP',
    trip: trips[1]
  })
})

test('should setup addTrip action object with defaults values', () => {
  const action = addTrip()
  expect(action).toEqual({
    type: 'ADD_TRIP',
    trip: {
      id: '',
      title: '',
      startDate: 0,
      endDate: 0,
      note: ''
    }
  })
})

test('should setup editTrip action object', () => {
  const id = 2
  const updates = { title: "Winter Vacation in Hokkaido" }
  const action = editTrip(id, updates)
  expect(action).toEqual({
    type: 'EDIT_TRIP',
    id,
    updates
  })
})

test('should setup removeTrip action object with provided values', () => {
  const id = 3
  const action = removeTrip(id)
  expect(action).toEqual({
    type: 'REMOVE_TRIP',
    id
  })
})

test('should setup removeTrip action object with defaults values', () => {
  const action = removeTrip()
  expect(action).toEqual({
    type: 'REMOVE_TRIP',
    id: ''
  })
})