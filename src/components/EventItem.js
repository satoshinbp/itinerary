import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import { startRemoveEvent } from '../actions/events'

export const EventItem = ({ tripId, id, title, startTime, endTime, location, setEventId, startRemoveEvent }) => {
  const confirmRemoveEvent = () => {
    const result = confirm('Are you sure you want to delete this event?');

    if (result) {
      startRemoveEvent(tripId, id)
    }
  }

  return (
    <div className="schedule-list-item">
      <div className=" schedule-list-item__actions">
        <FontAwesomeIcon className="icon" icon="trash-alt" onClick={confirmRemoveEvent} />
      </div>
      <div className="schedule-list-item__time" onClick={() => setEventId(id)}>
        <FontAwesomeIcon className="icon show-for-desktop" icon="clock" />
        {moment(startTime).format('HH:mm')} ~ {moment(endTime).format('HH:mm')}
      </div>
      <div className="schedule-list-item__title" onClick={() => setEventId(id)}>
        {title}
      </div>
      <div className="schedule-list-item__location" onClick={() => setEventId(id)}>
        {location && <FontAwesomeIcon className="icon show-for-desktop" icon="map-marker-alt" />}
        {location}
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  startRemoveEvent: (tripId, id) => dispatch(startRemoveEvent(tripId, id))
})

export default connect(undefined, mapDispatchToProps)(EventItem);