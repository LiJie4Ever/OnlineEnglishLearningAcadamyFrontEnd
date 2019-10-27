import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import UserList from './UserList';
import { BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import { compose } from 'recompose';
import * as ROLES from '../../constants/roles';
import withAuthorization from "../Session/withAuthorization";
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
        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            if (usersObject !== null) {
                const usersList = Object.keys(usersObject).map(key => ({
                    ...usersObject[key],
                    uid: key,
                }));
                this.setState({
                    users: usersList,
                    loading: false,
                    hasData: true
                });
            } else {
                this.setState({
                    loading: false,
                    hasData: false
                });
            }
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
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
                                <span>Users</span>
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
                                <Route exact path={`${match.url}${ROUTES.USER_LIST}`} component={() => <UserList data={this.state} />}
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
    withAuthorization(condition),
    withFirebase,
)(AdminPage);