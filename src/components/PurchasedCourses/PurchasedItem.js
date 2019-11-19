import React, {Component} from "react";
// import PropTypes from 'prop-types';
import './index.css';
import List from "antd/lib/list";

class PurchasedItem extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let CourseTitle = this.props.CourseInfo.title;
        let CourseContent = this.props.CourseInfo.content;
        let CourseTutor = this.props.CourseInfo.tutor;
        let CoursePrice = this.props.CourseInfo.price;
        let CoursePic = this.props.CourseInfo.image;
        return(
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                >
                    <List.Item
                        key={CourseTitle}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src='https://i.ytimg.com/vi/8SPTbmew5JY/maxresdefault.jpg'
                            />
                        }
                    >
                        <p style={{fontSize:'20px'}}> <b>{CourseTitle}</b></p>
                        <h3>Tutor：{CourseTutor}</h3>
                        <h3 className='price'>US$ {CoursePrice}</h3>
                        <div style={{background:'rgb(254,243,242)'}}>{CourseContent}</div>
                        <hr/>
                    </List.Item>
                </List>
            </div>
        )
    }

}

export default PurchasedItem;
