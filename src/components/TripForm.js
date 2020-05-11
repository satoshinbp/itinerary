import React from 'react'
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import moment from 'moment'

export default (props) => {
  const [title, setTitle] = React.useState(props.trip ? props.trip.title : '')
  const [startDate, setStartDate] = React.useState(props.trip ? moment(props.trip.startDate) : moment().startOf('day'))
  const [endDate, setEndDate] = React.useState(props.trip ? moment(props.trip.endDate) : undefined)
  const [note, setNote] = React.useState(props.trip ? props.trip.note : '')
  const [focusedInput, setFocusedInput] = React.useState(null)
  const [error, setError] = React.useState('')
  let numberOfMonths

  if (window.matchMedia("(min-width: 45rem)").matches) {
    numberOfMonths = 2
  } else {
    numberOfMonths = 1
  }

  const onDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      setStartDate(startDate.startOf('day'))
    }
    if (endDate) {
      setEndDate(endDate.startOf('day'))
    }
  }
  const onSubmit = e => {
    e.preventDefault()

    if (!title && !endDate) {
      setError('Please provide title and date.')
    } else if (!title) {
      setError('Please provide title.')
    } else if (!endDate) {
      setError('Please provide date.')
    } else {
      setError('')
      props.onSubmit({
        title,
        startDate: startDate.valueOf(),
        endDate: endDate.valueOf(),
        note
      })
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      {error && <p className="form__error">{error}</p>}
      <input
        type="text"
        placeholder="title"
        autoFocus
        className="text-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className="date-time-picker">
        <DateRangePicker
          numberOfMonths={numberOfMonths}
          startDate={startDate}
          startDateId="start_date_id_mobile"
          endDate={endDate}
          endDateId="end_date_id_mobile"
          onDatesChange={onDatesChange}
          focusedInput={focusedInput}
          onFocusChange={focusedInput => setFocusedInput(focusedInput)}
          isOutsideRange={() => false}
          minimumNights={0}
          displayFormat="YYYY/MM/DD"
        />
      </div>
      <textarea
        placeholder="Add a note for your trip (optional)"
        className="textarea"
        value={note}
        onChange={e => setNote(e.target.value)}
      >
      </textarea>
      <button className="btn-push">Save Trip</button>
    </form>
  )
}