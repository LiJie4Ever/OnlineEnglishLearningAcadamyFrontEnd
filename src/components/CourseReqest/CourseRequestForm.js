import React, { Component } from "react";
import {
    Form,
    Input,
    Button,
    Select,
    Checkbox,
    Row,
    Col
} from 'antd';
import 'antd/dist/antd.css';
const { Option } = Select;
const { TextArea } = Input;


class CourseRequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tutorList: [],
            courseList: [],
        }
    }

    componentDidMount() {

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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
                <h1 className="Form_tittle">Request 1:1 Live Session</h1>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Course" hasFeedback>
                        {getFieldDecorator('selectedCourse', {
                            rules: [{ required: true, message: 'Please select your course!' }],
                        })(
                            <Select placeholder="Please select a course">
                                <Option value="Learning English">Male</Option>
                                <Option value="Learning Spanish">Female</Option>
                                <Option value="Learning Chinese">Refused to answer</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Preferred Tutor #1" hasFeedback>
                        {getFieldDecorator('firstTutorName', {
                            rules: [{ required: true, message: 'Please select your first preferred tutor!' }],
                        })(
                            <Select placeholder="Please select your first preferred tutor">
                                <Option value="Lijie">Lijie</Option>
                                <Option value="shuquXiao">ShuqiXiao</Option>
                                <Option value="HanLi">HanHanLi</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Preferred Tutor #2" hasFeedback>
                        {getFieldDecorator('secondTutorName', {
                            rules: [{ required: true, message: 'Please select your second preferred tutor!' }],
                        })(
                            <Select placeholder="Please select your second preferred tutor">
                                <Option value="STUDENT">Lijie</Option>
                                <Option value="TUTOR">ShuqiXiao</Option>
                                <Option value="HanHanLi">HanHanLi</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Preferred Tutor #3" hasFeedback>
                        {getFieldDecorator('thirdTutorName', {
                            rules: [{ required: true, message: 'Please select your third preferred tutor!' }],
                        })(
                            <Select placeholder="Please select your third preferred tutor">
                                <Option value="STUDENT">Lijie</Option>
                                <Option value="TUTOR">ShuqiXiao</Option>
                                <Option value="TUTOR">HanHanLi</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="# of Sessions" hasFeedback>
                        {getFieldDecorator('cntOfSessions', {
                            rules: [{ required: true, message: 'Please select your sessions!' }],
                        })(
                            <Select placeholder="Please select your sessions">
                                <Option value="USA">1</Option>
                                <Option value="CHINA">1</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Preferred Time Slot" hasFeedback>
                        {getFieldDecorator('timeSlots', {
                            rules: [{ required: false }],
                        })(
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="select preferred time slot"
                                optionLabelProp="label"
                            >
                                <Option value="1" label="Morning">
                                    Morning (6am ~ 9am)
                                </Option>
                                <Option value="2" label="Late Morning">
                                    Late Morning (9am ~ 12am)
                                </Option>
                                <Option value="3" label="Afternoon">
                                    Afternoon (12am ~ 3pm)
                                </Option>
                                <Option value="4" label="late Afternoon">
                                    late Afternoon (3pm ~ 6pm)
                                </Option>
                                <Option value="5" label="Evening">
                                    Evening (6pm ~ 9pm)
                                </Option>
                                <Option value="6" label="Late Evening">
                                    Late Evening (9pm ~ 24pm)
                                </Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Preferred Days of Week">
                        {getFieldDecorator('daysOfWeek', {
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
                    <Form.Item label="Additional Comments" hasFeedback>
                        {getFieldDecorator('comments', {
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
