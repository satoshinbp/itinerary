import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import TripForm from '../../components/TripForm'
import trips from '../fixtures/trips'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

let setState, useStateSpy

beforeEach(() => {
  setState = jest.fn()
  useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation(init => [init, setState])
})

test('should render TripForm correctly', () => {
  const wrapper = shallow(<TripForm />)
  expect(wrapper).toMatchSnapshot()
})

test('should render TripForm correctly with trip data', () => {
  const wrapper = shallow(<TripForm trip={trips[1]} />)
  expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<TripForm />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(setState).toBeCalledWith(expect.any(String))
})

test('should set title on input change', () => {
  const value = 'New Title'
  const wrapper = shallow(<TripForm />)
  wrapper.find('input').simulate('change', {
    target: { value }
  })
  expect(setState).toBeCalledWith(value)
})

test('should set note on textarea change', () => {
  const value = 'New Note'
  const wrapper = shallow(<TripForm />)
  wrapper.find('textarea').simulate('change', {
    target: { value }
  })
  expect(setState).toBeCalledWith(value)
})

test('should set date on date change', () => {
  const startDate = moment(0)
  const endDate = moment(1000)
  const wrapper = shallow(<TripForm />)
  expect(wrapper.find('withStyles(DateRangePicker)').length).toBe(1)
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate })
  expect(setState).toBeCalledWith(startDate)
  expect(setState).toBeCalledWith(endDate)
})

test('should set calendar focus on change', () => {
  const focusedInput = 'startDate'
  const wrapper = shallow(<TripForm />)
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focusedInput)
  expect(setState).toBeCalledWith(focusedInput)
})

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(<TripForm trip={trips[0]} onSubmit={onSubmitSpy} />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  })
  expect(setState).toBeCalledWith('')
  expect(onSubmitSpy).lastCalledWith({
    title: trips[0].title,
    startDate: trips[0].startDate,
    endDate: trips[0].endDate,
    note: trips[0].note
  })
})
