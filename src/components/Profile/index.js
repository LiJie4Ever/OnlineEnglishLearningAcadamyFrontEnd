import React, { Component } from 'react';
import ProfileForm from './ProfileForm';
import './index.css';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

const ProfileStandardForm = compose(
    withRouter,
    withFirebase,
)(ProfileForm);

class Profile extends Component {
    render() {
        return(
            <div className='Profile_Container'>
                <AuthUserContext.Consumer>
                    {data => <ProfileStandardForm data={data} />}
                </AuthUserContext.Consumer>
            </div>
        )
    }
}

export default Profile;