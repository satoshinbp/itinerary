export const addHotel = (
  {
    id='',
    tripId = '',
    name = '',
    checkInDate = 0,
    checkOutDate = 0,
    checkInTime = 0,
    checkOutTime = 0,
    ETA = 0,
    ETD = 0,
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

export const removeHotel = (id = '') => ({
  type: 'REMOVE_HOTEL',
  id
})