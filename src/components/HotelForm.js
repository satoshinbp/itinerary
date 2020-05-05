import React, { useState } from 'react'
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import DateFnsUtils from '@date-io/date-fns'
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'

export default (props) => {
  const id = props.hotel ? props.hotel.id : props.id
  const tripId = props.hotel ? props.hotel.tripId : props.tripId
  const [name, setName] = useState(props.hotel ? props.hotel.name : '')
  const [checkInDate, setCheckInDate] = useState(props.hotel ? moment(props.hotel.checkInDate) : moment(props.date))
  const [checkOutDate, setCheckOutDate] = useState(props.hotel ? moment(props.hotel.checkOutDate) : moment(props.date).add(1, 'day'))
  const [checkInTime, setCheckInTime] = useState(props.hotel ? moment(props.hotel.checkInTime) : moment("1500", "hmm"))
  const [checkOutTime, setCheckOutTime] = useState(props.hotel ? moment(props.hotel.checkOutTime) : moment("1100", "hmm"))
  const [ETA, setETA] = useState(props.hotel ? props.hotel.ETA : moment("1500", "hmm"))
  const [ETD, setETD] = useState(props.hotel ? props.hotel.ETD : moment("1100", "hmm"))
  const [location, setLocation] = useState(props.hotel ? props.hotel.location : '')
  const [note, setNote] = useState(props.hotel ? props.hotel.note : '')
  const [focusedInput, setFocusedInput] = useState(null)
  const [error, setError] = useState('')

  let numberOfMonths
  if (window.matchMedia("(min-width: 45rem)").matches) {
    numberOfMonths = 2
  } else {
    numberOfMonths = 1
  }
  
  const onDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      setCheckInDate(moment(startDate).startOf('day'))
    }
    if (endDate) {
      setCheckOutDate(moment(endDate).startOf('day'))
    }
  }
  const onSubmit = e => {
    e.preventDefault()

    if (!name) {
      setError('Please provide hotel name.')
    } else {
      setError('')
      props.onSubmit({ id,
        tripId,
        name,
        checkInDate: checkInDate.valueOf(),
        checkOutDate: checkOutDate.valueOf(),
        checkInTime: checkInTime.valueOf(),
        checkOutTime: checkOutTime.valueOf(),
        ETA: ETA.valueOf(),
        ETD: ETD.valueOf(),
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
        placeholder="name"
        autoFocus
        className="text-input"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <div className="date-time-picker">
        <DateRangePicker
          numberOfMonths={numberOfMonths}
          startDate={checkInDate}
          startDateId="check_in_date_id"
          endDate={checkOutDate}
          endDateId="check_out_date_id"
          onDatesChange={onDatesChange}
          focusedInput={focusedInput}
          onFocusChange={focusedInput => setFocusedInput(focusedInput)}
          isOutsideRange={() => false}
          minimumNights={1}
          displayFormat="YYYY/MM/DD"
        />
      </div>
      <div className="date-time-picker">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker value={checkInTime} onChange={time => setCheckInTime(moment(time))} label="Check-in Time" />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker value={checkOutTime} onChange={time => setCheckOutTime(moment(time))} label="Check-out Time" />
        </MuiPickersUtilsProvider>
      </div>
      <div className="date-time-picker">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker value={ETA} onChange={time => setETA(moment(time))} label="ETA" />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker value={ETD} onChange={time => setETD(moment(time))} label="ETD" />
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
        placeholder="Add a note for your hotel (optional)"
        className="textarea"
        value={note}
        onChange={e => setNote(e.target.value)}
      >
      </textarea>
      <button className="btn-push">Save Hotel</button>
    </form>
  )
}