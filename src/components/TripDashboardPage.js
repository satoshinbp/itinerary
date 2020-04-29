import React, { useState } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import TripListButtons from './TripListButtons'
import TripList from './TripList'
import TripForm from './TripForm'
import { addTrip, editTrip } from '../actions/trips'

const TripDashboardPage = (props) => {
  const [tripId, setTripId] = useState(undefined)

  const onSubmit = (trip) => {
    if (props.trips.find((trip) => trip.id === tripId)) {
      props.editTrip(tripId, trip)
    } else {
      props.addTrip(trip)
    }
    setTripId(undefined)
  }

  return (
    <div className="container">
      <TripListButtons setTripId={setTripId} />
      <TripList setTripId={setTripId} />
      <Modal
        isOpen={!!tripId}
        contentLabel="Add/Edit Trip"
        onRequestClose={() => setTripId(undefined)}
        closeTimeoutMS={200}
        className="modal"
      >
        <TripForm
          onSubmit={onSubmit}
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