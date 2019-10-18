import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import * as ROUTES from '../../constants/routes';

import LogIn from '../SignIn/index';
import Landing from '../Landing/index';
import SignUp from '../SignUp/index';
import Faq from '../Faq/index';
import ClassList from '../ClassList/index';
import Profile from '../Profile/index';

const { Content, Footer } = Layout;

class Navbar extends Component {

    render() {
        return (
            <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <Layout>
                        <Menu theme="dark" mode="horizontal" className='Nav_Menu'>
                            <Menu.Item key="1">
                                <Icon type="home" />
                                <span>Home</span>
                                <Link to={ROUTES.LANDING} />
                            </Menu.Item>
                            <Menu.Item key="4">
                                <span>Classes</span>
                                <Link to={ROUTES.CLASS_LIST} />
                            </Menu.Item>
                            <Menu.Item key="5">
                                <span>FAQ</span>
                                <Link to={ROUTES.FAQ} />
                            </Menu.Item>
                            <Menu.Item key="2" className="Nav_Menu_Item">
                                <Icon type="login" />
                                <span>Log In</span>
                                <Link to={ROUTES.LOG_IN} />
                            </Menu.Item>
                        </Menu>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Switch>
                                <Route exact path={ROUTES.LANDING} component={Landing} />
                                <Route exact path={ROUTES.CLASS_LIST} component={ClassList} />
                                <Route exact path={ROUTES.FAQ} component={Faq} />
                                <Route exact path={ROUTES.LOG_IN} component={LogIn} />
                                <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
                                <Route exact path={ROUTES.PROFILE} component={Profile} />
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