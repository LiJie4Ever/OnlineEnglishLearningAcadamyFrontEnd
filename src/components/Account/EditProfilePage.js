import React, { Component } from "react";
import {Button, DatePicker, Form, Icon, Input, Select, Tooltip} from "antd";
import * as URL from '../../constants/url.js';
const defaultQuery = '/user/modify';
const { Option } = Select;
const moment = require('moment');
const axios = require('axios');
const dataFormat = 'YYYY-MM-DD';

class EditProfilPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            birthDay: moment().toString(),
            country: "",
            gender: "",
            userName: "",
        }
    }
    componentDidMount() {
        this.props.firebase.user(this.props.data.uid).get().then(snapshot => {
            this.setState({
                birthDay: moment(snapshot.data().birthDay).format(dataFormat),
                country: snapshot.data().country,
                gender: snapshot.data().gender,
                userName: snapshot.data().userName,
            })
        }).catch(err => {
            console.log(err);
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            let originalName = this.state.userName;
            if (!err) {
                this.setState({
                    birthDay: values.birthDay.toString(),
                    country: values.country,
                    gender: values.gender,
                    userName: values.userName === "" ? originalName : values.userName,
                });
                axios.post(`${URL.ENDPOINT}${defaultQuery}`, {
                    id: this.props.data.uid,
                    fields: this.state
                })
                .then(function (response) {
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
        let birthdayStr= moment(this.state.birthDay, dataFormat);
        const config = {
            rules: [{
                validator: (rule, value, callback) => {
                    if (moment(value).isAfter(moment(new Date()))) {
                        callback("You can not choose your birthday after today!");
                    } else {
                        callback();
                    }
                }
            }],
            initialValue: birthdayStr
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
        return(
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
                        rules: [{whitespace: true}],
                        initialValue: this.state.userName
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Birthday Date">
                    {getFieldDecorator('birthDay', config)(<DatePicker format={dataFormat}/>)}
                </Form.Item>
                <Form.Item label="Gender" hasFeedback>
                    {getFieldDecorator('gender', {
                        rules: [],
                        initialValue: this.state.gender
                    })(
                        <Select placeholder="Please select a gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="unknown">Refused to answer</Option>
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item label="Country" hasFeedback>
                    {getFieldDecorator('country', {
                        rules: [],
                        initialValue: this.state.country
                    })(
                        <Select placeholder="Please select your country">
                            <Option value="USA">The United States</Option>
                            <Option value="CHINA">China</Option>
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
const EditProfileFormPage = Form.create({ name: 'edit' })(EditProfilPage);
export default EditProfileFormPage;
