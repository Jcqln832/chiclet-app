import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import AddItem from '../AddItem/additem'
import SingleMonthItems from './singlemonthitems'
import './month.css'

export default function SingleMonth(props) {
    console.log(props.monthItems)
  
    return (
        <>
            <div className="container--title">
            <h2 className="month__year">
                <span className="arrow-back" onClick={()=>props.doRedirect()}><FontAwesomeIcon icon={faChevronLeft} size={"lg"} /></span>
                {props.year}
            </h2>
            </div>
            
            <div className="container--grid">
                <section className="container--1month">
                    <div className="month month--single">
                        <h2 className="month__title">{props.monthName}</h2>
                        <ul className="list--single">
                            {<SingleMonthItems monthItems = {props.monthItems}
                            /> }
                        </ul>
                        {<AddItem 
                            month = {props.monthName}
                            monthIndex = {props.monthIndex}
                            addItem = {props.addItem}
                            monthItems = {props.monthItems}
                        />}
                    </div>
                </section>
            </div>
        </>
    )
}
