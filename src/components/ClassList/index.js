import React from 'react';
import './index.css';
import Class from "./Class";
import { Col, Row, Divider } from 'antd';
import {compose} from "recompose";
import BlogItem from "../BlogList/BlogItem";
import { withRouter } from 'react-router-dom';
import {AuthUserContext} from "../Session";
import MenuAuth from "../Navigation/MenuAuth";
import MenuUnAuth from "../Navigation/MenuUnAuth";

const ClassWrapper = compose(
    withRouter
)(Class);

class ClassList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authStatus: ""
        }
    }

    render() {
        return (
            <div>
                <div>
                    {/*<AuthUserContext.Consumer>*/}
                    {/*    {data => (*/}
                    {/*        <div style={{display:"none"}}>*/}
                    {/*            {this.state.authStatus = (data.authUser.hasOwnProperty("uid") == true) ? "exists" : false}*/}
                    {/*            /!*{console.log(this.state.authStatus)}*!/*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</AuthUserContext.Consumer>*/}
                </div>
                {/*<ClassWrapper authStatus={this.state.authStatus}/>*/}
                <ClassWrapper/>
            </div>
        );
    }
}

export default  ClassList;
