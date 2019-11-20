import React, {Component} from "react";
import {BackTop, Card, Icon} from 'antd';
import './index.css';
import "../../../node_modules/video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';


class TutorPage extends Component {
    constructor(props) {
        super(props);
        this.tutorInfo = this.props.location.state.tutorInfo;
    }

    render() {
        let tutorName = this.tutorInfo.userName;
        let tutorBio = this.tutorInfo.bio;
        let tutorImg = this.tutorInfo.picUrl;
        let tutorExp = this.tutorInfo.teachExp;
        let tutorVideo = this.tutorInfo.videoLink;

        return (
            <div className="tutorPage">
                <div className="tutorPageName">{tutorName}</div>
                <div className="tutorPageInfo">
                    <div className="tutorPageImg">
                        <img alt="tutorPageImg" src={tutorImg}/>
                    </div>
                    <div className="tutorPageExp">
                        <div className="tutorPageExpTitle"><br/><Icon type="calendar"/>&nbsp;&nbsp;Teaching Experience</div>
                        <div className="tutorPageExpContent">{tutorExp} years</div>
                    </div>
                    <div className="tutorPageBio">
                        <div className="tutorPageBioTitle"><br/><Icon type="profile"/>&nbsp;&nbsp;Self-Introduction</div>
                        <div className="tutorPageBioContent">{tutorBio}</div>
                    </div>
                </div>
                <div className="tutorPageVideo">
                    <Player
                        playsInline
                        poster="/assets/poster.png"
                        autoPlay={true}
                        src={tutorVideo}
                    >
                    </Player>
                </div>
            </div>
    )
    }
    }

    export default TutorPage;