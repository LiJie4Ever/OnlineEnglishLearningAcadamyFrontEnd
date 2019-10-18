import React, { Component } from 'react';
import ProfileForm from './ProfileForm';
import './index.css';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

const ProfileStandardForm = compose(
    withRouter,
    withFirebase,
)(ProfileForm);

class Profile extends Component {
    render() {
        return(
            <div className='Profile_Container'>
                <ProfileStandardForm />
            </div>
        )
    }
}

export default Profile;