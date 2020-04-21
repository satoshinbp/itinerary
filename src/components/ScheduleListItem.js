import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { removeEvent } from '../actions/events'

const ScheduleListItem = ({ dispatch, id, title, startTime, endTime, setEventId}) => (
  <div className="schedule-item">
    <FontAwesomeIcon
      className="icon show-for-desktop"
      icon="trash-alt"
      onClick={() => dispatch(removeEvent({ id }))}
    />
    <div onClick={() => setEventId(id)}>{startTime.format('HH:mm')} - {endTime.format('HH:mm')}</div>
    <div onClick={() => setEventId(id)}>{title}</div>
  </div>
)

export default connect()(ScheduleListItem);