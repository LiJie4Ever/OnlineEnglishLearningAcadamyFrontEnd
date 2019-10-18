import React from 'react';
import './index.css';
import ClassItem from "./Class";
import { Col, Row, Divider } from 'antd';

class ClassList extends React.Component {
    render() {
        return (
            <div className="list">
                <Row gutter={24}>
                    <Col span={8}>
                        <ClassItem />
                    </Col>
                    <Col span={8}>
                        <ClassItem />
                    </Col>
                    <Col span={8}>
                        <ClassItem />
                    </Col>
                </Row>
                <Divider />
                <Row gutter={24}>
                    <Col span={8}>
                        <ClassItem />
                    </Col>
                    <Col span={8}>
                        <ClassItem />
                    </Col>
                    <Col span={8}>
                        <ClassItem />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default  ClassList;