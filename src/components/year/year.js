import React from 'react'
import apiContext from '../../apiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import './year.css'

export default function Year(props) {

    return (
        <apiContext.Consumer>
            {(value) => {
                return (
                    <header role="banner">
                        {props.prevButton &&
                            <button className="btn-arrow" onClick = {value.decrementYear}>
                            <FontAwesomeIcon icon={faArrowLeft} size={"lg"}/>
                       </button> 
                        }
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

Year.defaultProps = {
  prevButton: false
};

Year.propTypes = {
  prevButton: PropTypes.bool.isRequired
};