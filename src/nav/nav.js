import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import './nav.css';

const AppNav = (props) => {

    return (
        <ul className="nav-list">
            <li key={1}>
            <NavLink to={`/`}>
                Log Out
            </NavLink>
            </li>
            <li key={2}>
            <NavLink to={`/options`}>
                Options
            </NavLink>
            </li>
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