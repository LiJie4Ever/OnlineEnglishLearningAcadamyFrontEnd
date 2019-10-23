import React, { Component } from 'react';
import BlogItem from "./BlogItem";
import './index.css';
import { Row, Col, List } from 'antd';
import { Pagination } from 'antd';
import { BackTop } from 'antd';

class BlogList extends Component {
    render() {
        return(
            <div className="blogList">
                <Row>
                    <Col span={24}>
                        <BlogItem />
                    </Col>
                    <Col span={24}>
                        <BlogItem />
                    </Col>
                    <Col span={24}>
                        <BlogItem />
                    </Col>
                    <Col span={24}>
                        <BlogItem />
                    </Col>
                    <Col span={24}>
                        <BlogItem />
                    </Col>
                </Row>
                <Pagination defaultCurrent={1} total={50}/>
                <BackTop />
            </div>
        )
    }

}

export default BlogList;