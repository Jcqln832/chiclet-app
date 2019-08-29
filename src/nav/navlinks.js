import React from 'react'
import { NavLink } from 'react-router-dom'
import apiContext from '../apiContext'


const NavLinks = (props) => {

    return (
        <apiContext.Consumer>
            {(value) => {
                return(         
                    <>
                        <li key={1}>
                            <button className="nav-list__btn-logout"type="button" onClick={value.handleClickLogout}>
                                Log Out
                            </button>
                        </li>
                        <li key={2}>
                            <NavLink to={`/options`}>
                                Options
                            </NavLink>
                        </li>
                    </>
                )
            }}
        </apiContext.Consumer>
    )
}

export default NavLinks;