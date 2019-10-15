import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import './index.css';

import SignUp from '../SignUp/index';
import LogIn from '../SignIn/index';

const { Content, Footer } = Layout;

class Navbar extends Component {

    render() {
        return (
            <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <Layout>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="horizontal" className='Nav_Menu'>
                            <Menu.Item key="1" className="Nav_Menu_Item">
                                <Icon type="pie-chart" />
                                <span>Sign Up</span>
                                <Link to="/signup" />
                            </Menu.Item>
                            <Menu.Item key="2" className="Nav_Menu_Item">
                                <Icon type="desktop" />
                                <span>Log In</span>
                                <Link to="/login" />
                            </Menu.Item>
                        </Menu>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Switch>
                                <Route exact path="/signUp" component={SignUp} />
                                <Route exact path="/logIn" component={LogIn} />
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