import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Button,
    DatePicker,
    Select,
} from 'antd';

const { Option } = Select;

class RegistrationForm extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log(this.props.data.idToken);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
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

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item
                    label={
                        <span>
                            UserName&nbsp;
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Birthday Date">
                    {getFieldDecorator('date-picker', config)(<DatePicker />)}
                </Form.Item>
                <Form.Item label="Gender" hasFeedback>
                    {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select your gender!' }],
                    })(
                        <Select placeholder="Please select a gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="unknown">Refused to answer</Option>
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item label="Identity" hasFeedback>
                    {getFieldDecorator('userGroup', {
                        rules: [{ required: true, message: 'Please select your identity!' }],
                    })(
                        <Select placeholder="Please select your identity">
                            <Option value="student">Student</Option>
                            <Option value="teacher">Teacher</Option>
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item
                    label={
                        <span>
                            Personal Meeting ID&nbsp;
                            <Tooltip title="ID in your Zoom profile for instant meetings">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator('zoomAccountId', {
                        rules: [{ required: true, message: 'Please input your Zoom Personal Meeting ID!', whitespace: true }],
                    })(<Input />)}
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
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm;
