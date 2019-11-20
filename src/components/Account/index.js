import React, { Component } from 'react';
import PasswordChangePage from '../PasswordChange/index';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import 'antd/dist/antd.css';
import EditProfilPage from "./EditProfilePage";
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import {Tabs} from "antd";

const EditProfilPageWrapper = compose(
    withRouter,
    withFirebase,
)(EditProfilPage);
const { TabPane } = Tabs;

class AccountPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AuthUserContext.Consumer>
                {data => (
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Edit Profile" key="1">
                            <EditProfilPageWrapper data={data.authUser} />
                        </TabPane>
                        <TabPane tab="Reset Password" key="2">
                            <PasswordChangePage />
                        </TabPane>
                    </Tabs>
                )}
            </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser => !!authUser;
export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(AccountPage);

