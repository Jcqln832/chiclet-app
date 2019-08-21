import React, { Component } from 'react'
import apiContext from '../apiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './year.css'
// import { tsPropertySignature } from '@babel/types';

export default function Year(props) {
    return (
        <apiContext.Consumer>
            {(value) => {
                return (
                    <header role="banner">
                        {/* value.year > new Date().getFullYear() ? 
                            <button className="btn-arrow" onClick = {value.decrementYear} >
                                <FontAwesomeIcon icon={faArrowLeft} size={"lg"}/>
                            </button>' : null */}
                        
                    
                        <h2>{value.year}</h2>
                        <button className="btn-arrow" onClick = {value.incrementYear} >
                            <FontAwesomeIcon icon={faArrowRight} size={"lg"} />
                        </button>
                    </header>
                )
            }}
        </apiContext.Consumer>
    )
}