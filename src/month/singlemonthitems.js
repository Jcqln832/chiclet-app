import React from 'react'
import PropTypes from 'prop-types';

export default function SingleMonthItems(props) {
    console.log(props);
    return (
        <>
        {props.monthItems.map(item =>
             <li key={item.id}>{item.item}</li>
        )}
        </>
    )
}

SingleMonthItems.defaultProps = {
    monthItems: []
  };
  
SingleMonthItems.propTypes = {
   monthItems: PropTypes.array
  };