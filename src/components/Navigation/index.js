import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';


import Landing from "../Landing";
import ClassList from "../ClassList";
import Faq from "../Faq";
import LogIn from "../SignIn";
import SignUp from "../SignUp";
import Profile from "../Profile";
import Account from "../Account";

import MenuAuth from "./MenuAuth";
import MenuUnAuth from "./MenuUnAuth";
import PasswordForgetPage from "../PasswordForget";

const { Content, Footer } = Layout;

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const CustomizedMenu = () => (
            <div>
                <AuthUserContext.Consumer>
                    {authUser =>
                        authUser.authUser ? <MenuAuth /> : <MenuUnAuth />
                    }
                </AuthUserContext.Consumer>
            </div>
        );

        return (
            <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <CustomizedMenu />
                    <Layout>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Switch>
                                <Route exact path={ROUTES.LANDING} component={Landing} />
                                <Route exact path={ROUTES.CLASS_LIST} component={ClassList} />
                                <Route exact path={ROUTES.FAQ} component={Faq} />
                                <Route exact path={ROUTES.LOG_IN} component={LogIn} />
                                <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
                                <Route exact path={ROUTES.PROFILE} component={Profile} />
                                <Route exact path={ROUTES.ACCOUNT} component={Account} />
                                <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                        </Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default Navbar;