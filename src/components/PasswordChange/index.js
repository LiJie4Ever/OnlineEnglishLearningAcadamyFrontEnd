import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import PasswordChangeFormBase from './PasswordChangeForm';
import './index.css';

const PasswordChangeForm = withRouter(withFirebase(PasswordChangeFormBase));

class PasswordChangePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <PasswordChangeForm />
            </div>
        )
    }
}


export default PasswordChangePage;