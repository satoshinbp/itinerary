import React, { useState } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import TripListFilters from './TripListFilters'
import TripList from './TripList'
import TripForm from './TripForm'
import { addTrip, editTrip } from '../actions/trips'

const TripDashboardPage = (props) => {
  const [tripId, setTripId] = useState(undefined)

  return (
    <div className="container">
      <div className="btn-bar">
        <TripListFilters />
        <button className="btn-push" onClick={() => setTripId(uuidv4())}>Add Trip</button>
      </div>
      <TripList setTripId={setTripId} />
      <Modal
        isOpen={!!tripId}
        contentLabel="Add/Edit Trip"
        onRequestClose={() => setTripId(undefined)}
        closeTimeoutMS={200}
        className="modal"
      >
        <TripForm
          onSubmit={(value) => {
            if (props.trips.find((trip) => trip.id === tripId)) {
              props.editTrip(tripId, value)
            } else {
              props.addTrip(value)
            }
            setTripId(undefined)
          }}
          tripId={tripId}
          trip={props.trips.find((trip) => trip.id === tripId)}
        />
      </Modal>
    </div>
  );
}

Modal.setAppElement('body')

const mapStateToProps = state => ({ trips: state.trips })

const mapDispatchToProps = dispatch => ({
  addTrip: trip => dispatch(addTrip(trip)),
  editTrip: (id, updates) => dispatch(editTrip(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(TripDashboardPage)