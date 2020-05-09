import tripsReducer from '../../reducers/trips'
import trips from '../fixtures/trips'

test('should set default state', () => {
  const state = tripsReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

test('should add trip', () => {
  const trip = {
    id: 'd',
    title: 'Christmas in Bangkok',
    startDate: 10000000000,
    endDate: 10000300000,
    note: ''
  }
  const action = {
    type: 'ADD_TRIP',
    trip
  }
  const state = tripsReducer(trips, action)
  expect(state).toEqual([...trips, trip])
})

test('should edit trip', () => {
  const note = 'ANA flight'
  const action = {
    type: 'EDIT_TRIP',
    id: trips[1].id,
    updates: { note }
  }
  const state = tripsReducer(trips, action)
  expect(state[1].note).toBe(note)
})

test('should not edit trip if id is not found', () => {
  const note = 'ANA flight'
  const action = {
    type: 'EDIT_TRIP',
    id: '-1',
    updates: {
      note
    }
  };
  const state = tripsReducer(trips, action)
  expect(state).toEqual(trips)
})

test('should remove trip', () => {
  const action = {
    type: 'REMOVE_TRIP',
    id: trips[1].id
  }
  const state = tripsReducer(trips, action);
  expect(state).toEqual([trips[0], trips[2]]);
})

test('should not remove trip if id is not found', () => {
  const action = {
    type: 'REMOVE_TRIP',
    id: '-1'
  }
  const state = tripsReducer(trips, action)
  expect(state).toEqual(trips)
})

test('should set trips', () => {
  const action = {
    type: 'SET_TRIPS',
    trips: [trips[1]]
  }
  const state = tripsReducer(trips, action)
  expect(state).toEqual([trips[1]])
})