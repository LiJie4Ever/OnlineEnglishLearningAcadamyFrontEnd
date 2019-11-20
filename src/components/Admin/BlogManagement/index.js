import React, {Component} from 'react';
import {BackTop, Button, Card, Col, Pagination, Row, Modal} from 'antd';
import './index.css';
import app from "firebase";
import * as URL from "../../../constants/url";

const DELETEBLOG = "/blog/remove";
const axios = require('axios');
const numEachPage = 5;   // Use a constant here to keep track of number of cards per page
const { confirm } = Modal;

class BlogManagement extends Component {
    constructor(props) {
        super(props);
        this.createBlog = this.createBlog.bind(this);
        this.editBlog = this.editBlog.bind(this);
        this.deleteBlog = this.deleteBlog.bind(this);
        this.state = {
            dataList: [],
            // pagination
            minValue: 0,
            maxValue: 5
        }
    }

    componentDidMount() {
        let blogRef = app.firestore().collection('blog');
        let allBlogs = blogRef.get().then(snapshot => {
            let list = this.state.dataList;
            snapshot.forEach(doc => {
                let blogObject = {
                    id: doc.id,
                    author: doc.data().author,
                    title: doc.data().title,
                    content: doc.data().content
                };
                list.push(blogObject);
            });
            this.setState({dataList: list});
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }

    createBlog() {
        var item = null;
        this.props.history.push({pathname: '/admin/createBlog', state: {item}});
    }

    editBlog(item) {
        this.props.history.push({pathname: '/admin/editBlog/' + item.id, state: {item}});
    }

    deleteBlog(id, index) {
        confirm({
            title: 'Do you want to delete this blog?',
            content: 'When clicked the OK button, this blog will be deleted.',
            visible: true,
            onOk: () => {
                axios.post(`${URL.ENDPOINT}${DELETEBLOG}`, {
                    id: id
                })
                    .then(function (response) {
                        const list = this.state.dataList;
                        list.splice(index, 1);
                        this.setState({dataList: list});
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);// todo
                    });
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 200);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel: () => {},
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
            <div>
                <div className="blogManagement">
                    <Button className="createBTN" block={true} onClick={this.createBlog}>Create a New Blog</Button>
                    <Row>
                        {this.state.dataList &&
                        this.state.dataList.length > 0 &&
                        this.state.dataList.slice(this.state.minValue, this.state.maxValue).map((item, index) => {
                            return (
                                <Col span={24} key={index}>
                                    <Card className="blogCard" bloginfo={item} key={index} hoverable>
                                        <p className="blogTitle">{item.title}</p>
                                        <div className="blogAuthor">作者：{item.author}</div>
                                        <div className="actionBTN">
                                            <a className="editBTN" onClick={() => this.editBlog(item)}>Edit</a>
                                            <a className="deleteBTN"
                                               onClick={() => this.deleteBlog(item.id, index)}>Delete</a>
                                        </div>
                                    </Card>
                                </Col>
                            )
                        })
                        }
                    </Row>
                </div>
                <Pagination
                    defaultCurrent={1}
                    defaultPageSize={numEachPage} // default size of page
                    onChange={this.handleChange}
                    total={this.state.dataList.length} // total number of card data available
                />
                <BackTop/>
            </div>
        )
    }
}

export default BlogManagement;