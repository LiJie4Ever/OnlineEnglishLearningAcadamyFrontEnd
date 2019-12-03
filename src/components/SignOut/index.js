import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

class SignOutPage extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick = () => {
        this.props.firebase.doSignOut();
        this.props.history.push('/');
    };

    render() {
        return(
            <span onClick={this.handleClick}>
            Sign Out
            </span>
        );
    }
}

const SignOutPageWrapper = compose(
    withRouter,
    withFirebase,
)(SignOutPage);

export default SignOutPageWrapper;