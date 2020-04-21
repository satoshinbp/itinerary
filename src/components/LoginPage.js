import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'
import GoogleButton from 'react-google-button'

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Itinerary</h1>
      <p>Plan your trip.</p>
      <GoogleButton className="btn-google-signin" onClick={startLogin} />
    </div>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)