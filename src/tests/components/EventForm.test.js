import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import EventForm from '../../components/EventForm'
import events from '../fixtures/events'

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

test('should render EventForm correctly', () => {
  const wrapper = shallow(<EventForm />)
  expect(wrapper).toMatchSnapshot()
})

test('should render EventForm correctly with trip data', () => {
  const wrapper = shallow(<EventForm event={events[0]} />)
  expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<EventForm />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(setState).toBeCalledWith(expect.any(String))
})

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(<EventForm onSubmit={onSubmitSpy} event={events[0]} />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(setState).toBeCalledWith('')
  expect(onSubmitSpy).lastCalledWith({
    title: events[0].title,
    date: events[0].date,
    startTime: events[0].startTime,
    endTime: events[0].endTime,
    location: events[0].location,
    note: events[0].note
  })
})

test('should set title on input change', () => {
  const value = 'New Title'
  const wrapper = shallow(<EventForm />)
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  })
  expect(setState).toBeCalledWith(value)
})

test('should set location on input change', () => {
  const value = 'New Location'
  const wrapper = shallow(<EventForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  })
  expect(setState).toBeCalledWith(value)
})

test('should set note on textarea change', () => {
  const value = 'New Note'
  const wrapper = shallow(<EventForm />)
  wrapper.find('textarea').simulate('change', {
    target: { value }
  })
  expect(setState).toBeCalledWith(value)
})

test('should set date on date change', () => {
  const date = moment(0)
  const wrapper = shallow(<EventForm />)
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(date)
  expect(setState).toBeCalledWith(moment(date).startOf('day'))
})

test('should set calendar focus on change', () => {
  const focused = true
  const wrapper = shallow(<EventForm />)
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused })
  expect(setState).toBeCalledWith(focused)
})

test('should set start time on change', () => {
  const time = moment().hour(23).minutes(59)
  const wrapper = shallow(<EventForm event={events[0]} />)
  wrapper.find('PickerWithState').at(0).prop('onChange')(time)
  expect(setState).nthCalledWith(1, time)
  expect(setState).nthCalledWith(2, time)
})

test('should set end time on change', () => {
  const time = moment().hour(1).minutes(0)
  const wrapper = shallow(<EventForm />)
  wrapper.find('PickerWithState').at(1).prop('onChange')(time)
  expect(setState).nthCalledWith(1, time)
  expect(setState).nthCalledWith(2, time)
})