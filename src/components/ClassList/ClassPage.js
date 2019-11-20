import React, {Component} from "react";
import {Card, BackTop, Avatar, Button, List} from 'antd';
import './index.css';
import "../../../node_modules/video-react/dist/video-react.css";
import axios from "axios";
import * as URL from "../../constants/url";
import { Player } from 'video-react';
import {AuthUserContext} from "../Session";

class ClassPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: "none",
            uid: "",
            classInfo: this.props.location.state.classInfo,
            authStatus: this.props.location.state.authStatus,
            sourceList: [],
            vid: {}
        }
    }

    addToCart = (index) => {
        this.state.classInfo.state = "Already in Cart";
        this.state.classInfo.bool = true;
        this.setState({classInfo: this.state.classInfo});

        axios.post(`${URL.ENDPOINT}${"/cart/course/add"}`, {
            studentID: this.state.uid,
            courseID: this.state.classInfo.id
        })
            .then(res =>{

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    changeSource = (index) =>{
        for (let i in this.state.sourceList){
            if (i == index){
                this.state.sourceList[i].color = "whitesmoke";
            }
            else{
                this.state.sourceList[i].color = "transparent";
            }
        }
        this.setState({vid: this.state.sourceList[index]});
    };

    componentDidMount() {
        if (this.state.authStatus == "exists"){
            if (this.state.classInfo.state == "Already Bought"){
                let sourceList = [];
                for (let i in this.state.classInfo.lessonArray) {
                    let lessonPromise = new Promise((resolve => {
                        axios.post(`${URL.ENDPOINT}${"/lesson/get"}`, {
                            lessonID: this.state.classInfo.lessonArray[i]
                        })
                            .then(res => {
                                let item = res.data;
                                item.index = i;
                                sourceList.push(item);
                                if (i == 0){
                                    this.state.vid = item;
                                    item.color = "whitesmoke";
                                }
                                resolve();
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                    }));
                    lessonPromise.then(() => {
                        this.setState({sourceList: sourceList});
                    });
                }
                this.state.show = "block";
            }
        }
    }

    render() {
        let classInfo = this.state.classInfo;
        this.state.sourceList.sort((a,b) =>
            (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0)
        );
        let vid = this.state.vid;
        // console.log(classInfo);
        // console.log(this.state.sourceList);
        // console.log(this.state.vid);
        return (
            <div className={"detailClassContainer"}>
                <AuthUserContext.Consumer>
                    {temp => (
                        <div style={{display:"none"}}>
                            {this.state.uid = this.state.authStatus ? temp.authUser.uid : null}
                        </div>
                    )}
                </AuthUserContext.Consumer>
                <div>
                    <div className={"detailClassLeft"}>
                        <h1 className={"detailClassTitle"}>{classInfo.title}</h1>
                        <div className={"detailClassSubtitle"}>
                            <Avatar className={"detailClassAvatar"} src={classInfo.avatar} size={35} />
                            <div className={"detailClassTutor"}>{classInfo.tutorName}</div>
                            <div className="clear"></div>
                        </div>
                        <div className={"detailClassContent"}>{classInfo.content} </div>
                    </div>

                    <div className={"detailClassRight"}>
                        <div className={"detailClassBox"}>
                            <div className={"detailClassImageContainer"} >
                                <img className={"detailClassImage"} src={classInfo.image} />
                            </div>
                            <div className={"detailClassPrice"}>US$ {classInfo.price}</div>
                            <div className={"detailClassButtonContainer"}>
                                <Button
                                    className={"detailClassButton"}
                                    disabled={classInfo.bool}
                                    onClick={() => this.addToCart()}>
                                    {classInfo.state}
                                </Button>
                            </div>
                        </div>


                    </div>
                    <div className="clear"></div>
                </div>


                <div style={{"display": this.state.show}}>
                    <h2 className={"detailClassLessonTitle"}>{vid.lessonTitle}</h2>
                    <div className={"detailClassLessonIntro"}>{vid.lessonIntro}</div>

                    <div className={"detailClassLeft"}>
                        <Player
                            className={"detailClassVideo"}
                            playsInline
                            poster="/assets/poster.png"
                            src={vid.videoURL}
                        />
                    </div>

                    <div className={"detailClassRight"}>
                        <List
                            className={"detailClassList"}
                            bordered
                            dataSource={this.state.sourceList}
                            renderItem={item => (
                                <List.Item>
                                    <div className={"detailClassListItemWrapper"}
                                         style={{"backgroundColor": item.color}}
                                         onClick={() => this.changeSource(this.state.sourceList.indexOf(item))}>
                                        <div className={"detailClassListItem"}>
                                            {item.lessonTitle}
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default ClassPage;
