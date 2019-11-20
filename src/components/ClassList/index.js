import React from 'react';
import './index.css';
import Class from "./Class";
import { Col, Row, Divider } from 'antd';
import {compose} from "recompose";
import BlogItem from "../BlogList/BlogItem";
import { withRouter } from 'react-router-dom';

const ClassWrapper = compose(
    withRouter
)(Class);

class ClassList extends React.Component {
    render() {
        return (
            <div>
                <ClassWrapper />
            </div>
        );
    }
}

export default  ClassList;
