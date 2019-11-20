import React, { Component} from 'react';
import {BackTop, Button, Card, Col, Pagination, Row, Modal} from 'antd';
import './index.css';
import app from "firebase";
import * as URL from "../../../constants/url";

const DELETECOURSE = "/course/remove";
const axios = require('axios');
const numEachPage = 5;   // Use a constant here to keep track of number of cards per page
const { confirm } = Modal;

class CourseManagement extends Component {
    constructor(props) {
        super(props);
        this.createCourse = this.createCourse.bind(this);
        this.editCourse = this.editCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.state = {
            dataList: [],
            // pagination
            minValue: 0,
            maxValue: 5
        }
    }

    componentDidMount() {
        let list = this.state.dataList;
        // query list of course information from database
        let courseRef = app.firestore().collection('course');
        let allCourses = courseRef.get().then(snapshot => {
            snapshot.forEach(doc =>{
                let testPromise = new Promise( ( resolve, reject ) => {
                    // query tutor's name by tutorID (for display)
                    let tutorName = "tutorName";
                    let tutorItem = app.firestore().collection('tutors').doc(doc.data().tutor);
                    tutorItem.get().then(function (doc) {
                        if (doc.exists) {
                            tutorName = doc.data().userName;
                            resolve(tutorName);
                        } else {
                            console.log("No such document!");
                        }
                    }).catch(err => {
                        console.log('Error getting documents', err);
                    });
                } );
                testPromise.then((result => {
                    let courseObject = {id:doc.id, title:doc.data().title, tutor:doc.data().tutor, tutorName:result, content:doc.data().content,
                        image:doc.data().image, price:doc.data().price, url:doc.data().url};
                    list.push(courseObject);
                    this.setState({ dataList : list });
                }));
            });
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }

    createCourse() {
        var item = null;
        this.props.history.push({pathname:'/admin/createCourse', state:{item}});
    }

    editCourse(item) {
        this.props.history.push({pathname:'/admin/editCourse/' + item.id, state:{item}});
    }

    deleteCourse(id, index) {
        confirm({
            title: 'Do you want to delete this course?',
            content: 'When clicked the OK button, this course will be deleted.',
            visible: true,
            onOk: () => {
                axios.post(`${URL.ENDPOINT}${DELETECOURSE}`, {
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
        // axios.post(`${URL.ENDPOINT}${DELETECOURSE}`, {
        //     id: id
        // })
        //     .then(function (response) {
        //         const list = this.state.dataList;
        //         list.splice(index, 1);
        //         this.setState({dataList: list});
        //     }.bind(this))
        //     .catch(function (error) {
        //         console.log(error);// todo
        //     });
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
                <div className="courseAdminManagement">
                    <Button className="createBTN" block={true} onClick={this.createCourse}>Add a New Course</Button>
                    <Row>
                        {
                            this.state.dataList.slice(this.state.minValue, this.state.maxValue).map((item, index) => {
                                return (
                                    <Col span={24} key={index}>
                                        <Card className="courseAdminCard" courseinfo={item} key={index} hoverable>
                                            <p className="courseAdminTitle">{item.title}</p>
                                            <div className="courseAdminAuthor">Tutor：{item.tutorName}</div>
                                            <div className="actionBTN">
                                                <a className="editBTN" onClick={() => this.editCourse(item)}>Edit</a>
                                                <a className="deleteBTN" onClick={() => this.deleteCourse(item.id, index)}>Delete</a>
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

export default CourseManagement;