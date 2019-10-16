import React from "react";
import "./index.css"

function Class(props) {

    var title = props.info.title
    var intro = props.info.intro
    var tutor = props.info.tutor
    var imgURL = props.info.imgURL
    var price = props.info.price
    var classLink = props.info.classLink


    return (
        <div className='item'>
            <div className='left'>
                <img src={imgURL} />
            </div>

            <div className='middle'>
                <div className="title"><a href={classLink}>{title}</a></div>
                <div className="subtitle">{tutor}</div>
                <div className="intro">{intro}</div>
            </div>

            <div className='right'>
                <div className="price">US$ {price}</div>
            </div>

            <div className="clear"></div>

        </div>
    )
}

export default Class;