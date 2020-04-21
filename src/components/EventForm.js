import React, { useState } from 'react'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
import moment from 'moment'

export default (props) => {
  const id = props.event ? props.event.id : props.id
  const tripId = props.event ? props.event.tripId : props.tripId
  const [title, setTitle] = useState(props.event ? props.event.title : '')
  const [date, setDate] = useState(props.event ? moment(props.event.date) : moment(props.date))
  const [startTime, setStartTime] = useState(props.event ? props.event.startTime : moment(props.date))
  const [endTime, setEndTime] = useState(props.event ? props.event.endTime : moment(props.date))
  const [location, setLocation] = useState(props.event ? props.event.location : '')
  const [note, setNote] = useState(props.event ? props.event.note : '')
  const [focused, setFocused] = useState(null)
  const [error, setError] = useState('')

  const onSubmit = e => {
    e.preventDefault()

    if (!title) {
      setError('Please provide title.')
    } else {
      setError('')
      props.onSubmit({ id, tripId, title, date, startTime, endTime, location, note })
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
        onChange={e => setTitle(e.target.value)}
      />
      <div>
        Date
          <SingleDatePicker
          date={date}
          onDateChange={date => setDate(moment(date).startOf('day'))}
          focused={focused}
          onFocusChange={({ focused }) => setFocused(focused)}
        />
      </div>
      <div>
        Start Time
          <TimePicker
          style={{ width: 150 }}
          showSecond={false}
          value={startTime}
          onChange={time => setStartTime(moment(time))}
        />
      </div>
      <div>
        End Time
          <TimePicker
          style={{ width: 150 }}
          showSecond={false}
          value={endTime}
          onChange={time => setEndTime(moment(time))}
        />
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
      <div>
        <button className="btn-push">Save Event</button>
      </div>
    </form>
  )
}

// export default class EventForm extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       tripId: props.event ? props.event.tripId : props.tripId,
//       title: props.event ? props.event.title : '',
//       date: props.event ? moment(props.event.date) : moment(props.date),
//       startTime: props.event ? moment(props.event.startTime) : moment(props.date),
//       endTime: props.event ? moment(props.event.endTime) : moment(props.date),
//       location: props.event ? props.event.location : '',
//       note: props.event ? props.event.note : '',
//       focused: null,
//       error: '',
//     };
//   };

//   onTitleChange = (e) => {
//     const title = e.target.value;
//     this.setState(() => ({ title }));
//   };
//   onDateChange = date => this.setState({ date: moment(date).startOf('day') });
//   onStartTimeChange = time => this.setState({ startTime: moment(time) });
//   onEndTimeChange = time => this.setState({ endTime: moment(time) });
//   onLocationChange = (e) => {
//     const location = e.target.value;
//     this.setState(() => ({ location }));
//   };
//   onNoteChange = (e) => {
//     const note = e.target.value;
//     this.setState(() => ({ note }));
//   };
//   onFocusChange = ({ focused }) => this.setState({ focused });
//   onSubmit = (e) => {
//     e.preventDefault();

//     if (!this.state.title) {
//       this.setState(() => ({ error: 'Please provide title.' }));
//     } else {
//       this.setState(() => ({ error: '' }));
//       this.props.onSubmit({
//         tripId: this.state.tripId,
//         title: this.state.title,
//         date: this.state.date,
//         startTime: this.state.startTime,
//         endTime: this.state.endTime,
//         location: this.state.location,
//         note: this.state.note
//       });
//     }
//   };

//   render() {
//     return (
//       <form onSubmit={this.onSubmit}>
//         {this.state.error && <p className="form__error">{this.state.error}</p>}
//         <input
//           type="text"
//           placeholder="title"
//           autoFocus
//           className="text-input"
//           value={this.state.title}
//           onChange={this.onTitleChange}
//         />
//         <div>
//           Date
//           <SingleDatePicker
//             date={this.state.date}
//             onDateChange={this.onDateChange}
//             focused={this.state.focused}
//             onFocusChange={this.onFocusChange}
//           />
//         </div>
//         <div>
//           Start Time
//           <TimePicker
//             style={{ width: 150 }}
//             showSecond={false}
//             value={this.state.startTime}
//             onChange={this.onStartTimeChange}
//           />
//         </div>
//         <div>
//           End Time
//           <TimePicker
//             style={{ width: 150 }}
//             showSecond={false}
//             value={this.state.endTime}
//             onChange={this.onEndTimeChange}
//           />
//         </div>
//         <input
//           type="text"
//           placeholder="location"
//           className="text-input"
//           value={this.state.location}
//           onChange={this.onLocationChange}
//         />
//         <textarea
//           placeholder="Add a note for your event (optional)"
//           className="textarea"
//           value={this.state.note}
//           onChange={this.onNoteChange}
//         >
//         </textarea>
//         <div>
//           <button className="btn-push">Save Event</button>
//         </div>
//       </form>
//     );
//   }
// }