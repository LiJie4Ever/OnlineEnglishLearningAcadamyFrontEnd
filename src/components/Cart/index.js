import React from "react";
import "./index.css"
import 'antd/dist/antd.css';
import { List, Avatar, Skeleton, Button } from 'antd';
import * as URL from "../../constants/url";
import {AuthUserContext} from "../Session";
import axios from 'axios';
import app from 'firebase/app'



const temp = {
    "content": [
    [
        {
            "timezone": "Beijing +8:00",
            "status": "unpaid",
            "numOfS": "1",
            "student": "Hao",
            "availableTime": "2-4PM, 6-9PM - Wed",
            "price": "19.99"
        }
    ],
    [
        {
            "lessonArray": [
                "BB8tuSbC51FVLgA6VTjk"
            ],
            "url": "http://usc.edu",
            "tutor": "VmytE8ZVT6VlGdMXqn6J",
            "image": "https://adlc.uad.ac.id/wp-content/uploads/TOEFL-Exam-Prep-1.jpg",
            "content": "This course prepares students for the TOEFL exam by presenting and practicing strategies to help improve the student’s listening skills. In addition, students are given practice in critical thinking and note-taking skills.",
            "price": 49.99,
            "title": "TOEFL No Brainer - Listening"
        }
    ],
    [
        {
            "url": "http://usc.edu",
            "tutor": "VmytE8ZVT6VlGdMXqn6J",
            "image": "https://i.ytimg.com/vi/8SPTbmew5JY/maxresdefault.jpg",
            "content": "This course prepares students for the TOEFL exam by presenting and practicing strategies to help improve the student’s listening skills. In addition, students are given practice in critical thinking and note-taking skills.",
            "price": 49.99,
            "title": "IELTS - Writing",
            "lessonArray": [
                "sVEE94QWgKzwiDTR30DF"
            ]
        }
    ]
]
}

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
        this.setState(this.state.courseList.splice(index, 1));

        // TODO: Call API
    };

    removeSession = (index) => {
        this.setState(this.state.sessionList.splice(index, 1));

        // TODO: Call API
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

    componentDidMount() {
        if (this.state.uid !== ""){
            // console.log("aaa: " + this.state.uid);

            // axios.post(`${URL.ENDPOINT}${"/cart"}`,{
            //     studentID: this.state.uid
            // })
            //     .then(res => {
            //         let json = res.data;
            //         console.log(json);
            //
            //         // TODO: Check JSON File
            //
            //
            //     });

            let cartArray = temp.content;

            for (let i in cartArray){
                let item  = cartArray[i][0];
                if (item.hasOwnProperty("timezone")){
                    this.state.sessionList.push(item);
                }
                else{
                    let courseItem = app.firestore().collection('tutors').doc(item.tutor);
                    courseItem.get().then(function(doc) {
                        if (doc.exists) {
                            item.avatar = doc.data().picUrl;
                            item.tutorName = doc.data().userName;
                        } else {
                            console.log("No such document!");
                        }}).catch(err => {
                        console.log('Error getting documents', err);
                    });
                    this.state.courseList.push(item);
                }
            }






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
                                        title={<a href="/">{item.title}</a>}
                                        description={item.tutorName}
                                    />
                                    <div>US$ {item.price}</div>
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
                                        description={item.availableTime + " · " + item.numOfS + " session"}
                                    />
                                    <div>US$ {item.price}</div>
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
                    <Button className='button'>Check Out</Button>
                </div>

                <div className="clear"></div>
            </div>
        );
    }
}

export default Cart;
