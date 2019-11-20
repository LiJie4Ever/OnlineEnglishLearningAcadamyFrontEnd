import React, {Component} from "react";
import { Card, BackTop } from 'antd';
import './index.css';
import {Link} from "react-router-dom";
import moment from "moment";

class BlogPage extends Component {
    constructor(props) {
        super(props);
        this.blogInfo = this.props.location.state.blogInfo;
    }

    render() {
        let blogTitle = this.blogInfo.title;
        let blogContent = this.blogInfo.content;
        let blogAuthor = this.blogInfo.author;
        let utcdate = this.blogInfo.date.seconds;
        let blogDate = moment.unix(utcdate).format('MM/DD/YYYY');

        return (
            <div>
                <Card className="blogItem" title={blogTitle} extra={blogDate}>
                    <p className="blogPageAuthor"> Author：{blogAuthor} </p>
                    <div className="blogPageContent" dangerouslySetInnerHTML={{__html: blogContent}}/>
                </Card>
                <BackTop/>
            </div>
        )
    }
}

export default BlogPage;