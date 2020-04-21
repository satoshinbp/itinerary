import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="container">
      <div className="header__content">
        <div className="header__left">
          <Link className="header__title" to="/dashboard">
            <h1>Itinerary</h1>
          </Link>
          <img className="logo" src="/images/logo.png"></img>
        </div>
        <button className="btn-link" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
)

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header)