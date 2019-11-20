import React, { Component} from 'react';
import {Form, Icon, Input, Button, Checkbox, Modal} from 'antd';
import * as URL from "../../../constants/url";
import './index.css';
import ReactQuill from 'react-quill';
import '../../../../node_modules/react-quill/dist/quill.snow.css'; // ES6

const ADDBLOG = "/blog/add";
const MODIFYBLOG = "/blog/modify";
const axios = require('axios');
const { confirm } = Modal;


class BlogEdit extends Component{
    constructor(props) {
        super(props);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.originBlog = this.props.location.state.item;
        this.state = { text: '' } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    componentDidMount() {
        console.log(this.originBlog);
        if (this.originBlog != null) {
            this.props.form.setFieldsValue({
                title: this.originBlog.title,
                author: this.originBlog.author,
                content: this.originBlog.content,
                picUrl: this.originBlog.picUrl
            })
            this.setState({text: this.originBlog.content})
        }
    }

    cancelEdit() {
        confirm({
            title: 'Do you want to cancel editing?',
            content: 'When clicked the OK button, the edit page will be closed and the change will not be saved.',
            visible: true,
            onOk:() => {
                return new Promise((resolve, reject) => {
                    this.props.history.push('/admin/manageBlog');
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
                    title: values.title,
                    author: values.author,
                    content: this.state.text,
                    picUrl: this.state.picUrl
                };
                if (this.originBlog == null) { // create blog
                    axios.post(`${URL.ENDPOINT}${ADDBLOG}`, {
                        fields: dataObj
                    })
                        .then(function (response) {
                            this.props.history.push('/admin/manageBlog');
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);// todo
                        });
                } else { // modify blog
                    axios.post(`${URL.ENDPOINT}${MODIFYBLOG}`, {
                        id: this.originBlog.id,
                        fields: dataObj
                    })
                        .then(function (response) {
                            this.props.history.push('/admin/manageBlog');
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);// todo
                        });
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form onSubmit={this.handleSubmit} className="blog-edit-form">
                    <Form.Item className="titleEdit">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Please input the title!' }],
                        })(
                            <Input
                                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Title"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className="authorEdit">
                        {getFieldDecorator('author', {
                            rules: [{ required: true, message: 'Please input the author!' }],
                        })(
                            <Input
                                prefix={<Icon type="contacts" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Author"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className="picUrlEdit">
                        {getFieldDecorator('picUrl', {
                            rules: [{ required: true, message: 'Please input the Url Link of picture!' }],
                        })(
                            <Input
                                prefix={<Icon type="file-image" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Url Link of Picture"
                            />,
                        )}
                    </Form.Item>
                    <ReactQuill value={this.state.text}
                                onChange={this.handleChange} />
                    <Button type="primary" htmlType="submit" className="comfirmBTN">
                        Comfirm
                    </Button>
                    <a className="cancelBTN" onClick={this.cancelEdit}>cancel</a>
                </Form>
            </div>
        )
    }
}

const WrappedNormalForm = Form.create({ name: 'blogEdit' })(BlogEdit);

export default WrappedNormalForm;