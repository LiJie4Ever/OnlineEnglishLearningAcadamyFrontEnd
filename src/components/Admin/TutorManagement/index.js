import React, {Component} from 'react';
import {BackTop, Card, Col, Pagination, Row, Modal} from 'antd';
import './index.css';
import app from "firebase";
import * as URL from "../../../constants/url";

const DELETETUTOR = "/tutor/remove";
const axios = require('axios');
const numEachPage = 5;   // Use a constant here to keep track of number of cards per page
const { confirm } = Modal;

class TutorManagement extends Component {
    constructor(props) {
        super(props);
        this.editTutor = this.editTutor.bind(this);
        this.deleteTutor = this.deleteTutor.bind(this);
        this.state = {
            dataList: [],
            minValue: 0,
            maxValue: 5
        }
    }

    componentDidMount() {
        let tutorRef = app.firestore().collection('tutors');
        let allTutors = tutorRef.get().then(snapshot => {
            let list = this.state.dataList;
            snapshot.forEach(doc => {
                let tutorObject = {
                    id: doc.id,
                    userName: doc.data().userName,
                    bio: doc.data().bio,
                    picUrl: doc.data().picUrl,
                    teachExp: doc.data().teachExp,
                    videoLink: doc.data().videoLink
                };
                list.push(tutorObject);
            });
            this.setState({dataList: list});
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }

    editTutor(item) {
        this.props.history.push({pathname: '/admin/editTutor/' + item.id, state: {item}});
    }

    deleteTutor(id, index) {
        confirm({
            title: 'Do you want to delete this tutor?',
            content: 'When clicked the OK button, this tutor will be deleted.',
            visible: true,
            onOk: () => {
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
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 200);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel: () => {},
        });
    }

    handleChange = value => {
        this.setState({
            minValue: (value - 1) * numEachPage,
            maxValue: value * numEachPage
        });
    };

    render() {
        return (
            <div>
                <div className="tutorManagement">
                    <Row>
                        {this.state.dataList &&
                        this.state.dataList.length > 0 &&
                        this.state.dataList.slice(this.state.minValue, this.state.maxValue).map((item, index) => {
                            return (
                                <Col span={24} key={index}>
                                    <Card className="tutorAdminCard" tutorinfo={item} key={index} hoverable>
                                        <p className="tutorAdminName">{item.userName}</p>
                                        <div className="tutorAdminBio">Self-Intro: {item.bio}</div>
                                        <div className="actionBTN">
                                            <a className="editBTN" onClick={() => this.editTutor(item)}>Edit</a>
                                            <a className="deleteBTN"
                                               onClick={() => this.deleteTutor(item.id, index)}>Delete</a>
                                        </div>
                                    </Card>
                                </Col>
                            )
                        })
                        }
                    </Row>
                </div>
                <Pagination
                    defaultCurrent={1}
                    defaultPageSize={numEachPage} // default size of page
                    onChange={this.handleChange}
                    total={this.state.dataList.length} // total number of card data available
                />
                <BackTop/>
            </div>
        )
    }
}

export default TutorManagement;