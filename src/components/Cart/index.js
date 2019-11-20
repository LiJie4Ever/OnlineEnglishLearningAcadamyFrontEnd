import React from "react";
import "./index.css"
import 'antd/dist/antd.css';
import { List, Avatar, Skeleton, Button, notification } from 'antd';
import * as URL from "../../constants/url";
import {AuthUserContext} from "../Session";
import axios from 'axios';
import app from 'firebase/app'

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: "",
            courseList: [],
            sessionList:[]
        }
    }

    removeCourse = (index) => {
        // TODO: Call API
        // console.log("index" + index);
        // console.log(this.state.courseList[index]);
        // console.log(this.state.courseList[index].id);
        axios.post(`${URL.ENDPOINT}${"/cart/course/delete"}`, {
            studentID: this.state.uid,
            courseID: this.state.courseList[index].id
        })
            .then(res =>{
                // console.log("removed");
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState(this.state.courseList.splice(index, 1));

    };

    removeSession = (index) => {
        // TODO: Call API
        axios.post(`${URL.ENDPOINT}${"/cart/tutor/delete"}`, {
            studentID: this.state.uid,
            requestID: this.state.sessionList[index].id
        })
            .then(res =>{

            })
            .catch(function (error) {
                console.log(error);
            });

        axios.post(`${URL.ENDPOINT}${"/request/cancel"}`, {
            id: this.state.sessionList[index].id
        })
            .then(res =>{

            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState(this.state.sessionList.splice(index, 1));
    };

    getSummary = () => {
        let sum = {
            cost: 0,
            tax: 0,
            total: 0,
        }

        let myList = this.state.courseList.concat(this.state.sessionList);

        for (let i = 0; i < myList.length; i++){
            sum.cost += Number(myList[i].price);
        }
        sum.cost = sum.cost.toFixed(2);
        sum.tax = (sum.cost * 0.15).toFixed(2);
        sum.total = (parseFloat(sum.cost) + parseFloat(sum.tax)).toFixed(2);

        return sum;
    };

    checkOut = () => {
        // axios.post(`${URL.ENDPOINT}${"/pay"}`, {
        //     studentID: this.state.uid
        // })
        //     .then(res =>{
        //
        //
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });



        for (let i in this.state.sessionList){
            axios.post(`${URL.ENDPOINT}${"/request/setStatus"}`, {
                id: this.state.sessionList[i].id,
            })
                .then(res =>{
                    notification.open({
                        message:"Checkout successfully"
                    });
                })
                .catch(function (error) {
                    notification.open({
                        message:"Checkout Failed"
                    });
                    console.log(error);
                });
        }

        axios.post(`${URL.ENDPOINT}${"/cart/update_bought"}`, {
            studentID: this.state.uid
        })
            .then(res =>{
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({courseList: [], sessionList: []});
    }

    componentDidMount() {
        if (this.state.uid !== ""){
            // console.log("aaa: " + this.state.uid);

            axios.post(`${URL.ENDPOINT}${"/cart"}`, {
                studentID: this.state.uid
            })
                .then(res =>{
                    let cartArray = res.data.content;
                    for (let i in cartArray){
                        let item  = cartArray[i];
                        if (item.hasOwnProperty("offset")){
                            // console.log(item);
                            if (item.status == 1){
                                this.state.sessionList.push(item);
                                this.setState({sessionList: this.state.sessionList});
                            }
                        }
                        else{
                            let tutorPromise = new Promise((resolve => {
                            let tutorItem = app.firestore().collection('tutors').doc(item.tutor);
                                tutorItem.get().then(function(doc) {
                                    if (doc.exists) {
                                        console.log("get tutor");
                                        item.avatar = doc.data().picUrl;
                                        item.tutorName = doc.data().userName;
                                    }
                                    else {
                                        console.log("No such document!");
                                    }
                                    resolve();
                                }).catch(err => {
                                    console.log('Error getting documents', err);
                                });
                            }));
                            tutorPromise.then(()=>{
                                this.state.courseList.push(item);
                                this.setState({courseList: this.state.courseList});
                            });
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <div>
                <AuthUserContext.Consumer>
                    {temp => (
                        <div style={{display:"none"}}>
                            {this.state.uid = temp.authUser.uid}
                        </div>
                    )}
                </AuthUserContext.Consumer>

                <div className="left">
                    <h1>Items</h1>
                    <h2>Courses</h2>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.courseList}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Button onClick={() => this.removeCourse(this.state.courseList.indexOf(item))}>remove</Button>
                                ]}
                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar className='img' src={item.avatar} />
                                        }
                                        title={item.title}
                                        description={item.tutorName}
                                    />
                                    <div className={"cartPrice"}>US$ {item.price}</div>
                                </Skeleton>
                            </List.Item>
                        )}
                    />

                    <h2>1:1 Tutoring</h2>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.sessionList}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Button onClick={() => this.removeSession(this.state.sessionList.indexOf(item))}>remove</Button>
                                ]}
                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar className='img' icon="user" size={50} />
                                        }
                                        title={"Live Tutoring"}
                                        description={item.createTime + " · " + item.numOfS + " session"}
                                    />
                                    <div className={"cartPrice"}>US$ {item.price}</div>
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </div>

                <div className="right">
                    <h1>Summary</h1>
                    <div className='box'>
                        <div className='summary-left'>Cost</div>
                        <div className='summary-right'>{this.getSummary().cost}</div>
                        <div className="clear"></div>

                        <div className='summary-left'>Tax</div>
                        <div className='summary-right'>{this.getSummary().tax}</div>
                        <div className="clear"></div>

                        <hr/>

                        <div className='summary-left'>Total</div>
                        <div className='summary-right'>{this.getSummary().total }</div>
                        <div className="clear"></div>
                    </div>
                    <Button className='button' onClick={this.checkOut}>Check Out</Button>
                </div>

                <div className="clear"></div>
            </div>
        );
    }
}

export default Cart;
