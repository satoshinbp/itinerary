import React, { useState } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import moment from 'moment'
import ScheduleList from './ScheduleList'
import EventForm from './EventForm'
import HotelForm from './HotelForm'
import { addEvent, editEvent } from '../actions/events'
import { addHotel, editHotel } from '../actions/hotels'

const ScheduleDashboardPage = ({ trip, events, hotels, addEvent, editEvent, addHotel, editHotel }) => {
  const [eventId, setEventId] = useState(undefined)
  const [hotelId, setHotelId] = useState(undefined)
  const [eventDate, setEventDate] = useState(moment())

  const listAllDate = (dates, params_start, params_end) => {
    let start = moment(params_start)

    while (start.diff(params_end, 'day') <= 0) {
      if (!dates.find(date => date.isSame(start, 'day'))) {
        dates.push(moment(start))
      }
      start.add(1, 'day')
    }
  }

  let dates = []
  listAllDate(dates, trip.startDate, trip.endDate)
  events.map(event => {
    if (!dates.find(date => date.isSame(event.date, 'day'))) {
      dates.push(moment(event.date))
    }
  })
  hotels.map(hotel => listAllDate(dates, hotel.checkInDate, hotel.checkOutDate))
  dates.sort((a, b) => a.isAfter(b) ? 1 : -1)

  return (
    <div className="container">
      <div className="page-header__title">
        <h3>{trip.title}</h3>
        <p>
          {
            trip.startDate.isSame(trip.endDate, 'day') ? (
              `${trip.startDate.format('YYYY/MM/DD')}`
            ) : (
                `${trip.startDate.format('YYYY/MM/DD')} - ${trip.endDate.format('YYYY/MM/DD')}`
              )
          }
        </p>
      </div>
      {
        dates.map((date, index) => (
          <ScheduleList
            key={index}
            date={date}
            tripId={trip.id}
            setEventId={setEventId}
            setHotelId={setHotelId}
            setEventDate={setEventDate}
          />
        ))
      }
      <Modal
        className="modal"
        isOpen={!!eventId || !!hotelId}
        contentLabel="Event/Hotel Form"
        onRequestClose={() => {
          setEventId(undefined)
          setHotelId(undefined)
          setEventDate(moment())
        }}
        closeTimeoutMS={200}
      >
        {
          !!eventId ? (
            <EventForm
              onSubmit={event => {
                if (events.find(event => event.id === eventId)) {
                  editEvent(eventId, event)
                } else {
                  addEvent(event)
                }
                setEventId(undefined)
                setEventDate(moment())
              }}
              id={eventId}
              tripId={trip.id}
              date={eventDate}
              event={events.find(event => event.id === eventId)}
            />
          ) : (
              <HotelForm
                onSubmit={hotel => {
                  if (hotels.find(hotel => hotel.id === hotelId)) {
                    editHotel(hotelId, hotel)
                  } else {
                    addHotel(hotel)
                  }
                  setHotelId(undefined)
                  setEventDate(moment())
                }}
                id={hotelId}
                tripId={trip.id}
                date={eventDate}
                hotel={hotels.find(hotel => hotel.id === hotelId)}
              />
            )
        }
      </Modal>
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  trip: state.trips.find(trip => trip.id === props.match.params.id),
  events: state.events.filter(event => event.tripId === props.match.params.id),
  hotels: state.hotels.filter(hotel => hotel.tripId === props.match.params.id)
})

const mapDispatchToProps = dispatch => ({
  addEvent: event => dispatch(addEvent(event)),
  editEvent: (id, updates) => dispatch(editEvent(id, updates)),
  addHotel: hotel => dispatch(addHotel(hotel)),
  editHotel: (id, updates) => dispatch(editHotel(id, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDashboardPage)