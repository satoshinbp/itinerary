import uuid from 'uuid';
import moment from 'moment';

// ADD_TRIP
export const addTrip = (
  {
    title = '',
    startDate = moment(),
    endDate = moment(),
    location = '',
    note = ''
  } = {}
) => ({
  type: 'ADD_TRIP',
  trip: {
    id: uuid(),
    title,
    startDate,
    endDate,
    location,
    note
  }
});

// EDIT_TRIP
export const editTrip = (id, updates) => ({
  type: 'EDIT_TRIP',
  id,
  updates
});

// REMOVE_TRIP
export const removeTrip = ({ id } = {}) => ({
  type: 'REMOVE_TRIP',
  id
});

// ADD_EVENT_TO_TRIP
// EDIT_EVENT_OF_TRIP
// REMOVE_EVENT_FROM_TRIP