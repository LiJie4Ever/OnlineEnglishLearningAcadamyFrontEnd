import React, { Component } from 'react';
import BlogItem from "./BlogItem";
import './index.css';
import { Row, Col, Pagination, BackTop } from 'antd';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import app from 'firebase/app';

const BlogItemWrapper = compose(
    withRouter,
    withFirebase,
)(BlogItem);

const numEachPage = 6;   // Use a constant here to keep track of number of cards per page

class BlogList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogList: [],
            // pagination
            minValue: 0,
            maxValue: 6
        }
    }

    componentDidMount() {
        let blogRef = app.firestore().collection('blog').orderBy('date', 'desc');
        let allBlogs = blogRef.get().then(snapshot => {
            let list = this.state.blogList;
            snapshot.forEach(doc =>{
                let blogObject = {id:doc.id, author:doc.data().author, content:doc.data().content, date:doc.data().date, title:doc.data().title, picUrl:doc.data().picUrl};
                console.log(doc.data().date);
                list.push(blogObject);
            });
            this.setState({ blogList : list });
        }).catch(err => {
           console.log('Error getting documents', err);
        });
    }

    handleChange = value => {
        this.setState({
            minValue: (value - 1) * numEachPage,
            maxValue: value * numEachPage
        });
    };

    render() {
        return (
            <div className="blogList">
                <Row gutter={[8, 48]} type="flex" justify="start">
                    {this.state.blogList &&
                    this.state.blogList.length > 0 &&
                        this.state.blogList.slice(this.state.minValue, this.state.maxValue).map((item, index) => {
                            return (
                                <Col key={item.id} span={8}>
                                    <BlogItemWrapper blogInfo={item}/>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Pagination
                    defaultCurrent={1}
                    defaultPageSize={numEachPage} // default size of page
                    onChange={this.handleChange}
                    total={this.state.blogList.length} // total number of card data available
                />
                <BackTop/>
            </div>
        );
    }
}

const BlogListWrapper = compose(
    withFirebase
)(BlogList);

export default BlogListWrapper;