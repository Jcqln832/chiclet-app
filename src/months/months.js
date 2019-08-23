import React from 'react'
import { Link } from 'react-router-dom'
import apiContext from '../apiContext'
import MONTHS from '../monthList';
import Year from '../year/year'
import MonthItems from './monthitems'
import './months.css'

export default function Months(props) {
    
    return (
        <apiContext.Consumer>
        {(value) => {
            return (
            <>
                <Year prevButton = {props.prevButton} />
                <div className="container--grid">
                    {MONTHS.map(month =>
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

