import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import HotelForm from '../../components/HotelForm'
import hotels from '../fixtures/hotels'

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
    dispatchEvent: jest.fn()
  }))
})

let setState, useStateSpy

beforeEach(() => {
  setState = jest.fn()
  useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation(init => [init, setState])
})

test('should render HotelForm correctly', () => {
  const wrapper = shallow(<HotelForm />)
  expect(wrapper).toMatchSnapshot()
})

test('should render HotelForm correctly with trip data', () => {
  const wrapper = shallow(<HotelForm hotel={hotels[0]} />)
  expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<HotelForm />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(setState).toBeCalledWith(expect.any(String))
})

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(<HotelForm onSubmit={onSubmitSpy} hotel={hotels[0]} />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(setState).toBeCalledWith('')
  expect(onSubmitSpy).lastCalledWith({
    id: hotels[0].id,
    tripId: hotels[0].tripId,
    name: hotels[0].name,
    checkInDate: hotels[0].checkInDate,
    checkOutDate: hotels[0].checkOutDate,
    checkInTime: hotels[0].checkInTime,
    checkOutTime: hotels[0].checkOutTime,
    ETA: hotels[0].ETA,
    ETD: hotels[0].ETD,
    location: hotels[0].location,
    note: hotels[0].note
  })
})

test('should set name on input change', () => {
  const value = 'New Name'
  const wrapper = shallow(<HotelForm />)
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  })
  expect(setState).toBeCalledWith(value)
})

test('should set location on input change', () => {
  const value = 'New Location'
  const wrapper = shallow(<HotelForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  })
  expect(setState).toBeCalledWith(value)
})

test('should set note on textarea change', () => {
  const value = 'New Note'
  const wrapper = shallow(<HotelForm />)
  wrapper.find('textarea').simulate('change', {
    target: { value }
  })
  expect(setState).toBeCalledWith(value)
})

test('should set date on date change', () => {
  const startDate = moment(0)
  const endDate = moment(1000)
  const wrapper = shallow(<HotelForm />)
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate })
  expect(setState).toBeCalledWith(moment(startDate).startOf('day'))
  expect(setState).toBeCalledWith(moment(endDate).startOf('day'))
})

test('should set calendar focus on change', () => {
  const focusedInput = 'startDate'
  const wrapper = shallow(<HotelForm />)
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focusedInput)
  expect(setState).toBeCalledWith(focusedInput)
})

test('should set check-in time on change', () => {
  const time = moment().hour(18).minutes(0)
  const wrapper = shallow(<HotelForm />)
  wrapper.find('PickerWithState').at(0).prop('onChange')(time)
  expect(setState).toBeCalledWith(time)
})

test('should set check-out time on change', () => {
  const time = moment().hour(9).minutes(0)
  const wrapper = shallow(<HotelForm />)
  wrapper.find('PickerWithState').at(1).prop('onChange')(time)
  expect(setState).toBeCalledWith(time)
})

test('should set ETA on change', () => {
  const time = moment().hour(17).minutes(0)
  const wrapper = shallow(<HotelForm />)
  wrapper.find('PickerWithState').at(2).prop('onChange')(time)
  expect(setState).toBeCalledWith(time)
})

test('should set ETD on change', () => {
  const time = moment().hour(10).minutes(0)
  const wrapper = shallow(<HotelForm />)
  wrapper.find('PickerWithState').at(3).prop('onChange')(time)
  expect(setState).toBeCalledWith(time)
})