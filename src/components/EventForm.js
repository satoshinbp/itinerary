import React from 'react'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import DateFnsUtils from '@date-io/date-fns'
import { TimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import moment from 'moment'

export default (props) => {
  const id = props.event ? props.event.id : props.id
  const tripId = props.event ? props.event.tripId : props.tripId
  const [title, setTitle] = React.useState(props.event ? props.event.title : '')
  const [date, setDate] = React.useState(props.event ? moment(props.event.date) : moment(props.date))
  const [startTime, setStartTime] = React.useState(props.event ? moment(props.event.startTime) : moment(props.date).hour(12).minutes(0))
  const [endTime, setEndTime] = React.useState(props.event ? moment(props.event.endTime) : moment(props.date).hour(12).minutes(0))
  const [location, setLocation] = React.useState(props.event ? props.event.location : '')
  const [note, setNote] = React.useState(props.event ? props.event.note : '')
  const [focused, setFocused] = React.useState(null)
  const [error, setError] = React.useState('')

  let numberOfMonths
  if (window.matchMedia("(min-width: 45rem)").matches) {
    numberOfMonths = 2
  } else {
    numberOfMonths = 1
  }
  
  const onStartTimeChange = time => {
    setStartTime(moment(time))
    if (moment(time).isAfter(endTime)) {
      setEndTime(moment(time))
    }
  }
  const onEndTimeChange = time => {
    setEndTime(moment(time))
    if (moment(time).isBefore(startTime)) {
      setStartTime(moment(time))
    }
  }
  const onSubmit = e => {
    e.preventDefault()

    if (!title) {
      setError('Please provide title.')
    } else {
      setError('')
      props.onSubmit({
        id,
        tripId,
        title,
        date: date.valueOf(),
        startTime: startTime.valueOf(),
        endTime: endTime.valueOf(),
        location,
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
        <SingleDatePicker
          numberOfMonths={numberOfMonths}
          date={date}
          onDateChange={date => setDate(moment(date).startOf('day'))}
          focused={focused}
          onFocusChange={({ focused }) => setFocused(focused)}
          isOutsideRange={() => false}
          displayFormat="YYYY/MM/DD"
        />
      </div>
      <div className="date-time-picker">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker value={startTime} onChange={onStartTimeChange} label="Start Time" />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker value={endTime} onChange={onEndTimeChange} label="End Time" />
        </MuiPickersUtilsProvider>
      </div>
      <input
        type="text"
        placeholder="location"
        className="text-input"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
      <textarea
        placeholder="Add a note for your event (optional)"
        className="textarea"
        value={note}
        onChange={e => setNote(e.target.value)}
      >
      </textarea>
      <button className="btn-push">Save Event</button>
    </form>
  )
}