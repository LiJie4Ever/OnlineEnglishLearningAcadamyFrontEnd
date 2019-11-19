import React, { Component } from 'react';
import { Tabs } from 'antd';
import NewSessionForm from "./NewSessionForm";
import UpcomingSessionTable from "./UpcomingSessionTable";
import * as URL from "../../constants/url"

const axios = require('axios');
const { TabPane } = Tabs;
const defaultQuery = '/meeting/getCode';

class InstructPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: '',
            errorMessage: ''
        }
    }

    componentDidMount() {

        axios.post(`${URL.ENDPOINT}${defaultQuery}`, {
            uid: this.props.data.uid,
        })
        .then(function (response) {
            console.log(response.data.redirect);
        })
        .catch(function (error) {
            console.log(error);
        });
        console.log(this.props.data.uid);
    }

    render() {
        return(
            <div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Upcoming Sessions" key="1">
                        <UpcomingSessionTable data={this.props.data}  />
                    </TabPane>
                    <TabPane tab="Create New Session" key="2">
                        <NewSessionForm data={this.props.data} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default InstructPage;
