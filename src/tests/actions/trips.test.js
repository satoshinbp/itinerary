import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  addTrip,
  startAddTrip,
  editTrip,
  startEditTrip,
  removeTrip,
  startRemoveTrip,
  setTrips,
  startSetTrips
} from '../../actions/trips'
import db from '../../firebase/firebase'
import trips from '../fixtures/trips'

const uid = 'thisismytestuid'
const defaultAuthState = { auth: { uid } }
const tripsRef = db.collection('users').doc(uid).collection('trips')
const createMockStore = configureMockStore([thunk])

trips.forEach(({ id, title, startDate, endDate, note }) => {
  tripsRef.doc(id).set({ title, startDate, endDate, note })
})

describe('ADD_TRIP', () => {
  test('should setup addTrip action object', () => {
    const action = addTrip(trips[0])
    expect(action).toEqual({
      type: 'ADD_TRIP',
      trip: trips[0]
    })
  })

  test('should add trip to database and store', done => {
    const store = createMockStore(defaultAuthState)
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

      return tripsRef.doc(actions[0].trip.id).get()
    }).then(doc => {
      expect(doc.data()).toEqual(tripData)
      tripsRef.doc(doc.id).delete()
    }).then(() => {
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
    const store = createMockStore(defaultAuthState)
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
      return tripsRef.doc(id).get()
    }).then(snapshot => {
      expect(snapshot.data().title).toEqual(title)
      tripsRef.doc(id).update({ title: trips[1].title })
    }).then(() => {
      done()
    })
  })
})

describe('REMOVE_TRIP', () => {
  test('should setup removeTrip action object', () => {
    const id = 3
    const action = removeTrip(id)
    expect(action).toEqual({
      type: 'REMOVE_TRIP',
      id
    })
  })

  test('should remove trip from database and store', done => {
    const store = createMockStore(defaultAuthState)
    const id = trips[0].id
    store.dispatch(startRemoveTrip(id)).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'REMOVE_TRIP',
        id
      })
      return tripsRef.doc(id).get()
    }).then(snapshot => {
      expect(snapshot).toBeFalsy
      tripsRef.doc(id).set({
        title: trips[0].title,
        startDate: trips[0].startDate,
        endDate: trips[0].endDate,
        note: trips[0].note,
      })
    }).then(() => {
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
    const store = createMockStore(defaultAuthState)
    store.dispatch(startSetTrips()).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'SET_TRIPS',
        trips
      })
    })
  })
})