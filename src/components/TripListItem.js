import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeTrip } from '../actions/trips';

const TripListItem = ({ dispatch, id, title, startDate, endDate, activateEditTrip }) => (
  <div className="list-item">
    <div className="list-item__actions">
      <FontAwesomeIcon
        className="icon show-for-desktop"
        icon="edit"
        onClick={() => { activateEditTrip(id) }}
      />
      <FontAwesomeIcon
        className="icon show-for-desktop"
        icon="trash-alt"
        onClick={() => { dispatch(removeTrip({ id })) }}
      />
    </div>
    <Link className="list-item__title" to={`/schedule/${id}`}>{title}</Link>
    <Link className="list-item__dates" to={`/schedule/${id}`}>
      {
        startDate.isSame(endDate, 'day') ?
          <span>{`${startDate.format('YYYY/MM/DD')}`}</span> :
          <span>{`${startDate.format('YYYY/MM/DD')} - ${endDate.format('YYYY/MM/DD')}`}</span>
      }
    </Link>
  </div>
);

export default connect()(TripListItem);