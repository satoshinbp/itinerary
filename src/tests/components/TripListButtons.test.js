import React from 'react'
import { shallow } from 'enzyme'
import { TripListButtons } from '../../components/TripListButtons'

let showUpcomingTrip, showPastTrip, showAllTrip, wrapper

describe.each(['upcoming', 'past', 'all'])('initial filter %s', initFilter => {
  beforeEach(() => {
    showUpcomingTrip = jest.fn()
    showPastTrip = jest.fn()
    showAllTrip = jest.fn()
    wrapper = shallow(
      <TripListButtons
        showUpcomingTrip={showUpcomingTrip}
        showPastTrip={showPastTrip}
        showAllTrip={showAllTrip}
        filter={initFilter}
      />
    )
  })

  test('should render TripListButtons correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('filter changed to upcoming', () => {
    wrapper.find('select').simulate('change', {
      target: { value: 'upcoming' }
    })
    expect(showUpcomingTrip).toBeCalled()
  })

  test('filter changed to past', () => {
    wrapper.find('select').simulate('change', {
      target: { value: 'past' }
    })
    expect(showPastTrip).toBeCalled()
  })

  test('filter changed to all', () => {
    wrapper.find('select').simulate('change', {
      target: { value: 'all' }
    })
    expect(showAllTrip).toBeCalled()
  })
})

test('should set TripId when trip add button clicked', () => {
  const setTripId = jest.fn()
  wrapper = shallow(<TripListButtons setTripId={setTripId} />)
  wrapper.find('button').simulate('click')
  expect(setTripId).toBeCalledWith(expect.any(String))
})