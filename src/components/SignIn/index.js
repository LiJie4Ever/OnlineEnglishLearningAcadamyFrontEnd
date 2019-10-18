import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import LogInForm from './LogInForm';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

const SignInForm = compose(
    withRouter,
    withFirebase,
)(LogInForm);

class SignInPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SignInForm />
            </div>
        )
    }
}

export default SignInPage;
