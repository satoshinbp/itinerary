import React from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from 'moment';

export default class TripForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.trip ? props.trip.title : '',
      startDate: props.trip ? props.trip.startDate : moment().startOf('day'),
      endDate: props.trip ? props.trip.endDate : moment().startOf('day'),
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
      this.setState({ startDate: startDate.startOf('day'), endDate: endDate.startOf('day') });
    }
  };
  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput })
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
      });
    }
  };
  render() {
    return (
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
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate}
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.focusedInput}
          onFocusChange={this.onFocusChange}
          isOutsideRange={() => false}
          minimumNights={0}
          enableOutsideDays={true}
          showDefaultInputIcon
          displayFormat="YYYY/MM/DD" />
        <div>
          <button className="btn-push">Save Trip</button>
        </div>
      </form>
    )
  }
}