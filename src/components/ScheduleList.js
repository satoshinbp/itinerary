import React from 'react'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import EventItem from './EventItem'
import HotelItem from './HotelItem'

const ScheduleList = (props) => {
  return (
    <React.Fragment>
      <div className="schedule-list-header">
        <div>{props.date.format('YYYY/MM/DD')}</div>
        <div>
          <button
            className="btn-push btn-push--small"
            onClick={() => {
              props.setEventId(uuidv4())
              props.setEventDate(props.date)
            }}
          >
            Add Event
          </button>
          <button
            className="btn-push btn-push--small"
            onClick={() => {
              props.setHotelId(uuidv4())
              props.setEventDate(props.date)
            }}
          >
            Add Hotel
        </button>
        </div>
      </div>
      <div className="schedule-list-body">
        {
          props.hotelsOut.length !== 0 && props.hotelsOut.map(hotel =>
            <HotelItem key={hotel.id} {...hotel} setHotelId={props.setHotelId} date={props.date} inOrOut="out" />)
        }
        {
          props.events.length !== 0 && props.events.map(event =>
            <EventItem key={event.id} {...event} setEventId={props.setEventId} />)
        }
        {
          props.hotelsIn.length !== 0 && props.hotelsIn.map(hotel =>
            <HotelItem key={hotel.id} {...hotel} setHotelId={props.setHotelId} date={props.date} inOrOut="in"/>)
        }
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state, props) => ({
  events: state.events
    .filter(event =>
      event.tripId === props.tripId && moment(event.date).isSame(props.date, 'day'))
    .sort((a, b) =>
      moment(a.startTime).isAfter(moment(b.startTime)) ? 1 : -1),
  hotelsIn: state.hotels
    .filter(hotel =>
      hotel.tripId === props.tripId && props.date.isBetween(moment(hotel.checkInDate), moment(hotel.checkOutDate), 'day', '[)')),
  hotelsOut: state.hotels
    .filter(hotel =>
      hotel.tripId === props.tripId && props.date.isBetween(moment(hotel.checkInDate), moment(hotel.checkOutDate), 'day', '(]'))
})

export default connect(mapStateToProps)(ScheduleList)