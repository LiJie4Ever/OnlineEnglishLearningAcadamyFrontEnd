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
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";


const { Option } = Select;

class RegistrationForm extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const birthDay = values.birthDay.toString();
                let roles = {};
                if (values.userGroup === ROLES.TUTOR) {
                    roles[ROLES.TUTOR] = ROLES.TUTOR;
                }
                if (values.userGroup === ROLES.STUDENT) {
                    roles[ROLES.STUDENT] = ROLES.STUDENT;
                }
                this.props.firebase
                    .doCreateUserWithEmailAndPassword(this.props.location.state.email, this.props.location.state.password)
                    .then(authUser => {
                         this.props.firebase
                                .user(authUser.user.uid)
                                .set({
                                    userName: values.userName,
                                    email: this.props.location.state.email,
                                    gender: values.gender,
                                    birthDay: birthDay,
                                    country: values.country,
                                    roles: roles,
                                    zoomAccountId: values.zoomAccountId
                                }, { merge: true },);
                        if (roles[ROLES.STUDENT]) {
                            let courseArray = [];
                            let tutoringArray = [];
                            return this.props.firebase
                                .student(authUser.user.uid)
                                .set({
                                    courseArray: courseArray,
                                    tutoringArray: tutoringArray
                                }, { merge: true },);
                        }
                        if (roles[ROLES.TUTOR]) {
                            return this.props.firebase
                                .tutor(authUser.user.uid)
                                .set({
                                    bio: "Please add your introduction",
                                    teachingExperience: 0,
                                    videoLink: ""
                                }, { merge: true },);
                        }
                    })
                    .then(() => {
                        return this.props.firebase.doSendEmailVerification();
                    })
                    .then(() => {
                        this.props.history.push(ROUTES.LANDING);
                    })
                    .catch(error => {
                        console.log(error)
                    });
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
                    {getFieldDecorator('birthDay', config)(<DatePicker />)}
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
                            <Option value="STUDENT">Student</Option>
                            <Option value="TUTOR">Teacher</Option>
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item label="Country" hasFeedback>
                    {getFieldDecorator('country', {
                        rules: [{ required: true, message: 'Please select your country!' }],
                    })(
                        <Select placeholder="Please select your country">
                            <Option value="USA">The United States</Option>
                            <Option value="CHINA">China</Option>
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
