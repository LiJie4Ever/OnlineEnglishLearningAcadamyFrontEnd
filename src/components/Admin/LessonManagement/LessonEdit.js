import React, { Component} from 'react';
import {Form, Icon, Input, Button, Select, Modal} from 'antd';
import * as URL from "../../../constants/url";
import './index.css';
import app from "firebase";

const ADDLESSON = "/lesson/add";
const MODIFYLESSON = "/lesson/modify";
const axios = require('axios');
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;

class LessonEdit extends Component{
    constructor(props) {
        super(props);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.originLesson = this.props.location.state.item;
        this.state = {
            courseSelectList : []
        };
    }

    componentDidMount() {
        if (this.originLesson != null) {
            this.props.form.setFieldsValue({
                course_id: this.originLesson.course_id,
                lessonTitle: this.originLesson.lessonTitle,
                lessonIntro: this.originLesson.lessonIntro,
                videoURL: this.originLesson.videoURL
            })
        }
        let courseRef = app.firestore().collection('course');
        let allCourses = courseRef.get().then(snapshot => {
            let list = this.state.courseSelectList;
            snapshot.forEach(doc =>{
                let courseObject = {courseId:doc.id, courseTitle:doc.data().title};
                list.push(courseObject);
            });
            this.setState({ courseSelectList : list });
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }

    cancelEdit() {
        confirm({
            title: 'Do you want to cancel editing?',
            content: 'When clicked the OK button, the edit page will be closed and the content will not be saved.',
            visible: true,
            onOk:() => {
                return new Promise((resolve, reject) => {
                    this.props.history.push('/admin/manageLesson');
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 100);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let dataObj = {
                    course_id: values.course_id,
                    lessonTitle: values.lessonTitle,
                    lessonIntro: values.lessonIntro,
                    videoURL: values.videoURL
                };
                if (this.originLesson == null) { // create lesson
                    axios.post(`${URL.ENDPOINT}${ADDLESSON}`, {
                        fields: dataObj
                    })
                        .then(function (response) {
                            this.props.history.push('/admin/manageLesson');
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);// todo
                        });
                } else { // modify lesson
                    axios.post(`${URL.ENDPOINT}${MODIFYLESSON}`, {
                        id: this.originLesson.id,
                        fields: dataObj
                    })
                        .then(function (response) {
                            this.props.history.push('/admin/manageLesson');
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);// todo
                        });
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form onSubmit={this.handleSubmit} className="lesson-edit-form">
                    <Form.Item className="lessonTitleEdit">
                        {getFieldDecorator('lessonTitle', {
                            rules: [{ required: true, message: 'Please input the title!' }],
                        })(
                            <Input
                                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Title"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item hasFeedback>
                        {getFieldDecorator('course_id', {
                            rules: [{ required: true, message: 'Please select the course!' }],
                        })(
                            <Select placeholder="Please select a course" >
                                {
                                    this.state.courseSelectList.map((item, index) => {
                                        return (
                                            <option key={item.courseId}>{item.courseTitle}</option>
                                        )
                                    })
                                }
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item className="plessonIntroEdit">
                        {getFieldDecorator('lessonIntro', {
                            rules: [{ required: true, message: 'Please input the lesson introduction!' }],
                        })(
                            <Input
                                prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Introduction"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className="videoURLEdit">
                        {getFieldDecorator('videoURL', {
                            rules: [{ required: true, message: 'Please input the URL link of video!' }],
                        })(
                            <Input
                                prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="video Url link"
                            />,
                        )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="comfirmBTN">
                        Comfirm
                    </Button>
                    <a className="cancelBTN" onClick={this.cancelEdit}>cancel</a>
                </Form>
            </div>
        )
    }
}

const WrappedNormalForm = Form.create({ name: 'lessonEdit' })(LessonEdit);

export default WrappedNormalForm;