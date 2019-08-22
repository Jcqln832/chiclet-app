import React from 'react'
import { Link } from 'react-router-dom'
import apiContext from '../apiContext'
import Year from '../year/year'
import MonthItems from './monthitems'
import './months.css'

export default function Months(props) {

    const months = [
        {
            name: "January",
            id: "01"
        },
        {   
            name: "February",
            id: "02"
        },
        {   
            name: "March",
            id: "03"
        },
        { 
            name: "April",
            id: "04"
        },
        { 
            name: "May",
            id: "05"
        },
        {
            name: "June",
            id: "06"
        },
        { 
            name: "July",
            id: "07"
        },
        {   
            name: "August",
            id: "08"
        },
        {
            name: "September",
            id: "09"
        },
        {      
            name: "October",
            id: "10"
        }, 
        { 
            name: "November",
            id: "11"
        },
        {
            name: "December",
            id: "12"
        }
    ]
    
    return (
        <apiContext.Consumer>
        {(value) => {
            return (
            <>
                <Year prevButton = {props.prevButton} />
                <div className="container--grid">
                    {months.map(month =>
                    <Link to={`/month/${Number(value.year + month.id)}`} className="container--month" key={month.id}>
                        <section>
                            <div className="month">
                                <h2 className="month__title">{month.name}</h2>
                                <ul>
                                    {<MonthItems gridItems = {props.items.filter(item => Number(item.index) === Number(value.year + month.id))}
                                    /> }
                                </ul>
                            </div>  
                        </section>
                    </Link>
                    )}
                </div>
            </>
            )
        }}
    </apiContext.Consumer>
    )
}

