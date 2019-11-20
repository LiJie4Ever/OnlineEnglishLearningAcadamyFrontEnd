import React, { Component} from 'react';
import {BackTop, Card, Col, Pagination, Row} from 'antd';
import './index.css';
import app from "firebase";
import * as URL from "../../../constants/url";

const DELETETUTOR = "/tutor/remove";
const axios = require('axios');

class TutorManagement extends Component {
    constructor(props) {
        super(props);
        this.editTutor = this.editTutor.bind(this);
        this.deleteTutor = this.deleteTutor.bind(this);
        this.state = {
            dataList: []
        }
    }

    componentDidMount() {
        let tutorRef = app.firestore().collection('tutors');
        let allTutors = tutorRef.get().then(snapshot => {
            let list = this.state.dataList;
            snapshot.forEach(doc =>{
                let tutorObject = {id:doc.id, userName:doc.data().userName, bio:doc.data().bio, picUrl:doc.data().picUrl, teachExp:doc.data().teachExp};
                list.push(tutorObject);
            });
            this.setState({ dataList : list });
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }

    editTutor(item) {
        this.props.history.push({pathname:'/admin/editTutor/' + item.id, state:{item}});
    }

    deleteTutor(id, index) {
        axios.post(`${URL.ENDPOINT}${DELETETUTOR}`, {
            id: id
        })
            .then(function (response) {
                const list = this.state.dataList;
                list.splice(index, 1);
                this.setState({dataList: list});
            }.bind(this))
            .catch(function (error) {
                console.log(error);// todo
            });
    }

    render() {
        return(
            <div>
                <div className="tutorManagement">
                    <Row>
                        {
                            this.state.dataList.map((item, index) => {
                                return (
                                    <Col span={24} key={index}>
                                        <Card className="tutorCard" tutorinfo={item} key={index} hoverable>
                                            <p className="tutorName">{item.userName}</p>
                                            <div className="tutorBio">Self-Intro: {item.bio}</div>
                                            <div className="actionBTN">
                                                <a className="editBTN" onClick={() => this.editTutor(item)}>Edit</a>
                                                <a className="deleteBTN" onClick={() => this.deleteTutor(item.id, index)}>Delete</a>
                                            </div>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
                <Pagination defaultCurrent={1} total={30}/>
                <BackTop />
            </div>
        )
    }
}

export default TutorManagement;