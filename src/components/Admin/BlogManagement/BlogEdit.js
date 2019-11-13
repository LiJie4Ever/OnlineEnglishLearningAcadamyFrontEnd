import React, { Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import * as URL from "../../../constants/url";
import './index.css';

const ADDBLOG = "/blog/add";
const MODIFYBLOG = "/blog/modify";
const axios = require('axios');


class BlogEdit extends Component{
    constructor(props) {
        super(props);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.originBlog = this.props.location.state.item;
    }

    componentDidMount() {
        console.log(this.originBlog);
        if (this.originBlog != null) {
            this.props.form.setFieldsValue({
                title: this.originBlog.title,
                author: this.originBlog.author,
                content: this.originBlog.content
            })
        }
    }

    cancelEdit() {
        this.props.history.push('/admin/manageBlog');
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let dataObj = {
                    title: values.title,
                    author: values.author,
                    content: values.content
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
                    <Form.Item className="contentEdit">
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: 'Please input the blog!' }],
                        })(
                            <Input className="contentEditInput"
                                prefix={<Icon type="file-text" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Blog"
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

const WrappedNormalForm = Form.create({ name: 'blogEdit' })(BlogEdit);

export default WrappedNormalForm;