import React, { Component} from 'react';
import { Form, Icon, Input, Button, Checkbox,Select } from 'antd';
import * as URL from "../../../constants/url";
import './index.css';

const { Option } = Select;
const ADDBLOG = "/blog/add";
const MODIFYBLOG = "/blog/modify";
const axios = require('axios');
const ENDPOINT = "http://localhost:5009/onlineenglishacademy-eddb3/us-central1/api";

class AddSchedule extends Component{
    constructor(props) {
        super(props);
        this.cancelAdd = this.cancelAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
    }

    cancelAdd() {
        this.props.history.push('/admin/schedule');
    }

    handleSubmit = e => {
      // todo, validate the input
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            console.log(values);
            //return;
            if (!err) {
                var myD = new Date();
                let date = myD.getFullYear()+"-"+(myD.getMonth()+1)+"-"+myD.getDate()
                +" "+myD.getHours()+":"+myD.getMinutes();
                console.log(date);
                //return;
                let dataObj = {
                    student: values.selectedStudent,
                    tutor: values.selectedTutor,
                    meetingStartTime: values.startTime,
                    offset: values.timezone,
                    duration: values.duration,
                    createTime: date,
                    link:"",
                    status:""
                };
                console.log(dataObj);
                //return;
                //create a schedule
                axios.post(`${ENDPOINT}`+"/schedule/add", {
                    fields: dataObj
                })
                    .then(function (response) {
                        this.props.history.push('/admin/schedule');
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);// todo
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return(
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="blog-edit-form">
                    <Form.Item label="Tutor" hasFeedback>
                        {getFieldDecorator('selectedTutor', {
                            rules: [{ required: true, message: 'Please select the tutor!' }],
                        })(
                            <Select placeholder="Please select a course">
                                <Option value="VmytE8ZVT6VlGdMXqn6J">Jack Ber</Option>
                                <Option value="bqSRNCOz5gguQA5RfRla">Sebastian Evans</Option>
                                <Option value="h3q4RjwqFmTkHZos1mV1RvyQyp32">Lisa Brian</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Student" hasFeedback>
                        {getFieldDecorator('selectedStudent', {
                            rules: [{ required: true, message: 'Please select the student!' }],
                        })(
                            <Select placeholder="Please select a course">
                                <Option value="ONm5h98A9WUOAbmjdwPajf1DQDA3">ts_Junjing</Option>
                                <Option value="zeQHpjltTfcVGkxWZ5jPtCv5S2J3">zxuan</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="start time">
                        {getFieldDecorator('startTime', {
                            rules: [{ required: true, message: 'Please input the title!' }],
                        })(
                            <Input
                                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="The date and time of the session"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="timezone">
                        {getFieldDecorator('timezone', {
                            rules: [{ required: true, message: 'Please input the author!' }],
                        })(
                            <Input
                                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Time zone of the student"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="duration">
                        {getFieldDecorator('duration', {
                            rules: [{ required: true, message: 'Please input the author!' }],
                        })(
                            <Input
                                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="How long is this session"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}>
                    <Button type="primary" htmlType="submit" className="comfirmBTN">
                        Comfirm
                    </Button>
                    <a className="cancelBTN" onClick={this.cancelEdit}>cancel</a>

                    </Form.Item>

                </Form>
            </div>
        )
    }
}

const WrappedNormalForm = Form.create({ name: 'AddSchedule' })(AddSchedule);

export default WrappedNormalForm;
