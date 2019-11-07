import React, { Component } from 'react';
import BlogItem from "./BlogItem";
import './index.css';
import { Row, Col, List } from 'antd';
import { Pagination } from 'antd';
import { BackTop } from 'antd';
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { withRouter } from 'react-router-dom';
import BlogPage from "./BlogPage";

const BlogPageWrapper = compose(
    withRouter,
    withFirebase,
)(BlogItem);


class BlogList extends Component {
    render() {
        return(
            <div className="blogList">
                <Row>
                    <Col span={24}>
                        <BlogPageWrapper />
                    </Col>
                    <Col span={24}>
                        <BlogPageWrapper />
                    </Col>
                    <Col span={24}>
                        <BlogPageWrapper />
                    </Col>
                    <Col span={24}>
                        <BlogPageWrapper />
                    </Col>
                    <Col span={24}>
                        <BlogPageWrapper />
                    </Col>
                </Row>
                <Pagination defaultCurrent={1} total={50}/>
                <BackTop />
            </div>
        )
    }

}

export default BlogList;