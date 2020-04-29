import moment from 'moment'

export const addHotel = (
  {
    id='',
    tripId = '',
    name = '',
    checkInDate = moment().startOf('day'),
    checkOutDate = moment().startOf('day').add(1, 'day'),
    checkInTime = moment().hour(15).minutes(0),
    checkOutTime = moment().add(1, 'day').hour(11).minutes(0),
    ETA = moment().hour(15).minutes(0),
    ETD = moment().add(1, 'day').hour(11).minutes(0),
    location ='',
    note = ''
  } = {}
) => ({
  type: 'ADD_HOTEL',
  hotel: {
    id,
    tripId,
    name,
    checkInDate,
    checkOutDate,
    checkInTime,
    checkOutTime,
    ETA,
    ETD,
    location,
    note
  }
})

export const editHotel = (id, updates) => ({
  type: 'EDIT_HOTEL',
  id,
  updates
})

export const removeHotel = ({ id } = {}) => ({
  type: 'REMOVE_HOTEL',
  id
})