import {
  addEvent,
  editEvent,
  removeEvent,
} from '../../actions/events'
import events from '../fixtures/events'

test('should setup addEvent action object with provided values', () => {
  const action = addEvent(events[1])
  expect(action).toEqual({
    type: 'ADD_EVENT',
    event: events[1]
  })
})

test('should setup addEvent action object with defaults values', () => {
  const action = addEvent()
  expect(action).toEqual({
    type: 'ADD_EVENT',
    event: {
      id: '',
      tripId: '',
      title: '',
      date: 0,
      startTime: 0,
      endTime: 0,
      location: '',
      note: ''
    }
  })
})

test('should setup editEvent action object', () => {
  const id = 2
  const updates = { title: '豊洲市場見学', location: '豊洲' }
  const action = editEvent(id, updates)
  expect(action).toEqual({
    type: 'EDIT_EVENT',
    id,
    updates
  })
})

test('should setup removeevent action object with provided values', () => {
  const id = 3
  const action = removeEvent(id)
  expect(action).toEqual({
    type: 'REMOVE_EVENT',
    id
  })
})

test('should setup removeevent action object with defaults values', () => {
  const action = removeEvent()
  expect(action).toEqual({
    type: 'REMOVE_EVENT',
    id: ''
  })
})