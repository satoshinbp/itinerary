import uuid from 'uuid';
import moment from 'moment';

// ADD_EVENT
export const addEvent = (
  {
    tripId = '',
    title = '',
    date = moment().startOf('day'),
    startTime = moment().startOf('day'),
    endTime = moment().startOf('day'),
    location = '',
    note = ''
  } = {}
) => ({
  type: 'ADD_EVENT',
  event: {
    id: uuid(),
    tripId,
    title,
    date,
    startTime,
    endTime,
    location,
    note
  }
});

// EDIT_EVENT
export const editEvent = (id, updates) => ({
  type: 'EDIT_EVENT',
  id,
  updates
});

// REMOVE_EVENT
export const removeEvent = ({ id } = {}) => ({
  type: 'REMOVE_EVENT',
  id
});