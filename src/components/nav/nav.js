import React from 'react'
import PropTypes from 'prop-types'
import NavLinks from './navlinks'
import TokenService from '../../services/token-service'
import './nav.css';

const AppNav = (props) => {

    return (
        <ul className="nav-list">
            {
              TokenService.hasAuthToken()
              ?  <NavLinks />
              : <li>Hello!</li>
            }
        </ul>
    )
}

export default AppNav;