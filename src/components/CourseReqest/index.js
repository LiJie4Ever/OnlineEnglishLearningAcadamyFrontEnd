import React, { Component } from "react";
import './index.css';
import { compose } from 'recompose';
import * as ROLES from '../../constants/roles';
import { withAuthorization, withEmailVerification } from '../Session';
import AuthUserContext from "../Session/context";
import CourseRequestFormBase from "./CourseRequestForm";
import {withFirebase} from "../Firebase";
import { withRouter } from 'react-router-dom';

const CourseRequestForm = compose(
    withRouter,
    withFirebase,
)(CourseRequestFormBase);

class CourseRequestPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AuthUserContext.Consumer>
                {data => (
                    <div className='Request_Container'>
                        <CourseRequestForm data={data} />
                    </div>
                )}
            </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser =>
    authUser && !!authUser.roles[ROLES.STUDENT];
export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(CourseRequestPage);