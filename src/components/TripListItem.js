import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { removeTrip } from '../actions/trips';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TripListItem = ({ dispatch, id, title, startDate, endDate, location }) => (
  <div className="list-item">
    <Link className="list-item__title" to={`/edit/${id}`}>{title}</Link>
    <Link className="list-item__dates" to={`/edit/${id}`}>{
      moment(startDate).diff(moment(endDate)) === 0 ?
        <span>{`${moment(startDate).format('YYYY/MM/DD')}`}</span> :
        <span>{`${moment(startDate).format('YYYY/MM/DD')} - ${moment(endDate).format('YYYY/MM/DD')}`}</span>
    }</Link>
    <Link className="list-item__location" to={`/edit/${id}`}>{location}</Link>
    <div className="list-item__delete show-for-desktop">
      <FontAwesomeIcon
        className="delete-icon"
        icon="trash-alt"
        onClick={() => {
          dispatch(removeTrip({ id }));
        }}
      />
    </div>
  </div>
);

export default connect()(TripListItem);
