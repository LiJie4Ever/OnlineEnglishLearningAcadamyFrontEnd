import React, { Component } from 'react';
import {Icon, Menu} from "antd";
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut";
import * as ROLES from '../../constants/roles';

const { SubMenu } = Menu;

class MenuAuth extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Menu theme="dark" mode="horizontal" className='Nav_Menu'>
                <Menu.Item key="1">
                    <Icon type="home" />
                    <span>Home</span>
                    <Link to={ROUTES.LANDING} />
                </Menu.Item>
                <Menu.Item key="2">
                    <span>Courses</span>
                    <Link to={ROUTES.CLASS_LIST} />
                </Menu.Item>
                <Menu.Item key="10">
                    <span>Blog</span>
                    <Link to={ROUTES.BLOGLIST} />
                </Menu.Item>
                <Menu.Item key="3">
                    <span>FAQ</span>
                    <Link to={ROUTES.FAQ} />
                </Menu.Item>
                <Menu.Item key="4">
                    <span>Tutors</span>
                    <Link to={ROUTES.TUTOR} />
                </Menu.Item>
                {!!this.props.authUser.roles[ROLES.STUDENT] && (
                    <Menu.Item>
                        <Link to={ROUTES.COURSE_REQUEST}>TutoringRequest</Link>
                    </Menu.Item>
                )}
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <span>Account</span>
                        </span>
                    }
                >
                    <Menu.Item key="5">
                        <span>Profile</span>
                        <Link to={ROUTES.ACCOUNT} />
                    </Menu.Item>
                    {!!this.props.authUser.roles[ROLES.STUDENT] && (
                        <Menu.Item>
                            <Link to={ROUTES.STUDENT_TUTORING}>Take Course</Link>
                        </Menu.Item>)}
                    {!!this.props.authUser.roles[ROLES.STUDENT] && (
                        <Menu.Item>
                            <Link to={ROUTES.STUDENT_COURSES}>Purchased Courses</Link>
                        </Menu.Item>)}
                    {!!this.props.authUser.roles[ROLES.STUDENT] && (
                        <Menu.Item>
                            <Link to={ROUTES.STUDENT_REQUEST_HISTORY}>Request History</Link>
                        </Menu.Item>)}
                    {!!this.props.authUser.roles[ROLES.TUTOR] && (
                        <Menu.Item>
                            <Link to={ROUTES.TUTOR_TUTORING}>Instruct Course</Link>
                        </Menu.Item>
                    )}
                </SubMenu>
                {!!this.props.authUser.roles[ROLES.ADMIN] && (
                    <Menu.Item>
                        <Link to={ROUTES.ADMIN}>Admin</Link>
                    </Menu.Item>
                )}
                <Menu.Item key="8" className="Nav_Menu_Item">
                    <Icon type="logout" />
                    <SignOutButton />
                </Menu.Item>
                {!!this.props.authUser.roles[ROLES.STUDENT] && (
                    <Menu.Item key="9" className="Nav_Menu_Item">
                        <Icon type="shopping-cart" />
                        <span>Cart</span>
                        <Link to={ROUTES.CART} />
                    </Menu.Item>
                )}
            </Menu>
        )
    }
}

export default MenuAuth;
