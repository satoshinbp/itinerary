import db from '../firebase/firebase'

// ADD_TRIP
export const addTrip = trip => ({
  type: 'ADD_TRIP',
  trip
})

export const startAddTrip = tripData => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const tripsRef = db.collection('users').doc(uid).collection('trips')
    const { title, startDate, endDate, note } = tripData
    const trip = { title, startDate, endDate, note, user: uid }

    return tripsRef.add(trip).then(snapshot => (
      dispatch(addTrip({
        id: snapshot.id,
        ...trip
      }))
    ))
  }
}

// EDIT_TRIP
export const editTrip = (id, updates) => ({
  type: 'EDIT_TRIP',
  id,
  updates
})

export const startEditTrip = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const tripsRef = db.collection('users').doc(uid).collection('trips')

    return tripsRef.doc(id).update(updates).then(() => dispatch(editTrip(id, updates)))
  }
}

// REMOVE_TRIP
export const removeTrip = id => ({
  type: 'REMOVE_TRIP',
  id
})

export const startRemoveTrip = id => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const tripsRef = db.collection('users').doc(uid).collection('trips')

    return tripsRef.doc(id).delete().then(() => dispatch(removeTrip(id)))
  }
}

//SET_TRIPS
export const setTrips = trips => ({
  type: 'SET_TRIPS',
  trips
})

export const startSetTrips = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const tripsRef = db.collection('users').doc(uid).collection('trips')
    return tripsRef.get().then(snapshot => {
      const trips = []

      snapshot.forEach(childSnapshot => {
        trips.push({
          id: childSnapshot.id,
          user: uid,
          ...childSnapshot.data()
        })
      })

      dispatch(setTrips(trips))
    })
  }
}