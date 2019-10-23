import React, {Component} from "react";
// import PropTypes from 'prop-types';
import { Card } from 'antd';
import './index.css';
import {Link} from "react-router-dom";

class BlogItem extends Component {
    constructor(props) {
        super(props);
        //this.showBlog = this.showBlog().bind(this);
    }

    render() {
        var blogTitle = "党的十九大明确宣告：经过长期努力，中国特色社会主义进入了新时代。";
        var blogContent = "回溯千年，星云浩瀚。如今这金秋玉树银花，锦绣山河画卷，是烽烟四起时先辈抛洒热血，胼手胝足换来的，华夏儿女生与斯长于斯，光荣与梦想，皆与祖国紧紧相连，不可分割。世事变迁，青山不老，赤心不变。" +
            "回溯千年，星云浩瀚。如今这金秋玉树银花，锦绣山河画卷，是烽烟四起时先辈抛洒热血，胼手胝足换来的，华夏儿女生与斯长于斯，光荣与梦想，皆与祖国紧紧相连，不可分割。世事变迁，青山不老，赤心不变。" +
            "回溯千年，星云浩瀚。如今这金秋玉树银花，锦绣山河画卷，是烽烟四起时先辈抛洒热血，胼手胝足换来的，华夏儿女生与斯长于斯，光荣与梦想，皆与祖国紧紧相连，不可分割。世事变迁，青山不老，赤心不变。" +
            "回溯千年，星云浩瀚。如今这金秋玉树银花，锦绣山河画卷，是烽烟四起时先辈抛洒热血，胼手胝足换来的，华夏儿女生与斯长于斯，光荣与梦想，皆与祖国紧紧相连，不可分割。世事变迁，青山不老，赤心不变。";
        var blogAuthor = "反正8是我";
        var time = "10/01/2019";

        return(
            <div>
                <Card className="blogItem" title={blogTitle} extra={time} hoverable onClick={this.showBlog}>
                    <p className="blogContent"> {blogContent} </p>
                    <p className="blogAuthor"> 作者：{blogAuthor} </p>
                    <Link to={`/blog/${this.props.blogId}`}/>
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

    showBlog() {
        console.log("hello");
    }
}

export default BlogItem;