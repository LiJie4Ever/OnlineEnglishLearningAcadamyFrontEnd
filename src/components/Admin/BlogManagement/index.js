import React, { Component} from 'react';
import {BackTop, Button, Card, Col, Pagination, Row} from 'antd';
import './index.css';

class BlogManagement extends Component {
    constructor(props) {
        super(props);
        this.createBlog = this.createBlog.bind(this);
        this.editBlog = this.editBlog.bind(this);
        this.state = {
            dataList: [
                {title:"Title #101", author:"author#101"},
                {title:"Title #102", author:"author#102"},
                {title:"Title #103", author:"author#103"},
                {title:"Title #104", author:"author#104"},
                {title:"Title #105", author:"author#105"}
            ]
        }
    }

    createBlog() {
        this.props.history.push('/admin/blogEdit');
    }

    editBlog() {
        this.props.history.push('/admin/blogEdit');
    }

    render() {
        return(
            <fragment>
                <div className="blogManagement">
                    <Button className="createBTN" block={true} onClick={this.createBlog}>Create a New Blog</Button>
                    <Row>
                        {
                            this.state.dataList.map((item, index) => {
                                return (
                                    <Col span={24}>
                                        <Card className="blogCard" blogInfo={item} hoverable>
                                            <p className="blogTitle">{item.title}</p>
                                            <div className="blogAuthor">作者：{item.author}</div>
                                            <div className="actionBTN">
                                                <a className="editBTN" onClick={this.editBlog}>Edit</a>
                                                <a className="deleteBTN">Delete</a>
                                            </div>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
                <Pagination defaultCurrent={1} total={50}/>
                <BackTop />
            </fragment>
        )
    }
}

export default BlogManagement;