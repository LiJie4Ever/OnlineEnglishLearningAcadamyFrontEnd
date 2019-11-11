import React, {Component} from "react";
import { Card, BackTop } from 'antd';
import './index.css';
import {Link} from "react-router-dom";

class BlogPage extends Component {
    constructor(props) {
        super(props);
        this.blogInfo = this.props.location.state.blogInfo;
    }

    render() {
        var blogTitle = this.blogInfo.title;
        var blogContent = this.blogInfo.content;
        var blogAuthor = this.blogInfo.author;
        var blogDate = this.blogInfo.date;

        return (
            <div>
                <Card className="blogItem" title={blogTitle} extra={blogDate}>
                    <p className="blogPageAuthor"> 作者：{blogAuthor} </p>
                    <p className="blogPageContent"> {blogContent} </p>
                </Card>
                <BackTop/>
            </div>
        )
    }
}

export default BlogPage;