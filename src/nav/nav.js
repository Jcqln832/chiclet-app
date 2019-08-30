import React from 'react'
import PropTypes from 'prop-types'
import NavLinks from './navlinks'
import './nav.css';

const AppNav = (props) => {

    return (
        <ul className="nav-list">
            {props.isLoggedIn ?
                <NavLinks />
                :
                <li>Hello!</li>
            }
        </ul>
    )
}

export default AppNav;

AppNav.defaultProps = {
  isLoggedIn: false
};

AppNav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};