import React, { Component } from "react";
import './index.css';
import {
    Form,
    Input,
    Button,
    DatePicker,
    InputNumber
} from 'antd';
import * as URL from '../../constants/url';
const axios = require('axios');
const defaultQuery = '/tutorClassroom/meetings/createMeeting';

class NewSessionForm extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post(`${URL.ENDPOINT}${defaultQuery}`, {
                    accessToken: this.props.accessToken,
                    topic: values.topic,
                    start_time: values.start_time.format('YYYY-MM-DD HH:mm:ss'),
                    duration: values.duration
                }) .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 8,
                }
            },
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 16,
                },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 8,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <div className='newSession_Container'>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Topic">
                        {getFieldDecorator('topic', {
                            rules: [{ required: true, message: 'Please input your topic!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Date and time">
                        {getFieldDecorator('start_time', {
                            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
                        )}
                    </Form.Item>
                    <Form.Item label="Duration">
                        {getFieldDecorator('duration', { initialValue: 1 })(<InputNumber min={1} max={10} step={0.5}/>)}
                        <span className="ant-form-text"> hours</span>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedNewSessionForm = Form.create({ name: 'NewSession' })(NewSessionForm);
export default WrappedNewSessionForm;