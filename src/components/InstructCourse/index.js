import React, { Component } from "react";
import InstructPage from "./InstructPage";
import * as ROLES from "../../constants/roles";
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import {compose} from "recompose";
import {AuthUserContext, withAuthorization, withEmailVerification} from "../Session";
import {Tabs} from "antd";
import NewSessionForm from "./NewSessionForm";
import UpcomingSessionTable from "./UpcomingSessionTable";

const InstructPageWrapper = compose(
    withRouter,
    withFirebase
)(InstructPage);

class InstructCourse extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <AuthUserContext.Consumer>
                {data => <InstructPageWrapper data={data.authUser} />}
            </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser =>
    authUser && !!authUser.roles[ROLES.TUTOR];
export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase
)(InstructCourse);