import React, { Component } from 'react';
import * as ROLES from "../../constants/roles";
import {compose} from "recompose";
import {withAuthorization, withEmailVerification} from "../Session";
import {withFirebase} from "../Firebase";
import BoughtCourse from './BoughtCourse';

class TakeCoursePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <BoughtCourse/>
            </div>
        );
    }
}

const condition = authUser =>
    authUser && !!authUser.roles[ROLES.STUDENT];
export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase
)(TakeCoursePage);
