import React, { Component} from 'react';
import {BackTop, Button, Card, Col, Pagination, Row} from 'antd';
import './index.css';
import app from "firebase";
import * as URL from "../../../constants/url";

const DELETECOURSE = "/course/remove";
const axios = require('axios');

class CourseManagement extends Component {
    constructor(props) {
        super(props);
        this.createCourse = this.createCourse.bind(this);
        this.editCourse = this.editCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.state = {
            dataList: []
        }
    }

    componentDidMount() {
        let courseRef = app.firestore().collection('course');
        let allCourses = courseRef.get().then(snapshot => {
            let list = this.state.dataList;
            snapshot.forEach(doc =>{
                let courseObject = {id:doc.id, title:doc.data().title, tutor:doc.data().tutor, content:doc.data().content,
                    image:doc.data().image, price:doc.data().price, url:doc.data().url};
                list.push(courseObject);
            });
            this.setState({ dataList : list });
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
    }

    render() {
        return(
            <div>
                <div className="courseManagement">
                    <Button className="createBTN" block={true} onClick={this.createCourse}>Add a New Course</Button>
                    <Row>
                        {
                            this.state.dataList.map((item, index) => {
                                return (
                                    <Col span={24} key={index}>
                                        <Card className="courseCard" courseinfo={item} key={index} hoverable>
                                            <p className="courseTitle">{item.title}</p>
                                            <div className="courseAuthor">作者：{item.tutor}</div>
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
                <Pagination defaultCurrent={1} total={30}/>
                <BackTop />
            </div>
        )
    }
}

export default CourseManagement;