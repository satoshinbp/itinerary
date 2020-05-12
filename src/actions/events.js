import db from '../firebase/firebase'

// ADD_EVENT
export const addEvent = event => ({
  type: 'ADD_EVENT',
  event
})

export const startAddEvent = (tripId, eventData) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const { title, date, startTime, endTime, location, note } = eventData
    const event = { title, date, startTime, endTime, location, note }

    return db.collection('users').doc(uid).collection('trips').doc(tripId).collection('events').add(event).then(snapshot => {
      dispatch(addEvent({
        id: snapshot.id,
        tripId,
        ...event
      }))
    })
  }
}

// EDIT_EVENT
export const editEvent = (id, updates) => ({
  type: 'EDIT_EVENT',
  id,
  updates
})

export const startEditEvent = (id, updates) => {
  return dispatch => {
    return db.collectionGroup('events').get().then(querySnapshot => {
      querySnapshot.forEach(queryDocumentSnapshot => {
        if (queryDocumentSnapshot.id === id) {
          queryDocumentSnapshot.ref.update(updates)
        }
      })
    }).then(() => {
      dispatch(editEvent(id, updates))
    })
  }
}

// REMOVE_EVENT
export const removeEvent = id => ({
  type: 'REMOVE_EVENT',
  id
})

export const startRemoveEvent = id => {
  return dispatch => {
    return db.collectionGroup('events').get().then(querySnapshot => {
      querySnapshot.forEach(queryDocumentSnapshot => {
        if (queryDocumentSnapshot.id === id) {
          queryDocumentSnapshot.ref.delete()
        }
      })
    }).then(() => {
      dispatch(removeEvent(id))
    })
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
    return db.collectionGroup('events').get().then(querySnapshot => {
      const events = []

      querySnapshot.forEach(queryDocumentSnapshot => {
        if (queryDocumentSnapshot.ref.parent.parent.parent.parent.id === uid) {
          events.push({
            id: queryDocumentSnapshot.id,
            tripId: queryDocumentSnapshot.ref.parent.parent.id,
            ...queryDocumentSnapshot.data()
          })
        }
      })

      dispatch(setEvents(events))
    })
  }
}