import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

export default function SingleMonthItems(props) {

    return (
        <>
        {props.monthItems.map(item =>
             <li key={item.id} className={item.completed ? "complete" : "incomplete"}>
                <Link to={`/edit/${item.id}`} className="edit-btn" title="edit item">
                    <FontAwesomeIcon icon={faEdit} size={"lg"}/>
                </Link>
                {item.content}
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