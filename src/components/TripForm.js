import React, { useState } from 'react'
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import moment from 'moment'

export default (props) => {
  const id = props.trip ? props.trip.id : props.tripId
  const [title, setTitle] = useState(props.trip ? props.trip.title : '')
  const [startDate, setStartDate] = useState(props.trip ? props.trip.startDate : moment().startOf('day'))
  const [endDate, setEndDate] = useState(props.trip ? props.trip.endDate : moment().startOf('day'))
  const [focusedInput, setFocusedInput] = useState(null)
  const [error, setError] = useState('')

  const onTitleChange = e => setTitle(e.target.value)
  const onDatesChange = ({ startDate, endDate }) => {
    if (startDate && endDate) {
      setStartDate(startDate.startOf('day'))
      setEndDate(endDate.startOf('day'))
    }
  }
  const onFocusChange = focusedInput => setFocusedInput(focusedInput)
  const onSubmit = e => {
    e.preventDefault()

    if (!title) {
      setError('Please provide title.')
    } else {
      setError('')
      props.onSubmit({ id, title, startDate, endDate })
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {error && <p className="form__error">{error}</p>}
      <input
        type="text"
        placeholder="title"
        autoFocus
        className="text-input"
        value={title}
        onChange={onTitleChange}
      />
      <DateRangePicker
        startDate={startDate}
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={endDate}
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={onDatesChange}
        focusedInput={focusedInput}
        onFocusChange={onFocusChange}
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