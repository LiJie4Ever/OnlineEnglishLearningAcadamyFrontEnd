import React, { Component} from 'react';
import {BackTop, Button, Card, Col, Pagination, Row} from 'antd';
import './index.css';
import app from "firebase";
import * as URL from "../../../constants/url";

const DELETEBLOG = "/blog/remove";
const axios = require('axios');

class BlogManagement extends Component {
    constructor(props) {
        super(props);
        this.createBlog = this.createBlog.bind(this);
        this.editBlog = this.editBlog.bind(this);
        this.deleteBlog = this.deleteBlog.bind(this);
        this.state = {
            dataList: []
        }
    }

    componentDidMount() {
        let blogRef = app.firestore().collection('blog');
        let allBlogs = blogRef.get().then(snapshot => {
            let list = this.state.dataList;
            snapshot.forEach(doc =>{
                let blogObject = {id:doc.id, author:doc.data().author, title:doc.data().title, content:doc.data().content};
                list.push(blogObject);
            });
            this.setState({ dataList : list });
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }

    createBlog() {
        this.props.history.push('/admin/createBlog');
    }

    editBlog(item) {
        this.props.history.push({pathname:'/admin/editBlog/' + item.id, state:{item}});
    }

    deleteBlog(id, index) {
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
    }

    render() {
        return(
            <div>
                <div className="blogManagement">
                    <Button className="createBTN" block={true} onClick={this.createBlog}>Create a New Blog</Button>
                    <Row>
                        {
                            this.state.dataList.map((item, index) => {
                                return (
                                    <Col span={24} key={index}>
                                        <Card className="blogCard" bloginfo={item} key={index} hoverable>
                                            <p className="blogTitle">{item.title}</p>
                                            <div className="blogAuthor">作者：{item.author}</div>
                                            <div className="actionBTN">
                                                <a className="editBTN" onClick={() => this.editBlog(item)}>Edit</a>
                                                <a className="deleteBTN" onClick={() => this.deleteBlog(item.id, index)}>Delete</a>
                                            </div>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
                <Pagination defaultCurrent={1} total={30}/>
                <BackTop />
            </div>
        )
    }
}

export default BlogManagement;