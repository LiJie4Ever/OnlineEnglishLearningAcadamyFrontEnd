import React, { Component } from "react";
import './index.css';
import {
    Form,
    Input,
    Button,
    DatePicker,
    AutoComplete
} from 'antd';
import * as URL from '../../constants/url';
const axios = require('axios');
const AutoCompleteOption = AutoComplete.Option;
const moment_tz = require('moment-timezone');
const moment = require('moment');
const defaultQuery = '/schedule/setScheduleLink'

class NewSessionTable extends Component {
    constructor(props) {
        super(props);
        this.state ={
            autoCompleteResult: [],
        }
    }

    componentDidMount() {

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let offset = moment_tz().tz(moment_tz.tz.guess(true)).format('Z');
                let now = moment_tz().tz(moment_tz.tz.guess(true));
                let UTCTimeString = now.utc().format();
                let timeData = UTCTimeString.split('T');
                let createTime = timeData[0] + ' ' + timeData[1].substring(0, timeData[1].length - 1);
                console.log(offset);
                console.log(createTime);
                console.log(this.props.requestID);
                let data = {
                    createTime: createTime,
                    offset: offset,
                    link: values.website,
                    topic: values.topic
                };

                axios.post(`${URL.ENDPOINT}${defaultQuery}`, {
                    id: this.props.requestID,
                    fields: data
                }) .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        });
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
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
                    <Form.Item label="Zoom Link">
                        {getFieldDecorator('website', {
                            rules: [{ required: true, message: 'Please input website!' }],
                        })(
                            <AutoComplete
                                dataSource={websiteOptions}
                                onChange={this.handleWebsiteChange}
                                placeholder="website"
                            >
                                <Input />
                            </AutoComplete>,
                        )}
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

const WrappedNewSessionForm = Form.create({ name: 'NewSession' })(NewSessionTable);
export default WrappedNewSessionForm;