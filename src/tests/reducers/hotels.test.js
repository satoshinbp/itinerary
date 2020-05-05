import hotelsReducer from '../../reducers/hotels'
import hotels from '../fixtures/hotels'

test('should set default state', () => {
  const state = hotelsReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

test('should add hotel', () => {
  const hotel = {
    id: '4',
    tripId: 'c',
    name: '箱根湯本温泉旅館',
    checkInDate: 0,
    checkOutDate: 100,
    checkInTime: 10000,
    checkOutTime: 1000000,
    ETA: 20000,
    ETD: 800000,
    location: '箱根',
    note: ''
  }
  const action = {
    type: 'ADD_HOTEL',
    hotel
  }
  const state = hotelsReducer(hotels, action)
  expect(state).toEqual([...hotels, hotel])
})

test('should edit hotel', () => {
  const note = '良い湯だな'
  const action = {
    type: 'EDIT_HOTEL',
    id: hotels[1].id,
    updates: { note }
  }
  const state = hotelsReducer(hotels, action)
  expect(state[1].note).toBe(note)
})

test('should not edit hotel if id is not found', () => {
  const note = '良い湯だな'
  const action = {
    type: 'EDIT_HOTEL',
    id: '-1',
    updates: {
      note
    }
  };
  const state = hotelsReducer(hotels, action)
  expect(state).toEqual(hotels)
})

test('should remove hotel', () => {
  const action = {
    type: 'REMOVE_HOTEL',
    id: hotels[1].id
  }
  const state = hotelsReducer(hotels, action);
  expect(state).toEqual([hotels[0], hotels[2]]);
})

test('should not remove hotel if id is not found', () => {
  const action = {
    type: 'REMOVE_HOTEL',
    id: '-1'
  }
  const state = hotelsReducer(hotels, action)
  expect(state).toEqual(hotels)
})
