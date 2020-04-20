import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

// ADD_TRIP
export const addTrip = (
  {
    title = '',
    startDate = moment(),
    endDate = moment()
  } = {}
) => ({
  type: 'ADD_TRIP',
  trip: {
    id: uuidv4(),
    title,
    startDate,
    endDate
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
