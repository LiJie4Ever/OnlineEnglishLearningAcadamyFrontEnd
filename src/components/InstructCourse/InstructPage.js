import React, { Component } from 'react';
import { Tabs } from 'antd';
import NewSessionForm from "./NewSessionTable";
import UpcomingSessionTable from "./UpcomingSessionTable";
import * as URL from "../../constants/url"
import {compose} from "recompose";
import { withRouter } from 'react-router-dom';
import {withFirebase} from "../Firebase";

const axios = require('axios');
const { TabPane } = Tabs;

const UpcomingSessionTableWrapper = compose(
    withRouter,
    withFirebase
)(UpcomingSessionTable);

class InstructPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: '',
            errorMessage: '',
            requestID: '',
            currentActiveKey: '1'
        };
        this.handleAddLink = this.handleAddLink.bind(this);
        this.hancleChange = this.hancleChange.bind(this);
    }

    componentDidMount() {
    }

    handleAddLink = childId => {
        this.setState({
            requestID: childId,
            currentActiveKey: '2'
        });
        console.log(childId);
    };

    hancleChange = () => {
        this.setState({
            currentActiveKey: '1'
        });
    };

    render() {
        return(
            <div>
                <Tabs defaultActiveKey="1" activeKey={this.state.currentActiveKey} onTabClick={this.hancleChange}>
                    <TabPane tab="Upcoming Sessions" key="1">
                        <UpcomingSessionTableWrapper data={this.props.data} handleAddLink={this.handleAddLink}/>
                    </TabPane>
                    <TabPane tab="Create New Session" key='2'>
                        <NewSessionForm data={this.props.data} requestID={this.state.requestID}/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default InstructPage;
