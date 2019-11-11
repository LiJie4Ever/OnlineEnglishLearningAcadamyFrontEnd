import React from 'react';
import './index.css';
import ClassItem from "./Class";
import { Col, Row, Divider } from 'antd';

class ClassList extends React.Component {
    render() {
        return (
            <div>
                <ClassItem />
            </div>
        );
    }
}

export default  ClassList;