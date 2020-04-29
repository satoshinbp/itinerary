import React, { useState } from 'react'
import { connect } from 'react-redux'
import MaterialTable from 'material-table'
import moment from 'moment'

const TripListOptional = (props) => {
  const [state, setState] = useState({
    columns: [
      { title: 'Title', field: 'title' },
      { title: 'Start Date', field: 'startDate' },
      { title: 'End Date', field: 'endDate' }
    ],
    data: [
      { title: 'Vacation', startDate: moment().format('YYYY/MM/DD'), endDate: moment().format('YYYY/MM/DD') },
      { title: 'Honeymoon', startDate: moment().format('YYYY/MM/DD'), endDate: moment().format('YYYY/MM/DD') }
    ]
  })

  return (
    <MaterialTable
      title="Trips"
      columns={state.columns}
      data={props.trips}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}

const mapStateToProps = state => ({ trips: state.trips })

export default connect(mapStateToProps)(TripListOptional)