import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import { ScheduleList } from '../../components/ScheduleList'
import events from '../fixtures/events'
import hotels from '../fixtures/hotels'

let setEventId, setHotelId, setDateOnEdit, wrapper
const date = moment().add(1, 'day')

describe('for 2nd day of trips[0]', () => {
  beforeEach(() => {
    setEventId = jest.fn()
    setHotelId = jest.fn()
    setDateOnEdit = jest.fn()
    wrapper = shallow(
      <ScheduleList
        date={date}
        events={[events[0]]}
        hotelsIn={[hotels[0]]}
        hotelsOut={[hotels[2]]}
        setEventId={setEventId}
        setHotelId={setHotelId}
        setDateOnEdit={setDateOnEdit}
      />
    )
  })

  test('should render ScheduleList correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should set event id and date on add event click', () => {
    wrapper.find('button').at(0).simulate('click')
    expect(setEventId).toBeCalledWith(true)
    expect(setDateOnEdit).toBeCalledWith(date)
  })

  test('should set hotel id and date on add hotel click', () => {
    wrapper.find('button').at(0).simulate('click')
    expect(setEventId).toBeCalledWith(true)
    expect(setDateOnEdit).toBeCalledWith(date)
  })
})

test('for 2nd day of trips[0] without events, hotels', () => {
  setEventId = jest.fn()
  setHotelId = jest.fn()
  setDateOnEdit = jest.fn()
  wrapper = shallow(
    <ScheduleList
      date={date}
      events={[]}
      hotelsIn={[]}
      hotelsOut={[]}
      setEventId={setEventId}
      setHotelId={setHotelId}
      setDateOnEdit={setDateOnEdit}
    />
  )
  expect(wrapper).toMatchSnapshot()
})