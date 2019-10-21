import React from 'react';
import { Component } from 'react';
import NavBar from '../Navigation/index';
import { withAuthentication } from '../Session';


class App extends Component {

    render() {
        return (
            <NavBar />
        )
    }
}

export default withAuthentication(App);
