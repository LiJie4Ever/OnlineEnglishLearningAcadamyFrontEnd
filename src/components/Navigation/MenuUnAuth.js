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
                    <span>Tutors</span>
                    <Icon type="team" />
                    <Link to="/tutor" />
                </Menu.Item>
                <Menu.Item key="4" className="Nav_Menu_Item">
                    <Icon type="login" />
                    <span>Log In</span>
                    <Link to={ROUTES.LOG_IN} />
                </Menu.Item>
                <Menu.Item key="8" className="Nav_Menu_Item">
                    <Icon type="shopping-cart" />
                    <span>Cart</span>
                    <Link to="/cart" />
                </Menu.Item>
            </Menu>
        )
    }
}

export default MenuUnAuth;