import React, { Component } from 'react';
import PurchasedItem from "./PurchasedItem";
import './index.css';
import {Row, Col, Avatar} from 'antd';
import { BackTop } from 'antd';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import app from 'firebase/app';
import {AuthUserContext} from "../Session";
import List from "antd/lib/list";


const BlogItemWrapper = compose(
    withFirebase,
)(PurchasedItem);


class CourseList extends Component {

    constructor(props) {
        super(props);
        this.userId = '';
        this.state = {
            dataList: [],
        }
    }

    componentDidMount() {
        let list = [];
        let courselist = [];
        let listLength;
        let courseRef = app.firestore().collection('students').doc(this.userId);
        courseRef.get().then(doc =>{
            console.log(doc.data());
            list.push(doc.data().courseArray);
            list = list[0];
            listLength = list.length;
            console.log(list);
            console.log(listLength);
            for(var i =0;i<listLength;i++){
                let CourseItem = app.firestore().collection('course').doc(list[i]);
                CourseItem.get().then(doc =>{
                    console.log(doc.data());
                    let courseObject = {id:doc.id, title:doc.data().title, tutor:doc.data().tutor, content:doc.data().content,
                        image:doc.data().image, price:doc.data().price};
                    courselist.push(courseObject);
                    this.setState({ dataList : courselist });
                    console.log(this.state.dataList);
                });
            }
        }).catch(err => {
            console.log('Error getting documents', err);
        });
}
    render() {
        return(
            <div>
                <AuthUserContext.Consumer>
                {data => (
                    <div>
                        <h1>Account: {this.userId = data.authUser.uid}  ,here are your purchased courses.</h1>
                    </div>
                )}
            </AuthUserContext.Consumer>
           <div className='list'>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={this.state.dataList}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src={item.image}
                                />
                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.tutorPic} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={
                                    <div>
                                        <div className='price'>US$ {item.price}</div>
                                        <div className='name'>{item.tutorName}</div>
                                    </div>
                                }
                            />
                            <div className={'content'}>{item.content}</div>
                        </List.Item>
                    )}
                />
            </div>
                </div>
        )
    }
}

const BlogListWrapper = compose(
    withFirebase
)(CourseList);

export default BlogListWrapper;
