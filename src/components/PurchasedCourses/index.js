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
        let list = [];
        let courselist = [];
        let listLength;
        let courseRef = app.firestore().collection('students').doc(this.userId);
        courseRef.get().then(doc => {
            console.log(doc.data());
            list.push(doc.data().courseArrayBought);
            list = list[0];
            listLength = list.length;
            console.log(list);
            console.log(listLength);
            for (var i = 0; i < listLength; i++) {
                let CourseItem = app.firestore().collection('course').doc(list[i]);
                CourseItem.get().then(doc => {
                    let testPromise = new Promise((resolve, reject) => {
                        // query tutor's name by tutorID (for display)
                        let tutorName = "tutorName";
                        let tutorPic = "";
                        let tutorItem = app.firestore().collection('tutors').doc(doc.data().tutor);
                        tutorItem.get().then(function (doc) {
                            if (doc.exists) {
                                tutorName = doc.data().userName;
                                tutorPic = doc.data().picUrl;
                                resolve([tutorName, tutorPic]);
                            } else {
                                console.log("No such document!");
                            }
                        }).catch(err => {
                            console.log('Error getting documents', err);
                        });
                    });
                    testPromise.then((result => {
                        let courseObject = {
                            id: doc.id,
                            title: doc.data().title,
                            tutor: doc.data().tutor,
                            tutorName: result[0],
                            content: doc.data().content,
                            image: doc.data().image,
                            price: doc.data().price,
                            url: doc.data().url,
                            tutorPic: result[1]
                        };
                        courselist.push(courseObject);
                        this.setState({dataList: courselist});
                    }));
                });
            }
            ;
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
