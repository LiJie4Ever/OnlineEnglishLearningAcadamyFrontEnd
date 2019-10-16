import React from "react";
import './index.css';

function QandA(props) {
    return (
        <div className='item'>
            <h1>{props.qa.q}</h1>
            <p>{props.qa.a}</p>
        </div>
    )
}

export default QandA;
