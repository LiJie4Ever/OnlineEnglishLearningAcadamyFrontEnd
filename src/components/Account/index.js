import React, { Component } from 'react';
import PasswordChangePage from '../PasswordChange/index';
import { AuthUserContext, withAuthorization } from '../Session';
import { Divider } from 'antd';
import 'antd/dist/antd.css';
import BoughtCourse from './BoughtCourse';

class AccountPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AuthUserContext.Consumer>
                {data => (
                    <div>
                        <h1>Account: {data.authUser.email}</h1>
                        <PasswordChangePage />
                        <BoughtCourse />
                    </div>
                )}
            </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);

