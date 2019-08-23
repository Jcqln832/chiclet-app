import React from 'react'
import { NavLink } from 'react-router-dom'
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

// FolderNav.defaultProps = {
//   folders: []
// };

// FolderNav.propTypes = {
//   folders: PropTypes.array.isRequired
// };