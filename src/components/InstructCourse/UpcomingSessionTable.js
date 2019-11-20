import React, { Component } from "react";
import { Table } from 'antd';

const columns = [
    {
        title: 'Topic',
        dataIndex: 'topic',
        key: 'topic',
        render: text => <strong>{text}</strong>,
    },
    {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
    },
    {
        title: 'Start Time',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <span>
                <a href="#">Join Meeting</a>
            </span>
        ),
    },
];

const data = [
    {
        key: '1',
        topic: 'Learning English',
        duration: 1.5,
        time: '2019-11-01 21:51:49',
        status: 'finished',
    },
    {
        key: '2',
        topic: 'Writing English',
        duration: 2,
        time: '2019-11-02 21:52:07',
        status: 'finished',
    },
    {
        key: '3',
        topic: 'Listening English',
        duration: 2,
        time: '2019-11-12 21:52:30',
        status: 'started',
    },
    {
        key: '4',
        topic: 'speaking Chinese',
        duration: 2.5,
        time: '2019-11-12 21:52:30',
        status: 'waiting',
    },
];

class UpcomingSessionTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}

export default UpcomingSessionTable;