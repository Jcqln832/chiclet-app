import React from 'react'
import PropTypes from 'prop-types';

export default function MonthItems(props) {
    return (
        <>
        {props.gridItems.map(item =>
            <li key={item.id} className={item.completed ? "complete" : "incomplete"}>{item.content}</li>
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