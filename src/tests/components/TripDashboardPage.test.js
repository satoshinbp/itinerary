import React from 'react'
import { shallow } from 'enzyme'
import { TripDashboardPage } from '../../components/TripDashboardPage'
import trips from '../fixtures/trips'

let setState, useStateSpy, wrapper
beforeEach(() => {
  setState = jest.fn()
  useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation(init => [init, setState])
})

test('should render TripDashboardPage correctly', () => {
  const wrapper = shallow(<TripDashboardPage trips={trips} />)
  expect(wrapper).toMatchSnapshot()
})

test('should close Modal on request close', () => {
  const wrapper = shallow(<TripDashboardPage trips={trips} />)
  wrapper.find('Modal').prop('onRequestClose')()
  expect(setState).toBeCalledWith(undefined)
})

// test for Modal open case to be implemented