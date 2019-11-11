import React, { Component } from 'react';
import {Icon, Menu} from "antd";
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut";

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
                    <Icon type="video-camera" />
                    <span>Classes</span>
                    <Link to={ROUTES.CLASS_LIST} />
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="question" />
                    <span>FAQ</span>
                    <Link to={ROUTES.FAQ} />
                </Menu.Item>
                <Menu.Item key="7">
                    <Icon type="team" />
                    <span>Tutors</span>
                    <Link to={ROUTES.TUTOR} />
                </Menu.Item>
                <Menu.Item key="4">
                    <Icon type="profile" />
                    <span>Account</span>
                    <Link to={ROUTES.ACCOUNT} />
                </Menu.Item>
                <Menu.Item key="5" className="Nav_Menu_Item">
                    <Icon type="logout" />
                    <SignOutButton />
                </Menu.Item>
                <Menu.Item key="8" className="Nav_Menu_Item">
                    <Icon type="shopping-cart" />
                    <span>Cart</span>
                    <Link to={ROUTES.CART} />
                </Menu.Item>
                <Menu.Item key="9">
                    <Icon type="file-text" />
                    <span>Blog</span>
                    <Link to={ROUTES.BLOGLIST} />
                </Menu.Item>
            </Menu>
        )
    }
}

export default MenuAuth;
