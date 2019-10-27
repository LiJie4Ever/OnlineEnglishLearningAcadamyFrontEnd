import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table, Icon, Divider } from 'antd';

const showHeader = true;
const pagination = { position: 'bottom' };

const moment = require('moment');

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'User Group',
        dataIndex: 'userGroup',
        key: 'userGroup',
    },
    {
        title: 'Zoom ID',
        dataIndex: 'zoomAccountId',
        key: 'zoomAccountId',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <Divider type="vertical" />
                <a>Delete</a>
                <Divider type="vertical" />
                <a>Modify</a>
      </span>
        ),
    },
];

const data = [];

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bordered: false,
            loading: false,
            pagination,
            size: 'default',
            title: undefined,
            showHeader,
            rowSelection: undefined,
            scroll: undefined,
            hasData: this.props.data.hasData,
            tableLayout: undefined,
            ellipsis: 'enable'
        };
    }
    //birthDay: "Wed Oct 09 2019 13:37:31 GMT-0700"
    // country: "USA"
    // email: "jli027@usc.edu"
    // gender: "male"
    // uid: "J5PswsdMpNbVVixmEU6RA9bMpZw1"
    // userGroup: "STUDENT"
    // userName: "lijie"
    // zoomAccountId: "1234556"

    componentDidMount() {
        console.log(this.props.data.users);
        this.props.data.users.map((item, index) => {
            data.push({
                key: index,
                name: item.userName,
                country: item.country,
                email: item.email,
                gender: item.gender,
                userGroup: item.roles,
                zoomAccountId: item.zoomAccountId
            })
        })
    }

    render() {
        const { state } = this;
        return(
            <div>
                <Table
                    {...this.state}
                    columns={columns.map(item => ({ ...item, ellipsis: state.ellipsis }))}
                    dataSource={state.hasData ? data : null}
                />
            </div>
        );
    }
}

export default UserList;