import React, { Component } from 'react';
import PurchasedItem from "./PurchasedItem";
import './index.css';
import { Row, Col } from 'antd';
import { BackTop } from 'antd';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import app from 'firebase/app';
import { Tabs, List, Avatar, Icon} from 'antd';
import PasswordChangePage from "../Account";
import {AuthUserContext} from "../Session";

const BlogItemWrapper = compose(
    withRouter,
    withFirebase,
)(PurchasedItem);

class BlogList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CourseList: [],
        }
    }

    componentDidMount() {
        let blogRef = app.firestore().collection('course');
        let allBlogs = blogRef.get().then(snapshot => {
            let list = this.state.CourseList;
            snapshot.forEach(doc =>{
                let blogObject = {id:doc.id, tutor:doc.data().tutor, content:doc.data().content, title:doc.data().title,price:doc.data().price};
                console.log(doc.data().date);
                list.push(blogObject);
            });
        }).catch(err => {
           console.log('Error getting documents', err);
        });
    }

    componentWillUnmount() {

    }

    render() {
        return(
            <div>
            <AuthUserContext.Consumer>
                {data => (
                    <div>
                        <h1><b> {data.authUser.userName}</b>
                            ,here are your purchased courses.</h1>

                    </div>
                )}
            </AuthUserContext.Consumer>
                <div style={{width:'80%',margin:'auto'}}>
                <Row>
                    {
                        this.state.CourseList.map((item, index) => {
                            return (
                                <Col span={24}>
                                    <BlogItemWrapper CourseInfo={item} />
                                </Col>
                            )
                        })
                    }
                </Row>
                </div>
                <BackTop />
            </div>
        )
    }
}

const BlogListWrapper = compose(
    withFirebase
)(BlogList);

export default BlogListWrapper;
