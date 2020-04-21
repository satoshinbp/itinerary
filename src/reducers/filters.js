const filtersReducerDefaultState = {
  filter: 'upcoming'
}

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SHOW_UPCOMING_TRIP':
      return {
        filter: 'upcoming'
      }
    case 'SHOW_PAST_TRIP':
      return {
        filter: 'past'
      }
    case 'SHOW_ALL_TRIP':
      return {
        filter: 'all'
      }
    default:
      return state
  }
}
