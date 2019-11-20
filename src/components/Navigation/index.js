import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import Tutor from '../Tutor/index';
import TutorPage from "../Tutor/TutorPage";
import Cart from '../Cart/index';
import Admin from '../Admin/index';
import TakeCoursePage from "../TakeCourse";
import InstructPage from "../InstructCourse/index";

import MenuAuth from "./MenuAuth";
import MenuUnAuth from "./MenuUnAuth";
import PasswordForgetPage from "../PasswordForget";
import CourseRequestPage from "../CourseReqest";

import BlogList from "../BlogList";
import BlogPage from "../BlogList/BlogPage";

const { Content, Footer } = Layout;

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const CustomizedMenu = () => (
            <div>
                <AuthUserContext.Consumer>
                    {data =>
                        data.authUser ? <MenuAuth authUser={data.authUser}/> : <MenuUnAuth />
                    }
                </AuthUserContext.Consumer>
            </div>
        );

        return (
            <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <CustomizedMenu />
                    <Layout className='.navigation_layout'>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Switch>
                                <Route exact path={ROUTES.LANDING} component={Landing} />
                                <Route exact path={ROUTES.CLASS_LIST} component={ClassList} />
                                <Route exact path={ROUTES.FAQ} component={Faq} />
                                <Route exact path={ROUTES.LOG_IN} component={LogIn} />
                                <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
                                <Route exact path={ROUTES.CART} component={Cart} />
                                <Route exact path={ROUTES.PROFILE} component={Profile} />
                                <Route exact path={ROUTES.ACCOUNT} component={Account} />
                                <Route exact path={ROUTES.TUTOR} component={Tutor} />
                                <Route exact path={ROUTES.CART} component={Cart} />
                                <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                                <Route exact path={ROUTES.ADMIN} component={Admin} />
                                <Route exact path={ROUTES.STUDENT_TUTORING} component={TakeCoursePage} />
                                <Route exact path={ROUTES.TUTOR_TUTORING} component={InstructPage} />
                                <Route exact path={ROUTES.BLOGLIST} component={BlogList}/>
                                <Route exact path={ROUTES.BLOG} component={BlogPage} />
                                <Route exact path={ROUTES.COURSE_REQUEST} component={CourseRequestPage} />
                                <Route exact path={ROUTES.TUTORPAGE} component={TutorPage}/>
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