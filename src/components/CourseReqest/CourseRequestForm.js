import React, { Component } from "react";
import {
    Form,
    Input,
    Button,
    Select,
    Checkbox,
    Row,
    Col,
    InputNumber,
    DatePicker,
    notification
} from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;
const { TextArea } = Input;
const moment_tz = require('moment-timezone');
const moment = require('moment');
const uuid = require('uuid/v1');

const { MonthPicker } = DatePicker;

class CourseRequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tutorList: [],
            top1: "",
            top2: "",
            top3: "",
        }
    }

    componentDidMount() {
        this.unsubscribe = this.props.firebase.tutors().onSnapshot(snapshot => {
            let tutors = [];
            snapshot.forEach(doc => {
                tutors.push({
                        uid: doc.id,
                        userName: doc.data().userName
                    });
                }
            );
            this.setState({
                tutorList: tutors,
                top1: "",
                top2: "",
                top3: "",
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
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
                let price = 0;

                let data = {
                    studentId: this.props.data.authUser.uid,
                    createTime: createTime,
                    note: values.note === undefined ? "" : values.note,
                    offset: offset,
                    numOfS: values.cntOfSessions,
                    price: price,
                    availableDay: values.daysOfWeek,
                    availableTimeSlot: values.timeSlots,
                    preferredT1: values.firstTutorName,
                    preferredT2: values.secondTutorName,
                    preferredT3: values.thirdTutorName,
                    phone: values.prefix + values.phone,
                    graduationYear: values.graduate.format('YYYY-MM'),
                    status: 0
                };
                this.props.firebase.request().doc(uuid()).set(data).then(() => {
                    notification.open({
                      message: 'Request submitted!',
                    });
                    let history = this.props.history;
                    setTimeout(function () {
                        history.push('/');
                    }, 2000);

                    console.log("successfully");
                }).catch(() => {
                    console.log("error");
                })
            }
        });
    };

    changeTop1 = value => {
        this.setState({
            top1: value
        })
    };

    changeTop2 = value => {
        this.setState({
            top2: value
        })
    };

    changeTop3 = value => {
        this.setState({
            top3: value
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '+86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="+86">+86</Option>
                <Option value="+1">+1</Option>
            </Select>,
        );
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
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' },
                {
                    validator: (rule, value, callback) => {
                        if (moment(value).isBefore(moment(new Date()))) {
                            console.log(value);
                            callback("Please choose a date in the future!");
                        } else {
                            callback();
                        }
                    }
                }],
        };
        return(
            <div>
                <h1 className="Form_tittle">Request 1 on 1 Live Tutoring</h1>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Phone Number">
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                    </Form.Item>
                    <Form.Item label="Current School">
                        {getFieldDecorator('school', {
                            rules: [{ required: true, message: 'Please input your current school!', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Graduation year">
                        {getFieldDecorator('graduate', config)(<MonthPicker />)}
                    </Form.Item>
                    <Form.Item label="Preferred Tutor #1" hasFeedback>
                        {getFieldDecorator('firstTutorName', {
                            rules: [{ required: true, message: 'Please select your first preferred tutor!' },
                                { validator: (rule, value, callback) => {
                                        if (value && (value === this.state.top2 || value === this.state.top3)) {
                                            callback("You can not choose the same tutor!");
                                        } else {
                                            callback();
                                        }
                                    }
                                }
                            ],
                        })(
                            <Select placeholder="Please select your first preferred tutor" onChange={this.changeTop1}>
                                {
                                    this.state.tutorList.map((item, index) => {
                                        let changeFormat = item.userName.substring(0, 1).toUpperCase() + item.userName.substring(1);
                                        return(
                                            <Option key={item.uid} value={item.uid}>{changeFormat}</Option>
                                        )
                                    })
                                }
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Preferred Tutor #2" hasFeedback>
                        {getFieldDecorator('secondTutorName', {
                            rules: [
                                { required: true, message: 'Please select your second preferred tutor!' },
                                { validator: (rule, value, callback) => {
                                        if (value && (value === this.state.top1 || value === this.state.top3)) {
                                            callback("You can not choose the same tutor!");
                                        } else {
                                            callback();
                                        }
                                    }
                                }
                                ],
                        })(
                            <Select placeholder="Please select your second preferred tutor" onChange={this.changeTop2}>
                                {
                                    this.state.tutorList.map((item, index) => {
                                        let changeFormat = item.userName.substring(0, 1).toUpperCase() + item.userName.substring(1);
                                        return(
                                            <Option key={item.uid} value={item.uid}>{changeFormat}</Option>
                                        )
                                    })
                                }
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Preferred Tutor #3" hasFeedback>
                        {getFieldDecorator('thirdTutorName', {
                            rules: [{ required: true, message: 'Please select your third preferred tutor!' },
                                { validator: (rule, value, callback) => {
                                        if (value && (value === this.state.top1 || value === this.state.top2)) {
                                            callback("You can not choose the same tutor!");
                                        } else {
                                            callback();
                                        }
                                    }
                                }
                                ],
                        })(
                            <Select placeholder="Please select your third preferred tutor" onChange={this.changeTop3}>
                                {
                                    this.state.tutorList.map((item, index) => {
                                        let changeFormat = item.userName.substring(0, 1).toUpperCase() + item.userName.substring(1);
                                        return(
                                            <Option key={item.uid} value={item.uid}>{changeFormat}</Option>
                                        )
                                    })
                                }
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="# of Sessions" hasFeedback>
                        {getFieldDecorator('cntOfSessions', {
                            rules: [{ required: true, message: 'Please select your sessions!' }],
                        })(
                            <InputNumber min={1} max={10} step={1} />
                        )}
                    </Form.Item>
                    <Form.Item label="Preferred Time Slot" hasFeedback>
                        {getFieldDecorator('timeSlots', {
                            rules: [{ required: true }],
                        })(
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="select preferred time slot"
                                optionLabelProp="label"
                            >
                                <Option value="6am~9am" label="Morning">
                                    Morning (6am ~ 9am)
                                </Option>
                                <Option value="9am~12am" label="Late Morning">
                                    Late Morning (9am ~ 12am)
                                </Option>
                                <Option value="12am~3pm" label="Afternoon">
                                    Afternoon (12am ~ 3pm)
                                </Option>
                                <Option value="3pm~6pm" label="Late Afternoon">
                                    late Afternoon (3pm ~ 6pm)
                                </Option>
                                <Option value="6pm~9pm" label="Evening">
                                    Evening (6pm ~ 9pm)
                                </Option>
                                <Option value="9pm~24pm" label="Late Evening">
                                    Late Evening (9pm ~ 24pm)
                                </Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Preferred Days of Week">
                        {getFieldDecorator('daysOfWeek', {
                            rules: [{ required: true }],
                            initialValue: [],
                        })(
                            <Checkbox.Group style={{ width: '100%' }}>
                                <Row>
                                    <Col span={8}>
                                        <Checkbox value="Mon">Mon</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Tue">Tue</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Wed">Wed</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Thu">Thu</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Fri">Fri</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Sat">Sat</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Sun">Sun</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>,
                        )}
                    </Form.Item>
                    <Form.Item label="Extra Info:" hasFeedback>
                        {getFieldDecorator('note', {
                            rules: [{ required: false }]
                        })(
                            <TextArea rows={4} />,
                        )}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedCourseRequestForm = Form.create({ name: 'courseRequest' })(CourseRequestForm);
export default WrappedCourseRequestForm;
