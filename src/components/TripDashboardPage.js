import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import TripListButtons from './TripListButtons'
import TripList from './TripList'
import TripForm from './TripForm'
import { startAddTrip, editTrip } from '../actions/trips'

export const TripDashboardPage = props => {
  const [tripId, setTripId] = React.useState(undefined)

  const onSubmit = trip => {
    if (props.trips.find(trip => trip.id === tripId)) {
      props.editTrip(tripId, trip)
    } else {
      props.startAddTrip(trip)
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
          trip={props.trips.find(trip => trip.id === tripId)}
        />
      </Modal>
    </div>
  )
}

Modal.setAppElement('body')

const mapStateToProps = state => ({
  trips: state.trips
})

const mapDispatchToProps = dispatch => ({
  startAddTrip: trip => dispatch(startAddTrip(trip)),
  editTrip: (id, updates) => dispatch(editTrip(id, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(TripDashboardPage)