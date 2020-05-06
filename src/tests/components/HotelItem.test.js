import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import { removeHotel } from '../../actions/hotels'
import { HotelItem } from '../../components/HotelItem'
import hotels from '../fixtures/hotels'

let dispatch, setHotelId, inOrOut, hotel, wrapper
const date = moment().add(1, 'day')

describe('for 2nd day of trips[0], check in hotels[0]', () => {
  beforeEach(() => {
    dispatch = jest.fn()
    setHotelId = jest.fn()
    inOrOut = "in"
    hotel = hotels[0]
    wrapper = shallow(<HotelItem dispatch={dispatch} date={date} {...hotel} setHotelId={setHotelId} inOrOut={inOrOut} />)
  })

  test('should render HotelItem correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should remove hotel when trash icon clicked', () => {
    window.confirm = jest.fn(() => true)
    wrapper.find({ icon: 'trash-alt' }).simulate('click')
    expect(dispatch).toBeCalledWith(removeHotel(hotel.id))
  })

  test('should set hotel id trip on click time', () => {
    wrapper.find(".schedule-list-item__time").simulate('click')
    expect(setHotelId).toBeCalledWith(hotel.id)
  })

  test('should set hotel id trip on click title', () => {
    wrapper.find(".schedule-list-item__title").simulate('click')
    expect(setHotelId).toBeCalledWith(hotel.id)
  })

  test('should set hotel id trip on click location', () => {
    wrapper.find(".schedule-list-item__location").simulate('click')
    expect(setHotelId).toBeCalledWith(hotel.id)
  })
})

describe('for 2nd day of trips[0], check out hotels[2]', () => {
  beforeEach(() => {
    dispatch = jest.fn()
    setHotelId = jest.fn()
    inOrOut = "out"
    hotel = hotels[2]
    wrapper = shallow(<HotelItem dispatch={dispatch} date={date} {...hotel} setHotelId={setHotelId} inOrOut={inOrOut} />)
  })

  test('should render HotelItem correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should remove hotel when trash icon clicked', () => {
    window.confirm = jest.fn(() => true)
    wrapper.find({ icon: 'trash-alt' }).simulate('click')
    expect(dispatch).toBeCalledWith(removeHotel(hotel.id))
  })

  test('should set hotel id trip on click time', () => {
    wrapper.find(".schedule-list-item__time").simulate('click')
    expect(setHotelId).toBeCalledWith(hotel.id)
  })

  test('should set hotel id trip on click title', () => {
    wrapper.find(".schedule-list-item__title").simulate('click')
    expect(setHotelId).toBeCalledWith(hotel.id)
  })

  test('should set hotel id trip on click location', () => {
    wrapper.find(".schedule-list-item__location").simulate('click')
    expect(setHotelId).toBeCalledWith(hotel.id)
  })
})

describe('for 2nd day of trips[0], stay in hotels[3], morning', () => {
  beforeEach(() => {
    dispatch = jest.fn()
    setHotelId = jest.fn()
    inOrOut = "in"
    hotel = hotels[3]
    wrapper = shallow(<HotelItem dispatch={dispatch} date={date} {...hotel} setHotelId={setHotelId} inOrOut={inOrOut} />)
  })

  test('should render HotelItem correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should remove hotel when trash icon clicked', () => {
    window.confirm = jest.fn(() => true)
    wrapper.find({ icon: 'trash-alt' }).simulate('click')
    expect(dispatch).toBeCalledWith(removeHotel(hotel.id))
  })

  test('should set hotel id trip on click time', () => {
    wrapper.find(".schedule-list-item__time").simulate('click')
    expect(setHotelId).toBeCalledWith(hotel.id)
  })

  test('should set hotel id trip on click title', () => {
    wrapper.find(".schedule-list-item__title").simulate('click')
    expect(setHotelId).toBeCalledWith(hotel.id)
  })

  test('should set hotel id trip on click location', () => {
    wrapper.find(".schedule-list-item__location").simulate('click')
    expect(setHotelId).toBeCalledWith(hotel.id)
  })
})

describe('for 2nd day of trips[0], stay in hotels[3], night', () => {
  beforeEach(() => {
    dispatch = jest.fn()
    setHotelId = jest.fn()
    inOrOut = "out"
    hotel = hotels[3]
    wrapper = shallow(<HotelItem dispatch={dispatch} date={date} {...hotel} setHotelId={setHotelId} inOrOut={inOrOut} />)
  })

  test('should render HotelItem correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should remove hotel when trash icon clicked', () => {
    window.confirm = jest.fn(() => true)
    wrapper.find({ icon: 'trash-alt' }).simulate('click')
    expect(dispatch).toBeCalledWith(removeHotel(hotel.id))
  })

  test('should set hotel id trip on click time', () => {
    wrapper.find(".schedule-list-item__time").simulate('click')
    expect(setHotelId).toBeCalledWith(hotel.id)
  })

  test('should set hotel id trip on click title', () => {
    wrapper.find(".schedule-list-item__title").simulate('click')
    expect(setHotelId).toBeCalledWith(hotel.id)
  })

  test('should set hotel id trip on click location', () => {
    wrapper.find(".schedule-list-item__location").simulate('click')
    expect(setHotelId).toBeCalledWith(hotel.id)
  })
})