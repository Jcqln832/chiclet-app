import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

export default function SingleMonthItems(props) {
    console.log(props);
    return (
        <>
        {props.monthItems.map(item =>
             <li key={item.id} className={item.completed ? "complete" : "incomplete"}>
                <Link to={`/edit/${item.id}`} className="edit-btn">
                    <FontAwesomeIcon icon={faEdit} size={"lg"}/>
                </Link>
                {item.item}
             </li>
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