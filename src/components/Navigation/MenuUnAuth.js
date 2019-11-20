import React, { Component } from 'react';
import {Icon, Menu} from "antd";
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";

class MenuUnAuth extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Menu theme="dark" mode="horizontal" className='Nav_Menu'>
                <Menu.Item key="1" className='menuUnAuth_menuItem'>
                    <Icon type="home" />
                    <span>Home</span>
                    <Link to={ROUTES.LANDING} />
                </Menu.Item>
                <Menu.Item key="2" className='menuUnAuth_menuItem'>
                    <span>Classes</span>
                    <Link to={ROUTES.CLASS_LIST} />
                </Menu.Item>
                <Menu.Item key="9" className='menuUnAuth_menuItem'>
                    <span>Blog</span>
                    <Link to={ROUTES.BLOGLIST} />
                </Menu.Item>
                <Menu.Item key="3" className='menuUnAuth_menuItem'>
                    <span>FAQ</span>
                    <Link to={ROUTES.FAQ} />
                </Menu.Item>
                <Menu.Item key="7" className='menuUnAuth_menuItem'>
                    <span>Tutors</span>
                    <Link to={ROUTES.TUTOR} />
                </Menu.Item>
                <Menu.Item key="4" className="Nav_Menu_Item menuUnAuth_menuItem">
                    <Icon type="login" />
                    <span>Log In</span>
                    <Link to={ROUTES.LOG_IN} />
                </Menu.Item>
            </Menu>
        )
    }
}

export default MenuUnAuth;
