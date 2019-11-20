import React, { Component} from 'react';
import {BackTop, Button, Card, Col, Pagination, Row, Modal} from 'antd';
import './index.css';
import app from "firebase";
import * as URL from "../../../constants/url";

const DELETELESSON = "/lesson/remove";
const axios = require('axios');
const numEachPage = 5;   // Use a constant here to keep track of number of cards per page
const { confirm } = Modal;

class LessonManagement extends Component {
    constructor(props) {
        super(props);
        this.createLesson = this.createLesson.bind(this);
        this.editLesson = this.editLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.state = {
            dataList: [],
            // pagination
            minValue: 0,
            maxValue: 5
        }
    }

    componentDidMount() {
        let list = this.state.dataList;
        // query list of lesson information from database
        let LessonRef = app.firestore().collection('lesson');
        let allLessons = LessonRef.get().then(snapshot => {
            snapshot.forEach(doc =>{
                let lessonObject = {id:doc.id, lessonTitle:doc.data().lessonTitle, lessonIntro:doc.data().lessonIntro, videoURL:doc.data().videoURL, course_id:doc.data().course_id};
                list.push(lessonObject);
                this.setState({ dataList : list });
            });
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }

    createLesson() {
        var item = null;
        this.props.history.push({pathname:'/admin/createLesson', state:{item}});
    }

    editLesson(item) {
        this.props.history.push({pathname:'/admin/editLesson/' + item.id, state:{item}});
    }

    deleteLesson(id, index) {
        confirm({
            title: 'Do you want to delete this lesson?',
            content: 'When clicked the OK button, this lesson will be deleted.',
            visible: true,
            onOk: () => {
                axios.post(`${URL.ENDPOINT}${DELETELESSON}`, {
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
        return(
            <div>
                <div className="lessonAdminManagement">
                    <Button className="createBTN" block={true} onClick={this.createLesson}>Add a New Lesson</Button>
                    <Row>
                        {
                            this.state.dataList.slice(this.state.minValue, this.state.maxValue).map((item, index) => {
                                return (
                                    <Col span={24} key={index}>
                                        <Card className="lessonAdminCard" courseinfo={item} key={index} hoverable>
                                            <p className="lessonAdminTitle">{item.lessonTitle}</p>
                                            <div className="lessonAdminIntro">Introductio: {item.lessonIntro}</div>
                                            <div className="actionBTN">
                                                <a className="editBTN" onClick={() => this.editLesson(item)}>Edit</a>
                                                <a className="deleteBTN" onClick={() => this.deleteLesson(item.id, index)}>Delete</a>
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
                <BackTop />
            </div>
        )
    }
}

export default LessonManagement;