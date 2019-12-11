import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Tabs, List, Avatar, Icon, Button} from 'antd';
import {AuthUserContext} from "../Session";
import app from 'firebase/app';
import axios from 'axios';
import * as URL from "../../constants/url";

class Class extends React.Component {

    // authStatus: if user is logged in
    // uid: if logged in, will store user id
    // courseList: all the courses available
    constructor(props) {
        super(props);
        this.state = {
            authStatus: "",
            uid: "",
            courseList: []
        };
        this.showClass = this.showClass.bind(this);
    }

    // open detail page of a course
    // pass down authStatus and info of this class
    showClass = (index) => {
        let classInfo = this.state.courseList[index];
        let authStatus = this.state.authStatus;
        // console.log(this.props.history);
        this.props.history.push({pathname:'/class/' + classInfo.id, state:{classInfo, authStatus}});
    };

    // add class to cart, disable button and change button text
    addToCart = (index) => {
        this.state.courseList[index].state = "Added to Cart";
        this.state.courseList[index].bool = true;
        this.setState(this.state.courseList);

        axios.post(`${URL.ENDPOINT}${"/cart/course/add"}`, {
            studentID: this.state.uid,
            courseID: this.state.courseList[index].id
        })
            .then(res =>{

            })
            .catch(function (error) {
                console.log(error);
            });

    };

    // if is logged in
    // get all the courses
    // get bought courses of user
    // get courses in user's cart
    // if the course has a price of 0, mark it as free
    // get tutor's avatar and tutor name for this course
    // if course is free or is in cart or has been purchased, disable button (item.bool), change button text
    // 
    // if is not logged in
    // get all the courses, if the course has a price of 0, mark it as free
    // get tutor's avatar and tutor name for this course
    // disbale button, set button text

    componentDidMount() {
        if (this.state.authStatus == "exists"){
            if (this.state.uid !== ""){
                axios.get(`${URL.ENDPOINT}${"/course"}`,{
                })
                    .then(res => {
                        let courseArray = res.data;
                        // console.log(courseArray);

                        let boughtArray = [];
                        let cartArray = [];

                        let studentPromise = new Promise( (resolve) => {

                            let userRef = app.firestore().collection('students').doc(this.state.uid);
                            let getDoc = userRef.get()
                                .then(doc => {
                                    let cartPromise = new Promise((resolve) => {
                                        if (doc.exists) {
                                            let list1 = doc.data().courseArrayBought;
                                            let list2 = doc.data().courseArrayCart;

                                            for (let it1 in list1){
                                                boughtArray.push(list1[it1]);
                                            }

                                            for (let it2 in list2){
                                                cartArray.push(list2[it2]);
                                            }
                                        } else {
                                            console.log('No such document!');
                                        }
                                        resolve();
                                    });
                                    cartPromise.then( ()=> {
                                        res.boughtArray = boughtArray;
                                        res.cartArray = cartArray;
                                        resolve(res);
                                    });
                                })
                                .catch(err => {
                                    console.log('Error getting document', err);
                                });
                        });
                        studentPromise.then(res => {

                            let cartArray = res.cartArray;
                            let boughtArray = res.boughtArray;
                            
                            for (let i in courseArray){
                                let item  = courseArray[i][1];
                                item.id = courseArray[i][0];
                                item.free = false
                                if (item.price == 0){
                                    item.free = true
                                }
                                let tutorItem = app.firestore().collection('tutors').doc(item.tutor);
                                tutorItem.get().then(doc => {
                                    if (doc.exists) {
                                        item.avatar = doc.data().picUrl;
                                        item.tutorName = doc.data().userName;

                                        item.bool = false;
                                        item.state = "Add to Cart";
                                        if (item.free){
                                            item.bool = true
                                        }

                                        for (let j in cartArray){
                                            // console.log(cartArray[j]);
                                            if (cartArray[j] === item.id){
                                                item.bool = true;
                                                item.state = "Added to Cart";
                                                break;
                                            }
                                        }
                                        for (let k in boughtArray){
                                            // console.log(boughtArray[k]);
                                            if (boughtArray[k] === item.id){
                                                item.bool = true;
                                                item.state = "Purchased";
                                                break;
                                            }
                                        }
                                        this.state.courseList.push(item);
                                        this.setState(this.state.courseList);

                                    } else {
                                        console.log("No such document!");
                                    }}).catch(err => {
                                    console.log('Error getting documents', err);
                                });

                            }
                        });
                    });
            }
        }
        else{
            axios.get(`${URL.ENDPOINT}${"/course"}`,{
            })
                .then(res => {
                    let courseArray = res.data;
                    // console.log(courseArray);

                    for (let i in courseArray){
                        let item  = courseArray[i][1];
                        item.id = courseArray[i][0];
                        item.free = false
                        if (item.price == 0){
                            item.free = true
                        }
                        let tutorItem = app.firestore().collection('tutors').doc(item.tutor);
                        tutorItem.get().then(doc => {
                            if (doc.exists) {
                                item.avatar = doc.data().picUrl;
                                item.tutorName = doc.data().userName;

                                item.bool = true;
                                item.state = "Log In to Add to Cart";

                                this.state.courseList.push(item);
                                this.setState(this.state.courseList);

                            } else {
                                console.log("No such document!");
                            }}).catch(err => {
                            console.log('Error getting documents', err);
                        });
                    }
                });
        }
    }

    // display courses
    // if course is free, display "free" instead of price
    // item.bool decides if button should be disabled 
    render() {
        return (
            <div className='list'>
                <AuthUserContext.Consumer>
                    {data => (
                        <div style={{display:"none"}}>
                            {this.state.authStatus = (data.authUser) ? "exists" : ""}
                            {this.state.uid = (data.authUser) ? data.authUser.uid : ""}
                        </div>
                    )}
                </AuthUserContext.Consumer>

                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {},
                        pageSize: 5,
                    }}
                    dataSource={this.state.courseList}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <Button className='addButton'
                                        disabled={item.bool}
                                        onClick={() => this.addToCart(this.state.courseList.indexOf(item))}>
                                    {item.state}
                                </Button>
                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src={item.image}
                                />
                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a
                                    onClick={() => this.showClass(this.state.courseList.indexOf(item))}>
                                    {item.title}
                                </a>}
                                description={
                                    <div>
                                        <div className='tutor'>{item.tutorName}</div>
                                        <div className='price'>{(item.free) ? 'Free' : '$' + item.price + ' (US)'}</div>
                                    </div>
                                }
                            />
                            <div className={"itemContent"}>{item.content}</div>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default Class;
