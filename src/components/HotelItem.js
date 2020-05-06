import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import { removeHotel } from '../actions/hotels'

export const HotelItem = ({ dispatch, date, inOrOut, id, name, checkInDate, checkOutDate, checkInTime, checkOutTime, location, setHotelId }) => {
  const confirmRemoveHotel = () => {
    const result = confirm('Are you sure you want to delete this hotel?');

    if (result) {
      dispatch(removeHotel(id))
    }
  }

  return (
    <div className="schedule-list-item">
      <div className=" schedule-list-item__actions">
        <FontAwesomeIcon className="icon" icon="trash-alt" onClick={confirmRemoveHotel} />
      </div>
      <div className="schedule-list-item__time" onClick={() => setHotelId(id)}>
        {inOrOut === "in" && <FontAwesomeIcon className="icon show-for-desktop" icon="moon" />}
        {inOrOut === "out" && <FontAwesomeIcon className="icon show-for-desktop" icon="sun" />}
        {date.isSame(moment(checkInDate), 'day') && `Check In: ${moment(checkInTime).format('HH:mm')}~`}
        {date.isSame(moment(checkOutDate), 'day') && `Check Out: ~${moment(checkOutTime).format('HH:mm')}`}
      </div>
      <div className="schedule-list-item__title" onClick={() => setHotelId(id)}>
        <FontAwesomeIcon className="icon show-for-desktop" icon="hotel" />
        {name}
      </div>
      <div className="schedule-list-item__location" onClick={() => setHotelId(id)}>
        {location && <FontAwesomeIcon className="icon show-for-desktop" icon="map-marker-alt" />}
        {location}
      </div>
    </div>
  )
}

export default connect()(HotelItem);