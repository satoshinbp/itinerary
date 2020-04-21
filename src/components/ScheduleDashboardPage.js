import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import ScheduleList from './ScheduleList'

const ScheduleDashboardPage = (props) => {
  const listAllDate = (events, params_start, params_end) => {
    let dates = []
    events.map((event) => {
      if (event.date.isBefore(params_start) || event.date.isAfter(params_end)) {
        dates.push(moment(event.date))
      }
    })
    let start = moment(params_start)
    while (start.diff(params_end, 'day') <= 0) {
      dates.push(moment(start))
      start.add(1, 'day')
    };
    return dates.sort((a, b) => a.isAfter(b) ? 1 : -1)
  };

  return (
    <div className="container">
      <div className="page-header__title">
        <h3>{props.trip.title}</h3>
        <p>
          {
            props.trip.startDate.isSame(props.trip.endDate, 'day') ?
              `${props.trip.startDate.format('YYYY/MM/DD')}` :
              `${props.trip.startDate.format('YYYY/MM/DD')} - ${props.trip.endDate.format('YYYY/MM/DD')}`
          }
        </p>
      </div>
      <div>
        {
          listAllDate(props.events, props.trip.startDate, props.trip.endDate)
          .map((date, index) => <ScheduleList key={index} date={date} tripId={props.trip.id} />)
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  trip: state.trips.find((trip) => trip.id === props.match.params.id),
  events: state.events.filter((event) => event.tripId === props.match.params.id)
})

export default connect(mapStateToProps)(ScheduleDashboardPage)