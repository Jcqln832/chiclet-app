import React from 'react'
import PropTypes from 'prop-types';

export default function MonthItems(props) {
    console.log(props);
    return (
        <>
        {props.gridItems.map(item =>
            <li key={item.id} className={item.completed ? "complete" : "incomplete"}>{item.item}</li>
        )}
        </>
    )
}

MonthItems.defaultProps = {
    gridItems: []
  };
  
MonthItems.propTypes = {
   gridItems: PropTypes.array
  };