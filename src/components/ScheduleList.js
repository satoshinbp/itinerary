import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import ScheduleListItem from './ScheduleListItem';
import EventForm from './EventForm';
import { addEvent, editEvent } from '../actions/events';

class ScheduleList extends React.Component {
  state = {
    addEventIsAvtivated: false,
    editEventId: undefined
  };

  activateAddEventDate = () => {
    this.setState(() => ({ addEventIsAvtivated: true }));
  };
  deactivateAddEventDate = () => {
    this.setState(() => ({ addEventIsAvtivated: false }));
  };
  setEditEventId = (id) => {
    this.setState(() => ({ editEventId: id }));
  };
  resetEditEventId = () => {
    this.setState(() => ({ editEventId: undefined }));
  };

  render() {
    return (
      <div>
        <div className="schedule-header">
          <div>{this.props.date.format('YYYY/MM/DD')}</div>
          <button className="btn-push btn-push--small" onClick={() => { this.activateAddEventDate() }}>Add Event</button>
        </div>
        <div className="schedule-body">
          {
            this.props.events.length === 0 ? (
              <div className="schedule-item schedule-item--message">
                <span>No events</span>
              </div>
            ) : (
                this.props.events.map((event) => {
                  return <ScheduleListItem key={event.id} {...event} setEditEventId={this.setEditEventId} />;
                })
              )
          }
        </div>
        <Modal
          isOpen={!!this.state.addEventIsAvtivated}
          contentLabel="Add Event"
          onRequestClose={this.deactivateAddEventDate}
          closeTimeoutMS={200}
          className="modal"
        >
          <EventForm
            onSubmit={(event) => {
              this.props.addEvent(event);
              this.deactivateAddEventDate();
            }}
            tripId={this.props.tripId}
            date={this.props.date}
          />
        </Modal>
        <Modal
          isOpen={!!this.state.editEventId}
          contentLabel="Edit Event"
          onRequestClose={this.resetEditEventId}
          closeTimeoutMS={200}
          className="modal"
        >
          <EventForm
            onSubmit={(event) => {
              this.props.editEvent(this.state.editEventId, event);
              this.resetEditEventId();
            }}
            event={this.props.events.find((event) => event.id === this.state.editEventId)}
          />
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  events: state.events.filter((event) => event.tripId === props.tripId && event.date.isSame(props.date, 'day'))
});

const mapDispatchToProps = dispatch => ({
  addEvent: event => dispatch(addEvent(event)),
  editEvent: (id, updates) => dispatch(editEvent(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList);
