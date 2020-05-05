const filtersReducerDefaultState = 'upcoming'

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SHOW_UPCOMING_TRIP':
      return 'upcoming'
    case 'SHOW_PAST_TRIP':
      return 'past'
    case 'SHOW_ALL_TRIP':
      return 'all'
    default:
      return state
  }
}
