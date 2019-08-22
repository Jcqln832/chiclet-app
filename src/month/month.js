import React from 'react'
import { Link } from 'react-router-dom'
// import apiContext from '../apiContext'
import Year from '../year/year'
import SingleMonthItems from './singlemonthitems'
import './month.css'

export default function SingleMonth(props) {
  
    return (
        <>
            <Year prevButton = {props.prevButton} />
            <div className="container--grid">
                <section className="container--1month">
                    <div className="month month--single">
                        <h2 className="month__title">{props.monthName}</h2>
                        <ul className="list--single">
                            {<SingleMonthItems monthItems = {props.monthItems}
                            /> }
                        </ul>
                    </div>  
                </section>
            </div>
        </>
    )
}
