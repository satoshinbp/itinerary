import React from 'react'
import { shallow } from 'enzyme'
import { EventItem } from '../../components/EventItem'
import events from '../fixtures/events'

let startRemoveEvent, setEventId, wrapper

beforeEach(() => {
  startRemoveEvent = jest.fn()
  setEventId = jest.fn()
  wrapper = shallow(<EventItem startRemoveEvent={startRemoveEvent} {...events[0]} setEventId={setEventId} />)
})

test('should render EventItem correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should remove event when trash icon clicked', () => {
  window.confirm = jest.fn(() => true)
  wrapper.find({ icon: 'trash-alt' }).simulate('click')
  expect(startRemoveEvent).toBeCalledWith(events[0].tripId, events[0].id)
})

test('should set event id trip on click time', () => {
  wrapper.find(".schedule-list-item__time").simulate('click')
  expect(setEventId).toBeCalledWith(events[0].id)
})

test('should set event id trip on click title', () => {
  wrapper.find(".schedule-list-item__title").simulate('click')
  expect(setEventId).toBeCalledWith(events[0].id)
})

test('should set event id trip on click location', () => {
  wrapper.find(".schedule-list-item__location").simulate('click')
  expect(setEventId).toBeCalledWith(events[0].id)
})