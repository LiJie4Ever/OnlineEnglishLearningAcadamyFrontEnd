import React, {Component} from "react";
import {BackTop, Card} from 'antd';
import './index.css';

class TutorPage extends Component {
    constructor(props) {
        super(props);
        this.tutorInfo = this.props.location.state.tutorInfo;
    }

    render() {
        let tutorName = this.tutorInfo.userName;
        let tutorBio = this.tutorInfo.bio;
        let tutorImg = this.tutorInfo.picUrl;
        let tutorExp = this.tutorInfo.teachExp;

        return (
            <Card className="tutorCard" title={tutorName} hoverable style={{ width: 300, height:400 }}
                  cover={<img alt="example" src={tutorImg}/>}>
                <p className="tutorExp">{tutorExp}</p>
                <p className="tutorBio">{tutorBio}</p>
            </Card>
        )
    }
}

export default TutorPage;