import React, { Component } from 'react';
import PasswordChangePage from '../PasswordChange/index';
import { AuthUserContext, withAuthorization } from '../Session';
import BroughtCourse from './BroughtCourse';

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
                        <BroughtCourse />
                    </div>
                )}
            </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);

