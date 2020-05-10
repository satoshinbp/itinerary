import React from 'react'
import { shallow } from 'enzyme'
import { TripListItem } from '../../components/TripListItem'
import trips from '../fixtures/trips'

test('should render TripListItem correctly for multi days trip', () => {
  const wrapper = shallow(<TripListItem {...trips[0]} />)
  expect(wrapper).toMatchSnapshot()
})

test('should render TripListItem correctly for one day trip', () => {
  const wrapper = shallow(<TripListItem {...trips[2]} />)
  expect(wrapper).toMatchSnapshot()
})

test('should set tripId when edit icon clicked', () => {
  const setTripId = jest.fn()
  const wrapper = shallow(<TripListItem {...trips[0]} setTripId={setTripId} />)
  wrapper.find({ icon: 'edit' }).simulate('click')
  expect(setTripId).toBeCalledWith(trips[0].id)
})

test('should remove trip when trash icon clicked', () => {
  const startRemoveTrip = jest.fn()
  const wrapper = shallow(<TripListItem startRemoveTrip={startRemoveTrip} {...trips[0]} />)
  window.confirm = jest.fn(() => true)
  wrapper.find({ icon: 'trash-alt' }).simulate('click')
  expect(startRemoveTrip).toBeCalledWith(trips[0].id)
})