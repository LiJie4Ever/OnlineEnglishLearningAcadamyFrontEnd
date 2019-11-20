import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import { compose } from 'recompose';
import * as ROLES from '../../constants/roles';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROUTES from "../../constants/routes";
import BlogManagement from "./BlogManagement";
import BlogEdit from "./BlogManagement/BlogEdit";
import TutorManagement from "./TutorManagement";
import TutorEdit from"./TutorManagement/TutorEdit";
import CourseManagement from "./CourseManagement";
import CourseEdit from "./CourseManagement/CourseEdit";
import RequestManagement from "./RequestManagement"
import ScheduleManagement from "./ScheduleManagement"
import AddSchedule from "./ScheduleManagement/AddSchedule"

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
        /*
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

         */
    }

    componentWillUnmount() {
        //this.unsubscribe();
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
                                <Link to={`${match.url}${ROUTES.MANAGE_TUTOR}`} />
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="read" />
                                <span>Courses</span>
                                <Link to={`${match.url}${ROUTES.MANAGE_COURSE}`} />
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
                            <Menu.Item key="5">
                                <Icon type="money-collect" />
                                <span>Request</span>
                                <Link to={`${match.url}${ROUTES.MANAGE_REQUEST}`} />
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Switch>
                                <Route exact path={`${match.url}${ROUTES.MANAGE_TUTOR}`} component={TutorManagement} />}
                                <Route exact path={`${match.url}${ROUTES.MANAGE_BLOG}`} component={BlogManagement} />}
                                <Route exact path={`${match.url}${ROUTES.BLOGEDIT}`} component={BlogEdit} />}
                                <Route exact path={`${match.url}${ROUTES.BLOGCREATE}`} component={BlogEdit} />}
                                <Route exact path={`${match.url}${ROUTES.MANAGE_REQUEST}`} component={RequestManagement} />}
                                <Route exact path={`${match.url}${ROUTES.SCHEDULE}`} component={ScheduleManagement} />}
                                <Route exact path={`${match.url}${ROUTES.ADD_SCHEDULE}`} component={AddSchedule} />}
                                <Route exact path={`${match.url}${ROUTES.TUTOREDIT}`} component={TutorEdit} />}
                                <Route exact path={`${match.url}${ROUTES.MANAGE_COURSE}`} component={CourseManagement} />}
                                <Route exact path={`${match.url}${ROUTES.COURSEEDIT}`} component={CourseEdit} />}
                                <Route exact path={`${match.url}${ROUTES.COURSECREATE}`} component={CourseEdit} />}
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
    //withEmailVerification,
    //withAuthorization(condition),
    //withFirebase
)(AdminPage);
