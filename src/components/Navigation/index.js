import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import './index.css';

import LogIn from '../SignIn/index';
import Landing from '../Landing/index.jsx';
import SignUp from '../SignUp/index';
import Faq from '../Faq/index';
import ClassList from '../ClassList/index';
import Session from '../Session/index';
import Tutor from '../Tutor/index';

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
                            <Menu.Item key="7">
                                <span>Tutors</span>
                                <Link to="/tutor" />
                            </Menu.Item>
                            <Menu.Item key="4">
                                <span>Classes</span>
                                <Link to="/classList" />
                            </Menu.Item>
                            <Menu.Item key="5">
                                <span>FAQ</span>
                                <Link to="/faq" />
                            </Menu.Item>
                            <Menu.Item key="6">
                                <span>Session</span>
                                <Link to="/session" />
                            </Menu.Item>
                            <Menu.Item key="8">
                                <span>Blog</span>
                                <Link to="/session" />
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
                        <Content style={{ margin: '0px 0px', padding: 0, background: '#fff', Height: 1000, }}>
                            <Switch>
                                <Route exact path="/" component={Landing} />
                                <Route exact path="/classList" component={ClassList} />
                                <Route exact path="/faq" component={Faq} />
                                <Route exact path="/logIn" component={LogIn} />
                                <Route exact path="/signUp" component={SignUp} />
                                <Route exact path="/session" component={Session} />
                                <Route exact path="/tutor" component={Tutor} />
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