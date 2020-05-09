import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startAddTrip, addTrip, editTrip, removeTrip } from '../../actions/trips'
import trips from '../fixtures/trips'
import db from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

beforeEach(done => {
  trips.forEach(({ title, startDate, endDate, note }) => {
    db.collection('trips').add({ title, startDate, endDate, note }).then(() => done())
  })
})

test('should setup addTrip action object with provided values', () => {
  const action = addTrip(trips[1])
  expect(action).toEqual({
    type: 'ADD_TRIP',
    trip: trips[1]
  })
})

test('should add trip to database and store', done => {
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

    return db.collection('trips').doc(`${actions[0].trip.id}`).get()
  }).then(doc => {
    expect(doc.data()).toEqual(tripData)
    done()
  })
})

// test('should add trip with defaults to database and store', (done) => {
//   const store = createMockStore({})
//   const tripDefaults = {
//     title: '',
//     startDate: 0,
//     endDate: 0,
//     note: ''
//   }
//   store.dispatch(startAddTrip({})).then(() => {
//     const actions = store.getActions()
//     expect(actions[0]).toEqual({
//       type: 'ADD_TRIP',
//       trip: {
//         id: expect.any(String),
//         ...tripDefaults
//       }
//     })

//     return database.ref(`trips/${actions[0].trip.id}`).once('value')
//   }).then(snapshot => {
//     expect(snapshot.val()).toEqual(tripDefaults)
//     done()
//   })
// })

// // test('should setup addTrip action object with defaults values', () => {
// //   const action = addTrip()
// //   expect(action).toEqual({
// //     type: 'ADD_TRIP',
// //     trip: {
// //       id: '',
// //       title: '',
// //       startDate: 0,
// //       endDate: 0,
// //       note: ''
// //     }
// //   })
// // })

// test('should setup editTrip action object', () => {
//   const id = 2
//   const updates = { title: "Winter Vacation in Hokkaido" }
//   const action = editTrip(id, updates)
//   expect(action).toEqual({
//     type: 'EDIT_TRIP',
//     id,
//     updates
//   })
// })

// test('should setup removeTrip action object with provided values', () => {
//   const id = 3
//   const action = removeTrip(id)
//   expect(action).toEqual({
//     type: 'REMOVE_TRIP',
//     id
//   })
// })

// test('should setup removeTrip action object with defaults values', () => {
//   const action = removeTrip()
//   expect(action).toEqual({
//     type: 'REMOVE_TRIP',
//     id: ''
//   })
// })