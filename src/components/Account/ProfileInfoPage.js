import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Descriptions } from 'antd';
const moment = require('moment');
const dataFormat = 'YYYY-MM-DD';

// This is the page that show the information of the page
class ProfileInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            birthDay: "",
            gender: "",
            country: ""
        }
    }

    componentDidMount() {
        this.props.firebase.user(this.props.data.uid).get().then(snapshot => {
            this.setState({
                birthDay: moment(snapshot.data().birthDay).format(dataFormat),
                country: snapshot.data().country,
                gender: snapshot.data().gender,
                userName: snapshot.data().userName,
            })
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return(
            <Descriptions title="User Info">
                <Descriptions.Item label="UserName">{this.state.userName}</Descriptions.Item>
                <Descriptions.Item label="BirthDay">{this.state.birthDay}</Descriptions.Item>
                <Descriptions.Item label="Gender">{this.state.gender}</Descriptions.Item>
                <Descriptions.Item label="Country">{this.state.country}</Descriptions.Item>
            </Descriptions>
        )
    }
}


export default ProfileInfoPage;