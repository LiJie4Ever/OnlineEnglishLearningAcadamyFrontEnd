import React, {Component} from "react";
import { Card, BackTop } from 'antd';
import './index.css';

const moment = require('moment');

class BlogPage extends Component {
    constructor(props) {
        super(props);
        this.blogInfo = this.props.location.state.blogInfo;
    }

    render() {
        let blogTitle = this.blogInfo.title;
        let blogContent = this.blogInfo.content;
        let blogAuthor = this.blogInfo.author;
        let blogImg = this.blogInfo.picUrl;
        let utcdate = this.blogInfo.date.seconds;
        let blogDate = moment.unix(utcdate).format('MMM DD, YYYY');

        return (
            <div>
                <Card className="blogPageItem" title={blogTitle} extra={blogDate} cover={<img alt="blogPageImg" src={blogImg}/>}>
                    <p className="blogPageAuthor"> Author：{blogAuthor} </p>
                    <div className="blogPageContent" dangerouslySetInnerHTML={{__html: blogContent}}/>
                </Card>
                <BackTop/>
            </div>
        )
    }
}

export default BlogPage;
