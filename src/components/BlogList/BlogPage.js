import React, {Component} from "react";
import { Card, BackTop } from 'antd';
import './index.css';

class BlogPage extends Component {
    constructor(props) {
        super(props);
        this.blogInfo = this.props.location.state.blogInfo;
    }

    render() {
        let blogTitle = this.blogInfo.title;
        let blogContent = this.blogInfo.content;
        let blogAuthor = this.blogInfo.tutor;

        return (
            <div>
                <Card className="blogItem" title={blogTitle}>
                    <p className="blogPageAuthor"> 作者：{blogAuthor} </p>
                    <p className="blogPageContent"> {blogContent} </p>
                </Card>
                <BackTop/>
            </div>
        )
    }
}

export default BlogPage;
