import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import UserList from './UserList';
import { BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import { compose } from 'recompose';
import * as ROLES from '../../constants/roles';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROUTES from "../../constants/routes";

const { Sider, Content } = Layout;

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            hasData: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.unsubscribe = this.props.firebase.users().onSnapshot(snapshot => {
            let users = [];
            console.log(snapshot);
            snapshot.forEach(doc => {
                    users.push({ ...doc.data(), uid: doc.id });
                }
            );
            this.setState({
                users: users,
                loading: false,
                hasData: true
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const match = this.props.match;
        return (
            <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Icon type="user" />
                                <span>Tutors</span>
                                <Link to={`${match.url}${ROUTES.USER_LIST}`} />
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="file" />
                                <span>Blog</span>
                                <Link to={`${match.url}${ROUTES.MANAGE_BLOG}`} />
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="schedule" />
                                <span>Scheduling</span>
                                <Link to={`${match.url}${ROUTES.SCHEDULE}`} />
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="money-collect" />
                                <span>Payment</span>
                                <Link to={`${match.url}${ROUTES.PAYMENT}`} />
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Switch>
                                <Route exact path={`${match.url}${ROUTES.USER_LIST}`} component={UserList} />}
                                />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

const condition = authUser =>
    authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase
)(AdminPage);