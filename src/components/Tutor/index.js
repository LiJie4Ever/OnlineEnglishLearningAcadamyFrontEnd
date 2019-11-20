import React from 'react';
import 'antd/dist/antd.css';
import "./index.css";
import {Col, Row} from 'antd';
import app from 'firebase/app';
import TutorItem from "./TutorItem";
import {compose} from "recompose";
import {withRouter} from 'react-router-dom';
import {withFirebase} from "../Firebase";
import {BackTop} from "antd/es";

const TutorItemWrapper = compose(
    withRouter,
    withFirebase,
)(TutorItem);

class Tutor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tutorList: []
        }
    }

    componentDidMount() {
        let tutorRef = app.firestore().collection('tutors');
        let allTutors = tutorRef.get().then(snapshot => {
            let list = this.state.tutorList;
            snapshot.forEach(doc => {
                let tutorObject = {
                    id: doc.id,
                    bio: doc.data().bio,
                    userName: doc.data().userName,
                    picUrl: doc.data().picUrl,
                    teachExp: doc.data().teachExp,
                    videoLink: doc.data().videoLink
                };
                list.push(tutorObject);
            });
            this.setState({tutorList: list});
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }

    render() {
        return (
            <div className="tutorList">
                <Row gutter={[8, 48]} type="flex" justify="start">
                    {
                        this.state.tutorList.map((item, index) => {
                            return (
                                <Col key={item.id} span={6}>
                                    <TutorItemWrapper tutorInfo={item}/>
                                </Col>
                            )
                        })
                    }
                </Row>
                <BackTop/>
            </div>
        );
    }
}

export default Tutor;