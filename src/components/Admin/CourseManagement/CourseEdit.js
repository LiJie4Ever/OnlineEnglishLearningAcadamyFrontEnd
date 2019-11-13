import React, { Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import * as URL from "../../../constants/url";
import './index.css';

const ADDCOURSE = "/course/add";
const MODIFYCOURSE = "/course/modify";
const axios = require('axios');


class CourseEdit extends Component{
    constructor(props) {
        super(props);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.originCourse = this.props.location.state.item;
    }

    componentDidMount() {
        console.log(this.originCourse);
        if (this.originCourse != null) {
            this.props.form.setFieldsValue({
                title: this.originCourse.title,
                tutor: this.originCourse.tutor,
                price: this.originCourse.price,
                content: this.originCourse.content
            })
        }
    }

    cancelEdit() {
        this.props.history.push('/admin/manageCourse');
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let dataObj = {
                    title: values.title,
                    tutor: values.tutor,
                    content: values.content,
                    price: values.price
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
                    <Form.Item className="tutorEdit">
                        {getFieldDecorator('tutor', {
                            rules: [{ required: true, message: 'Please input the tutor\'s name!' }],
                        })(
                            <Input
                                prefix={<Icon type="contacts" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Tutor"
                            />,
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
                    <Form.Item className="contentEdit">
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: 'Please input the description!' }],
                        })(
                            <Input className="contentEditInput"
                                   prefix={<Icon type="file-text" style={{ color: 'rgba(0,0,0,.25)' }} />}
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