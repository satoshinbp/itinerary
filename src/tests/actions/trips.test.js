import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  startAddTrip,
  addTrip,
  startEditTrip,
  editTrip,
  startRemoveTrip,
  removeTrip,
  startSetTrips,
  setTrips
} from '../../actions/trips'
import db from '../../firebase/firebase'
import trips from '../fixtures/trips'

const createMockStore = configureMockStore([thunk])

trips.forEach(({ id }) => {
  db.collection('trips').doc(id).delete()
})

trips.forEach(({ id, title, startDate, endDate, note }) => {
  db.collection('trips').doc(id).set({ title, startDate, endDate, note })
})

describe('ADD_TRIP', () => {
  test('should setup addTrip action object with provided values', () => {
    const action = addTrip(trips[0])
    expect(action).toEqual({
      type: 'ADD_TRIP',
      trip: trips[0]
    })
  })

  test('should add trip to database and store with provided values', done => {
    const store = createMockStore({})
    const tripData = {
      title: 'Bangkok - 2020 Summer',
      startDate: 500000000,
      endDate: 1000000000,
      note: 'Yeah!'
    }
    store.dispatch(startAddTrip(tripData)).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'ADD_TRIP',
        trip: {
          id: expect.any(String),
          ...tripData
        }
      })

      return db.collection('trips').doc(actions[0].trip.id).get()
    }).then(doc => {
      expect(doc.data()).toEqual(tripData)
      db.collection('trips').doc(doc.id).delete()
      done()
    })
  })

  test('should add trip to database and store with default values', (done) => {
    const store = createMockStore({})
    const tripDefaults = {
      title: '',
      startDate: 0,
      endDate: 0,
      note: ''
    }
    store.dispatch(startAddTrip({})).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'ADD_TRIP',
        trip: {
          id: expect.any(String),
          ...tripDefaults
        }
      })

      return db.collection('trips').doc(actions[0].trip.id).get()
    }).then(snapshot => {
      expect(snapshot.data()).toEqual(tripDefaults)
      db.collection('trips').doc(snapshot.id).delete()
      done()
    })
  })
})

describe('EDIT_TRIP', () => {
  test('should setup editTrip action object', () => {
    const id = trips[1].id
    const updates = { title: "Winter Vacation in Hokkaido" }
    const action = editTrip(id, updates)
    expect(action).toEqual({
      type: 'EDIT_TRIP',
      id,
      updates
    })
  })

  test('should edit trip in database and store', done => {
    const store = createMockStore({})
    const id = trips[1].id
    const title = 'Winter Vacation in Hokkaido'
    const updates = { title }
    store.dispatch(startEditTrip(id, updates)).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'EDIT_TRIP',
        id,
        updates
      })
      return db.collection('trips').doc(id).get()
    }).then(snapshot => {
      expect(snapshot.data().title).toEqual(title)
      db.collection('trips').doc(snapshot.id).update({ title: 'Honeymoon in Morrocco' })
      done()
    })
  })
})

describe('REMOVE_TRIP', () => {
  test('should setup removeTrip action object by provided id', () => {
    const id = 3
    const action = removeTrip(id)
    expect(action).toEqual({
      type: 'REMOVE_TRIP',
      id
    })
  })

  test('should remove trip from database and store by provided id', done => {
    const store = createMockStore({})
    const id = trips[0].id
    store.dispatch(startRemoveTrip(id)).then(snapshot => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'REMOVE_TRIP',
        id
      })
      return db.collection('trips').doc(id).get()
    }).then(snapshot => {
      expect(snapshot).toBeFalsy
      db.collection('trips').doc(id).set({
        title: trips[0].title,
        startDate: trips[0].startDate,
        endDate: trips[0].endDate,
        note: trips[0].note,
      })
      done()
    })
  })
})

describe('SET_TRIPS', () => {
  test('should setup setTrips action object', () => {
    const action = setTrips(trips)
    expect(action).toEqual({
      type: 'SET_TRIPS',
      trips
    })
  })

  test('should fetch trips from firebase', () => {
    const store = createMockStore({})
    store.dispatch(startSetTrips()).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'SET_TRIPS',
        trips
      })
    })
  })
})