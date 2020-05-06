import React from 'react'
import { shallow } from 'enzyme'
import trips from '../fixtures/trips'
import { TripDashboardPage } from '../../components/TripDashboardPage'

let addTrip, editTrip, setState, useStateSpy, wrapper
beforeEach(() => {
  addTrip = jest.fn()
  editTrip = jest.fn()
  setState = jest.fn()
  useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation(init => [init, setState])
  wrapper = shallow(<TripDashboardPage trips={trips} addTrip={addTrip} editTrip={editTrip} />)
})

test('should render TripDashboardPage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should close Modal on request close', () => {
  wrapper.find('Modal').prop('onRequestClose')()
  expect(setState).toBeCalledWith(undefined)
})

// test for Modal open case to be implemented

// test('should submit TripForm on submit', () => {
//   wrapper.find('TripForm').prop('onSubmit')(trips[0])
//   expect(editTrip).toBeCalledWith(trips[0].id, trips[0])
//   expect(setState).toBeCalledWith(undefined)
// })