import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import MONTHS from '../../Utils/monthsList';
import Year from '../year/year'
import MonthItems from './monthitems'
import './months.css'

export default function Months(props) {
    return ( 
    <>
        <Year prevButton = {props.prevButton} />
        <div className="container--grid">
            {MONTHS.map(month =>
            <Link to={`/month/${Number(props.year + month.id)}`} className="container--month" key={month.id}>
                <section>
                    <div className="month month--grid">
                        <h2 className="month__title">{month.name}</h2>
                        <ul className="month__itemList">
                            {<MonthItems gridItems = {props.items.filter(item => Number(item.index) === Number(props.year + month.id))}
                            /> }
                        </ul>
                    </div>  
                </section>
            </Link>
            )}
        </div>
    </>
    )
}

Months.defaultProps = {
    year: "",
    items: []
};
  
Months.propTypes = {
   year: PropTypes.string.isRequired,
   items: PropTypes.array.isRequired
};