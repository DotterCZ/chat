import React, { useState } from 'react'
import { FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa'

const AccordianItem = (props) => {

    const [progress] = useState(props.progress);
    return (
        <a href={props.url} className='accordian-item-link'>
            <div className='item'>
                <h5>{props.title}</h5>
                {!progress ? <FaRegCheckCircle /> : <FaCheckCircle />}
            </div>
        </a>
    )
}

export default AccordianItem
