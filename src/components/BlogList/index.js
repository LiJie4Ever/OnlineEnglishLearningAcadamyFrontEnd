import React, { Component } from 'react';
import BlogItem from "./BlogItem";
import './index.css';
import { Row, Col, List } from 'antd';
import { Pagination } from 'antd';
import { BackTop } from 'antd';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import app from 'firebase/app';

const BlogItemWrapper = compose(
    withRouter,
    withFirebase,
)(BlogItem);

class BlogList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogList: [],
        }
    }

    componentDidMount() {
        let blogRef = app.firestore().collection('blog');
        let allBlogs = blogRef.get().then(snapshot => {
            let list = this.state.blogList;
            snapshot.forEach(doc =>{
                let blogObject = {id:doc.id, author:doc.data().author, content:doc.data().content, date:doc.data().date, title:doc.data().title};
                console.log(doc.data().date);
                list.push(blogObject);
            });
            this.setState({ blogList : list });
            console.log(list);
        }).catch(err => {
           console.log('Error getting documents', err);
        });
    }

    componentWillUnmount() {

    }

    render() {
        return(
            <div className="blogList">
                <Row>
                    {
                        this.state.blogList.map((item, index) => {
                            return (
                                <Col span={24}>
                                    <BlogItemWrapper blogInfo={item} />
                                </Col>
                            )
                        })
                    }
                </Row>
                <Pagination defaultCurrent={1} total={50}/>
                <BackTop />
            </div>
        )
    }
}

const BlogListWrapper = compose(
    withFirebase
)(BlogList);

export default BlogListWrapper;
