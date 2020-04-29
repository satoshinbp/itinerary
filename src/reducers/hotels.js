const hotelsReducerDefaultState = []

export default (state = hotelsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_HOTEL':
      return [
        ...state,
        action.hotel
      ]
    case 'EDIT_HOTEL':
      return state.map((hotel) => {
        if (hotel.id === action.id) {
          return {
            ...hotel,
            ...action.updates
          }
        } else {
          return hotel
        }
      })
    case 'REMOVE_HOTEL':
      return state.filter(({ id }) => id !== action.id)
    default:
      return state
  }
}