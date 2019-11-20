import React from "react";
import {Button, Checkbox, Form, Icon, Input, notification} from "antd";
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "./index.css";

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values.email, values.password);
                this.props.firebase
                    .doSignInWithEmailAndPassword(values.email, values.password)
                    .then((res) => {
                        this.setState({ ...INITIAL_STATE });
                        console.log(res);
                        this.props.history.push(ROUTES.LANDING);
                    })
                    .catch(error => {
                        notification.open({
                            message:"Wrong password!",
                        });
                        this.setState({ error });
                        console.log(error);
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="LogIn_Container">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email address!' }],
                        })(
                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <span className="login-form-forgot">Forgot password <Link to={ROUTES.PASSWORD_FORGET}>Click here</Link></span>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <span>register now! <Link to={ROUTES.SIGN_UP}>Register</Link></span>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default  WrappedNormalLoginForm;
