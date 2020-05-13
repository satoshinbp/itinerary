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

const uid = 'thisismytestuid'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk])
const tripsRef = db.collection('users').doc(uid).collection('trips')

trips.forEach(({ id, title, startDate, endDate, note }) => {
  tripsRef.doc(id).set({ title, startDate, endDate, note, user: uid })
})
events.forEach(({ id, tripId, title, date, startTime, endTime, location, note }) => {
  tripsRef.doc(tripId).collection('events').doc(id).set({ title, date, startTime, endTime, location, note, user: uid })
})

describe('ADD_EVENT', () => {
  test('should setup addEvent action object', () => {
    const action = addEvent(events[1])
    expect(action).toEqual({
      type: 'ADD_EVENT',
      event: events[1]
    })
  })

  test('should add event to database and store', done => {
    const store = createMockStore(defaultAuthState)
    const tripId = trips[0].id
    const eventsRef = tripsRef.doc(tripId).collection('events')
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
          tripId,
          id: expect.any(String),
          user: uid,
          ...eventData
        }
      })
      return eventsRef.doc(actions[0].event.id).get()
    }).then(snapshot => {
      expect(snapshot.data()).toEqual({ tripId, user: uid, ...eventData })
      eventsRef.doc(snapshot.id).delete()
    }).then(() => done())
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
    const store = createMockStore(defaultAuthState)
    const { tripId, id } = events[1]
    const eventRef = tripsRef.doc(tripId).collection('events').doc(id)
    const title = '豊洲市場見学'
    const updates = { title }
    store.dispatch(startEditEvent(tripId, id, updates)).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'EDIT_EVENT',
        id,
        updates
      })
      return eventRef.get()
    }).then(snapshot => {
      expect(snapshot.data().title).toEqual(title)
      done()
    })
  })
})

describe('REMOVE_EVENT', () => {
  test('should setup removeEvent action object', () => {
    const id = events[2].id
    const action = removeEvent(id)
    expect(action).toEqual({
      type: 'REMOVE_EVENT',
      id
    })
  })

  test('should remove event from database and store', done => {
    const store = createMockStore(defaultAuthState)
    const { tripId, id } = events[2]
    const eventRef = tripsRef.doc(tripId).collection('events').doc(id)
    store.dispatch(startRemoveEvent(tripId, id)).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'REMOVE_EVENT',
        id
      })
      return eventRef.get()
    }).then(snapshot => {
      expect(snapshot).toBeFalsy
      done()
    })
  })
})

describe('SET_EVENTS', () => {
  test('should setup setEvents action object', () => {
    const action = setEvents(events)
    expect(action).toEqual({
      type: 'SET_EVENTS',
      events
    })
  })

  test('should fetch events from firebase', () => {
    const store = createMockStore(defaultAuthState)
    store.dispatch(startSetEvents()).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'SET_EVENTS',
        events
      })
    })
  })
})