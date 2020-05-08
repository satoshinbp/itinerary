import database from '../firebase/firebase'

// ADD_TRIP
export const addTrip = trip => ({
  type: 'ADD_TRIP',
  trip
})

export const startAddTrip = (tripData = {}) => {
  return dispatch => {
    const {
      title = '',
      startDate = 0,
      endDate = 0,
      note = ''
    } = tripData
    const trip = { title, startDate, endDate, note }

    return database.ref('trips').push(trip).then(ref => {
      dispatch(addTrip({
        id: ref.key,
        ...trip
      }))
    })
  }
}

// EDIT_TRIP
export const editTrip = (id, updates) => ({
  type: 'EDIT_TRIP',
  id,
  updates
})

export const removeTrip = (id = '') => ({
  type: 'REMOVE_TRIP',
  id
})