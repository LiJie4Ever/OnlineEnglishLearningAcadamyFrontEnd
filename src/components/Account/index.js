import React, { Component } from 'react';
import PasswordChangePage from '../PasswordChange/index';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import 'antd/dist/antd.css';
import EditProfilPage from "./EditProfilePage";
import ProfileInfoPage from "./ProfileInfoPage";
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import {Tabs} from "antd";

const ProfileInfoPageWrapper = compose(
    withRouter,
    withFirebase,
)(ProfileInfoPage);

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
                        <TabPane tab="Profile Info" key="1">
                            <ProfileInfoPageWrapper data={data.authUser} />
                        </TabPane>
                        <TabPane tab="Edit Profile" key="2">
                            <EditProfilPageWrapper data={data.authUser} />
                        </TabPane>
                        <TabPane tab="Reset Password" key="3">
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

