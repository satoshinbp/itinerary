import {
  addHotel,
  editHotel,
  removeHotel,
} from '../../actions/hotels'
import hotels from '../fixtures/hotels'

test('should setup addHotel action object with provided values', () => {
  const action = addHotel(hotels[1])
  expect(action).toEqual({
    type: 'ADD_HOTEL',
    hotel: hotels[1]
  })
})

test('should setup addHotel action object with defaults values', () => {
  const action = addHotel()
  expect(action).toEqual({
    type: 'ADD_HOTEL',
    hotel: {
      id: '',
      tripId: '',
      name: '',
      checkInDate: 0,
      checkOutDate: 0,
      checkInTime: 0,
      checkOutTime: 0,
      ETA: 0,
      ETD: 0,
      location: '',
      note: ''
    }
  })
})

test('should setup editHotel action object', () => {
  const id = 2
  const updates = { title: 'Riad Dar Yema' }
  const action = editHotel(id, updates)
  expect(action).toEqual({
    type: 'EDIT_HOTEL',
    id,
    updates
  })
})

test('should setup removeHotel action object with provided values', () => {
  const id = 3
  const action = removeHotel(id)
  expect(action).toEqual({
    type: 'REMOVE_HOTEL',
    id
  })
})

test('should setup removeHotel action object with defaults values', () => {
  const action = removeHotel()
  expect(action).toEqual({
    type: 'REMOVE_HOTEL',
    id: ''
  })
})