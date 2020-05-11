import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  addEvent,
  startAddEvent,
  editEvent,
  startEditEvent,
  removeEvent,
  startRemoveEvent,
  setEvents,
  startSetEvents
} from '../../actions/events'
import db from '../../firebase/firebase'
import trips from '../fixtures/trips'
import events from '../fixtures/events'

const createMockStore = configureMockStore([thunk])

trips.forEach(({ id, title, startDate, endDate, note }) => {
  db.collection('trips').doc(id).set({ title, startDate, endDate, note })
})
events.forEach(({ id, tripId, title, date, startTime, endTime, location, note }) => {
  db.collection('trips').doc(tripId).collection('events').doc(id).set({ title, date, startTime, endTime, location, note })
})

describe('ADD_EVENT', () => {
  test('should setup addEvent action object', () => {
    const action = addEvent(events[1])
    expect(action).toEqual({
      type: 'ADD_EVENT',
      event: events[1]
    })
  })

  test('should add event to database and store with provided values', done => {
    const store = createMockStore({})
    const tripId = 'a'
    const eventData = {
      title: 'Beach Cafe',
      date: 86400,
      startTime: 126400,
      endTime: 130000,
      location: 'Hawaii',
      note: 'Pancake is famous in this cafe.'
    }
    store.dispatch(startAddEvent(tripId, eventData)).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'ADD_EVENT',
        event: {
          id: expect.any(String),
          tripId,
          ...eventData
        }
      })
      return db.collection('trips').doc(tripId).collection('events').doc(actions[0].event.id).get()
    }).then(snapshot => {
      expect(snapshot.data()).toEqual(eventData)
      db.collection('trips').doc(tripId).collection('events').doc(snapshot.id).delete()
    }).then(() => {
      done()
    })
  })

  test('should add event to database and store with default values', done => {
    const store = createMockStore({})
    const tripId = 'a'
    const eventDefaults = {
      title: '',
      date: 0,
      startTime: 0,
      endTime: 0,
      location: '',
      note: ''
    }
    store.dispatch(startAddEvent(tripId)).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'ADD_EVENT',
        event: {
          id: expect.any(String),
          tripId,
          ...eventDefaults
        }
      })

      return db.collection('trips').doc(tripId).collection('events').doc(actions[0].event.id).get()
    }).then(snapshot => {
      expect(snapshot.data()).toEqual(eventDefaults)
      db.collection('trips').doc(tripId).collection('events').doc(snapshot.id).delete()
    }).then(() => {
      done()
    })
  })
})

describe('EDIT_EVENT', () => {
  test('should setup editEvent action object', () => {
    const id = events[1].id
    const title = '豊洲市場見学'
    const updates = { title }
    const action = editEvent(id, updates)
    expect(action).toEqual({
      type: 'EDIT_EVENT',
      id,
      updates
    })
  })

  test('should edit event in database and store', done => {
    const store = createMockStore({})
    const id = events[1].id
    const title = '豊洲市場見学'
    const updates = { title }
    store.dispatch(startEditEvent(id, updates)).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'EDIT_EVENT',
        id,
        updates
      })
      return db.collection('trips').doc(events[1].tripId).collection('events').doc(id).get()
    }).then(snapshot => {
      expect(snapshot.data().title).toEqual(title)
      db.collection('trips').doc(events[1].tripId).collection('events').doc(id).update({ title: events[1].title })
    }).then(() => {
      done()
    })
  })
})

describe('REMOVE_EVENT', () => {
  test('should setup removeEvent action object with provided values', () => {
    const id = events[2].id
    const action = removeEvent(id)
    expect(action).toEqual({
      type: 'REMOVE_EVENT',
      id
    })
  })

  test('should remove event from database and store by provided id', done => {
    const store = createMockStore({})
    const { tripId, id, title, date, startTime, endTime, location, note } = events[2]
    store.dispatch(startRemoveEvent(id)).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'REMOVE_EVENT',
        id
      })
      return db.collection('trips').doc(tripId).collection('events').doc(id).get()
    }).then(snapshot => {
      expect(snapshot).toBeFalsy
      db.collection('trips').doc(tripId).collection('events').doc(id).set({ title, date, startTime, endTime, location, note }).then(() => {
        done()
      })
    })
  })
})