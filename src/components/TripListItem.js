import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { startRemoveTrip } from '../actions/trips'

export const TripListItem = ({ startRemoveTrip, id, title, startDate, endDate, setTripId }) => {
  const confirmRemoveTrip = () => {
    const result = confirm('Are you sure you want to delete this trip?');

    if (result) {
      startRemoveTrip(id)
    }
  }

  return (
    <div className="trip-list-item">
      <div className="trip-list-item__actions">
        <FontAwesomeIcon
          className="icon"
          icon="edit"
          onClick={() => setTripId(id)}
        />
        <FontAwesomeIcon
          className="icon"
          icon="trash-alt"
          onClick={confirmRemoveTrip}
        />
      </div>
      <Link className="trip-list-item__title" to={`/schedule/${id}`}>{title}</Link>
      <Link className="trip-list-item__dates" to={`/schedule/${id}`}>
        {
          moment(startDate).isSame(moment(endDate), 'day') ? (
            <span>
              {`${moment(startDate).format('YYYY/MM/DD')}`}
            </span>
          ) : (
              <span>
                {`${moment(startDate).format('YYYY/MM/DD')} - ${moment(endDate).format('YYYY/MM/DD')}`}
              </span>
            )
        }
      </Link>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  startRemoveTrip: id => dispatch(startRemoveTrip(id))
})

export default connect(undefined, mapDispatchToProps)(TripListItem)