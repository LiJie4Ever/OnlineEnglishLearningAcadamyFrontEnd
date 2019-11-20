import React, { Component} from 'react';
import { Form, Icon, Input, Button, Modal } from 'antd';
import * as URL from "../../../constants/url";
import './index.css';

const MODIFYTUTOR = "/tutor/modify";
const axios = require('axios');
const { confirm } = Modal;


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
            teachExp: this.originTutor.teachExp,
            videoLink: this.originTutor.videoLink
        });
    }

    cancelEdit() {
        confirm({
            title: 'Do you want to cancel editing?',
            content: 'When clicked the OK button, the edit page will be closed and the change will not be saved.',
            visible: true,
            onOk:() => {
                return new Promise((resolve, reject) => {
                    this.props.history.push('/admin/manageTutor');
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 100);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
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
                                   placeholder="Teaching Experience (years)"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className="picUrlEdit">
                        {getFieldDecorator('picUrl', {
                            rules: [{ required: true, message: 'Please input the URL link of tutor\'s portrait!' }],
                        })(
                            <Input prefix={<Icon type="picture" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                   placeholder="Url link of picture"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className="videoUrlEdit">
                        {getFieldDecorator('videoLink', {
                            rules: [{ required: true, message: 'Please input the URL link of tutor\'s video intro!' }],
                        })(
                            <Input prefix={<Icon type="play-square" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                   placeholder="Url link of video"
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