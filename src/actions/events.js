import db from '../firebase/firebase'

// ADD_EVENT
export const addEvent = event => ({
  type: 'ADD_EVENT',
  event
})

export const startAddEvent = (tripId, eventData) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const eventsRef = db.collection('users').doc(uid).collection('trips').doc(tripId).collection('events')
    const { title, date, startTime, endTime, location, note } = eventData
    const event = { title, date, startTime, endTime, location, note, user: uid, tripId }

    return eventsRef.add(event).then(snapshot => (
      dispatch(addEvent({
        id: snapshot.id,
        ...event
      }))
    ))
  }
}

// EDIT_EVENT
export const editEvent = (id, updates) => ({
  type: 'EDIT_EVENT',
  id,
  updates
})

export const startEditEvent = (tripId, id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const eventsRef = db.collection('users').doc(uid).collection('trips').doc(tripId).collection('events').doc(id)
    return eventsRef.update(updates).then(() => dispatch(editEvent(id, updates)))
  }
}

// REMOVE_EVENT
export const removeEvent = id => ({
  type: 'REMOVE_EVENT',
  id
})

export const startRemoveEvent = (tripId, id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const eventsRef = db.collection('users').doc(uid).collection('trips').doc(tripId).collection('events').doc(id)
    return eventsRef.delete().then(() => dispatch(removeEvent(id)))
  }
}

// SET_EVENTS
export const setEvents = events => ({
  type: 'SET_EVENTS',
  events
})

export const startSetEvents = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const events = []

    return db.collectionGroup('events').where("user", "==", uid).get().then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        events.push({
          id: snapshot.id,
          tripId: snapshot.ref.parent.parent.id,
          user: uid,
          ...snapshot.data()
        })
      })
      dispatch(setEvents(events))
    })
  }
}