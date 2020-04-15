import React from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class TripForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.trip ? props.trip.title : '',
      startDate: props.trip ? props.trip.startDate : moment(),
      endDate: props.trip ? props.trip.endDate : moment(),
      location: props.trip ? props.trip.location : '',
      note: props.trip ? props.trip.note : '',
      focusedInput: null,
      error: ''
    };
  }
  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };
  onDatesChange = ({ startDate, endDate }) => {
    if (startDate && endDate) {
      this.setState({ startDate, endDate });
    }
  };
  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput })
  };
  onLocationChange = (e) => {
    const location = e.target.value;
    this.setState(() => ({ location }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.title) {
      this.setState(() => ({ error: 'Please provide title.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        title: this.state.title,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        location: this.state.location,
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <input
            type="text"
            placeholder="title"
            autoFocus
            className="text-input"
            value={this.state.title}
            onChange={this.onTitleChange}
          />
          <DateRangePicker
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.focusedInput}
            onFocusChange={this.onFocusChange}
            isOutsideRange={() => false}
            showDefaultInputIcon
            displayFormat="YYYY/MM/DD"  />
          <input
            type="text"
            placeholder="location (option)"
            className="text-input"
            value={this.state.location}
            onChange={this.onLocationChange}
          />
          <textarea
            placeholder="note (option)"
            className="textarea"
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <div>
            <button className="btn-push">Save Expense</button>
          </div>
        </form>
      </div>
    )
  }
}