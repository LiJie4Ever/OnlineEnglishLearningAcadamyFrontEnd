import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import './index.css';

import LogIn from '../SignIn/index';
import Landing from '../Landing/index';
import SignUp from '../SignUp/index';

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
                                <Link to="/" />
                            </Menu.Item>
                            <Menu.Item key="2" className="Nav_Menu_Item">
                                <Icon type="login" />
                                <span>Log In</span>
                                <Link to="/logIn" />
                            </Menu.Item>
                            <Menu.Item key="3" className="Nav_Menu_Item">
                                <Icon type="desktop" />
                                <span>Register</span>
                                <Link to="/signUp" />
                            </Menu.Item>
                        </Menu>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Switch>
                                <Route exact path="/" component={Landing} />
                                <Route exact path="/logIn" component={LogIn} />
                                <Route exact path="/signUp" component={SignUp} />
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