import React, { Component} from 'react';
import {Form, Icon, Input, Button, Select, Modal} from 'antd';
import * as URL from "../../../constants/url";
import './index.css';
import app from "firebase";

const ADDCOURSE = "/course/add";
const MODIFYCOURSE = "/course/modify";
const axios = require('axios');
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;

class CourseEdit extends Component{
    constructor(props) {
        super(props);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.originCourse = this.props.location.state.item;
        this.state = {
            tutorSelectList : []
        };
    }

    componentDidMount() {
        if (this.originCourse != null) {
            this.props.form.setFieldsValue({
                title: this.originCourse.title,
                tutor: this.originCourse.tutor,
                price: this.originCourse.price,
                content: this.originCourse.content,
                image: this.originCourse.image
            })
        }
        let tutorRef = app.firestore().collection('tutors');
        let allTutors = tutorRef.get().then(snapshot => {
            let list = this.state.tutorSelectList;
            snapshot.forEach(doc =>{
                let tutorObject = {tutorId:doc.id, tutorName:doc.data().userName};
                list.push(tutorObject);
            });
            this.setState({ tutorSelectList : list });
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
                    this.props.history.push('/admin/manageCourse');
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
                    title: values.title,
                    tutor: values.tutor,
                    content: values.content,
                    price: values.price,
                    image: values.image
                };
                if (this.originCourse == null) { // create course
                    axios.post(`${URL.ENDPOINT}${ADDCOURSE}`, {
                        fields: dataObj
                    })
                        .then(function (response) {
                            this.props.history.push('/admin/manageCourse');
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);// todo
                        });
                } else { // modify course
                    axios.post(`${URL.ENDPOINT}${MODIFYCOURSE}`, {
                        id: this.originCourse.id,
                        fields: dataObj
                    })
                        .then(function (response) {
                            this.props.history.push('/admin/manageCourse');
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
                <Form onSubmit={this.handleSubmit} className="course-edit-form">
                    <Form.Item className="titleEdit">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Please input the title!' }],
                        })(
                            <Input
                                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Title"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item hasFeedback>
                        {getFieldDecorator('tutor', {
                            rules: [{ required: true, message: 'Please select the tutor!' }],
                        })(
                            <Select placeholder="Please select a tutor" >
                                {
                                    this.state.tutorSelectList.map((item, index) => {
                                        return (
                                            <option key={item.tutorId}>{item.tutorName}</option>
                                        )
                                    })
                                }
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item className="priceEdit">
                        {getFieldDecorator('price', {
                            rules: [{ required: true, message: 'Please input the price!' }],
                        })(
                            <Input
                                prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Price"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className="imageEdit">
                        {getFieldDecorator('image', {
                            rules: [{ required: true, message: 'Please input the Url Link of picture!' }],
                        })(
                            <Input
                                prefix={<Icon type="file-image" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Url Link of Picture"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className="contentEdit">
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: 'Please input the description!' }],
                        })(
                            <TextArea rows={12} className="contentEditInput"
                                   placeholder="Description"
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

const WrappedNormalForm = Form.create({ name: 'courseEdit' })(CourseEdit);

export default WrappedNormalForm;