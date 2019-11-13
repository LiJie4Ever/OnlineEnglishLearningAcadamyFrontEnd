import React, { Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';
import * as URL from "../../../constants/url";
import './index.css';

const MODIFYTUTOR = "/tutor/modify";
const axios = require('axios');


class TutorEdit extends Component{
    constructor(props) {
        super(props);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.originTutor = this.props.location.state.item;
    }

    componentDidMount() {
        console.log(this.originTutor);
        this.props.form.setFieldsValue({
            userName: this.originTutor.userName,
            bio: this.originTutor.bio,
            picUrl: this.originTutor.picUrl,
            teachExp: this.originTutor.teachExp
        });
    }

    cancelEdit() {
        this.props.history.push('/admin/manageTutor');
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let dataObj = {
                    userName: values.userName,
                    bio: values.bio,
                    picUrl: values.picUrl,
                    teachExp: values.teachExp
                };
                axios.post(`${URL.ENDPOINT}${MODIFYTUTOR}`, {
                    id: this.originTutor.id,
                    fields: dataObj
                })
                    .then(function (response) {
                        this.props.history.push('/admin/manageTutor');
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);// todo
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form onSubmit={this.handleSubmit} className="tutor-edit-form">
                    <Form.Item className="userNameEdit">
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input the tutor\'s name!' }],
                        })(
                            <Input
                                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className="bioEdit">
                        {getFieldDecorator('bio', {
                            rules: [{ required: true, message: 'Please input the Introduction!' }],
                        })(
                            <Input
                                prefix={<Icon type="file-text" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Introduction"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className="teachExpEdit">
                        {getFieldDecorator('teachExp', {
                            rules: [{ required: true, message: 'Please input the length of teaching experience!' }],
                        })(
                            <Input prefix={<Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                   placeholder="Blog"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className="picUrlEdit">
                        {getFieldDecorator('picUrl', {
                            rules: [{ required: true, message: 'Please input the URL of tutor\'s portrait!' }],
                        })(
                            <Input prefix={<Icon type="picture" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                   placeholder="URL"
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

const WrappedNormalForm = Form.create({ name: 'tutorEdit' })(TutorEdit);

export default WrappedNormalForm;