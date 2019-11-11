import React, { Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.css';

class BlogEdit extends Component{
    constructor(props) {
        super(props);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    cancelEdit() {
        this.props.history.push('/admin/blogList');
    }

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