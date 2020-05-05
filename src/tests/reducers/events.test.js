import eventsReducer from '../../reducers/events'
import events from '../fixtures/events'

test('should set default state', () => {
  const state = eventsReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

test('should add event', () => {
  const event = {
    id: '4',
    tripId: 'a',
    title: '市場食べ歩き',
    date: 0,
    startTime: 3600,
    endTime: 7200,
    location: 'Hawai',
    note: ''
  }
  const action = {
    type: 'ADD_EVENT',
    event
  }
  const state = eventsReducer(events, action)
  expect(state).toEqual([...events, event])
})

test('should edit event', () => {
  const note = '夜は冷えるよ'
  const action = {
    type: 'EDIT_EVENT',
    id: events[1].id,
    updates: { note }
  }
  const state = eventsReducer(events, action)
  expect(state[1].note).toBe(note)
})

test('should not edit event if id is not found', () => {
  const note = '夜は冷えるよ'
  const action = {
    type: 'EDIT_EVENT',
    id: '-1',
    updates: {
      note
    }
  };
  const state = eventsReducer(events, action)
  expect(state).toEqual(events)
})

test('should remove event', () => {
  const action = {
    type: 'REMOVE_EVENT',
    id: events[1].id
  }
  const state = eventsReducer(events, action);
  expect(state).toEqual([events[0], events[2]]);
})

test('should not remove event if id is not found', () => {
  const action = {
    type: 'REMOVE_EVENT',
    id: '-1'
  }
  const state = eventsReducer(events, action)
  expect(state).toEqual(events)
})
