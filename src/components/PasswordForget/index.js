import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import PasswordForgetFormBase from './PasswordForgetForm';
import './index.css';

const PasswordForgetForm = withRouter(withFirebase(PasswordForgetFormBase));

class PasswordForgetPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       return(
           <div>
               <PasswordForgetForm />
           </div>
       )
    }
}


export default PasswordForgetPage;
