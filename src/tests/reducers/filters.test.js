import filtersReducer from '../../reducers/filters'

test('should set default state', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual('upcoming')
})

test('should set filter as upcoming trips', () => {
  const action = { type: 'SHOW_UPCOMING_TRIP' }
  const state = filtersReducer('all', action)
  expect(state).toEqual('upcoming')
})

test('should set filter as past trips', () => {
  const action = { type: 'SHOW_PAST_TRIP' }
  const state = filtersReducer('upcoming', action)
  expect(state).toEqual('past')
})

test('should set filter as all trips', () => {
  const action = { type: 'SHOW_ALL_TRIP' }
  const state = filtersReducer('past', action)
  expect(state).toEqual('all')
})