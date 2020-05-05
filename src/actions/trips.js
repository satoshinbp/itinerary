import moment from 'moment'

export const addTrip = (
  {
    id = '',
    title = '',
    startDate = 0,
    endDate = 0,
    note = ''
  } = {}
) => ({
  type: 'ADD_TRIP',
  trip: {
    id,
    title,
    startDate,
    endDate,
    note
  }
})

export const editTrip = (id, updates) => ({
  type: 'EDIT_TRIP',
  id,
  updates
})

export const removeTrip = (id = '') => ({
  type: 'REMOVE_TRIP',
  id
})