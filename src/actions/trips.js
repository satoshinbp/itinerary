import moment from 'moment'

export const addTrip = (
  {
    id = '',
    title = '',
    startDate = moment(),
    endDate = moment()
  } = {}
) => ({
  type: 'ADD_TRIP',
  trip: {
    id,
    title,
    startDate,
    endDate
  }
})

export const editTrip = (id, updates) => ({
  type: 'EDIT_TRIP',
  id,
  updates
})

export const removeTrip = ({ id } = {}) => ({
  type: 'REMOVE_TRIP',
  id
})
