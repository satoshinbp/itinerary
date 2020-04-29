import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { removeTrip } from '../actions/trips'

const TripListItem = ({ dispatch, id, title, startDate, endDate, setTripId }) => {
  const confirmRemoveTrip = () => {
    const result = confirm('Are you sure you want to delete this trip?');

    if (result) {
      dispatch(removeTrip({ id }))
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
          startDate.isSame(endDate, 'day') ? (
            <span>
              {`${startDate.format('YYYY/MM/DD')}`}
            </span>
          ) : (
              <span>
                {`${startDate.format('YYYY/MM/DD')} - ${endDate.format('YYYY/MM/DD')}`}
              </span>
            )
        }
      </Link>
    </div>
  )
}

export default connect()(TripListItem)