import moment from 'moment'

export const addEvent = (
  {
    id='',
    tripId = '',
    title = '',
    date = 0,
    startTime = 0,
    endTime = 0,
    location = '',
    note = ''
  } = {}
) => ({
  type: 'ADD_EVENT',
  event: {
    id,
    tripId,
    title,
    date,
    startTime,
    endTime,
    location,
    note
  }
})

export const editEvent = (id, updates) => ({
  type: 'EDIT_EVENT',
  id,
  updates
})

export const removeEvent = (id = '') => ({
  type: 'REMOVE_EVENT',
  id
})