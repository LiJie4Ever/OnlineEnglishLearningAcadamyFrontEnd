//edited by hao
import React, { Component } from 'react';
import * as ROLES from "../../constants/roles";
import {compose} from "recompose";
import {AuthUserContext, withAuthorization, withEmailVerification} from "../Session";
import {withFirebase} from "../Firebase";
import UserRequestList from "./UserRequestList";

const UserRequestListWrapper = compose(
    withFirebase
)(UserRequestList);
class RequestHistory extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <AuthUserContext.Consumer>
                {data =>
                    <UserRequestListWrapper data={data.authUser}/>
                }
            </AuthUserContext.Consumer>
        );
    }
}

const condition = authUser =>
    authUser && !! authUser.roles[ROLES.STUDENT];
export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase
)(RequestHistory);
