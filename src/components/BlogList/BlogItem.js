import React, {Component} from "react";
// import PropTypes from 'prop-types';
import { Card } from 'antd';
import './index.css';

class BlogItem extends Component {
    constructor(props) {
        super(props);
        this.showBlog = this.showBlog.bind(this);
    }

    showBlog() {
        var blogInfo = this.props.blogInfo;
        this.props.history.push({pathname:'/blog/' + blogInfo.id, state:{blogInfo}});
    }

    render() {
        var blogId = this.props.blogInfo.id;
        var blogTitle = this.props.blogInfo.title;
        var blogContent = this.props.blogInfo.content;
        var blogAuthor = this.props.blogInfo.author;
        var blogDate = this.props.blogInfo.date;

        return(
            <div>
                <Card className="blogItem" title={blogTitle} extra={blogDate} hoverable onClick={this.showBlog}>
                    <p className="blogContent"> {blogContent} </p>
                    <p className="blogAuthor"> 作者：{blogAuthor} </p>
                </Card>
            </div>
        )
    }

    // BlogItem.defaultProps = {
    //     blogId: 'blogId',
    //     blogTitle: 'blogTitle',
    //     blogAuthor: 'blogAuthor',
    //     blogContent: 'blogContent',
    //     time: 'time'
    // };

    // BlogItem.propTypes = {
    //     blogId: propTypes.number,
    //     blogTitle: propTypes.string,
    //     blogAuthor: propTypes.string,
    //     blogContent: propTypes.string,
    //     time: propTypes.string
    // };

}

export default BlogItem;