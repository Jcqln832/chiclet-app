import React from 'react'
import { NavLink } from 'react-router-dom'


const NavLinks = (props) => {

    return (
        <>
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
        </>
    )
}

export default NavLinks;