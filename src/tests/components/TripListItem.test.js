import React from 'react'
import { shallow } from 'enzyme'
import { TripListItem } from '../../components/TripListItem'
import { removeTrip } from '../../actions/trips'
import trips from '../fixtures/trips'

let dispatch, setTripId, wrapper

beforeEach(() => {
  setTripId = jest.fn()
  dispatch = jest.fn()
})

test('should render TripListItem for multi days trip', () => {
  wrapper = shallow(<TripListItem dispatch={dispatch} {...trips[0]} setTripId={setTripId} />)
  expect(wrapper).toMatchSnapshot()
})

test('should render TripListItem for one day trip', () => {
  wrapper = shallow(<TripListItem dispatch={dispatch} {...trips[2]} setTripId={setTripId} />)
  expect(wrapper).toMatchSnapshot()
})

test('should set tripId when edit icon clicked', () => {
  wrapper = shallow(<TripListItem dispatch={dispatch} {...trips[0]} setTripId={setTripId} />)
  wrapper.find({ icon: 'edit' }).simulate('click')
  expect(setTripId).toBeCalledWith(trips[0].id)
})

test('should remove trip when trash icon clicked', () => {
  wrapper = shallow(<TripListItem dispatch={dispatch} {...trips[0]} setTripId={setTripId} />)
  window.confirm = jest.fn(() => true)
  wrapper.find({ icon: 'trash-alt' }).simulate('click')
  expect(dispatch).toBeCalledWith(removeTrip(trips[0].id))
})