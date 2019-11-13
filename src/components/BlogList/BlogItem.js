import React, {Component} from "react";
// import PropTypes from 'prop-types';
import { Card } from 'antd';
import './index.css';
import moment from 'moment'

class BlogItem extends Component {
    constructor(props) {
        super(props);
        this.showBlog = this.showBlog.bind(this);
    }

    showBlog() {
        let blogInfo = this.props.blogInfo;
        this.props.history.push({pathname:'/blog/' + blogInfo.id, state:{blogInfo}});
    }

    render() {
        let blogId = this.props.blogInfo.id;
        let blogTitle = this.props.blogInfo.title;
        let blogContent = this.props.blogInfo.content;
        let blogAuthor = this.props.blogInfo.author;
        let utcdate = this.props.blogInfo.date.seconds;
        let blogDate = moment.unix(utcdate).format('MM/DD/YYYY');


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