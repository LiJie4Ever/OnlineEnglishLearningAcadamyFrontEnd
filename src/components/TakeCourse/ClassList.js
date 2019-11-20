import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import * as URL from '../../constants/url';

const moment_tz = require('moment-timezone');
const moment = require('moment');
const defaultQuery = "/schedule/history";
const axios = require('axios');

class ClassList extends React.Component {
    state = {
        searchText: '',
        data: []
    };

    componentDidMount() {
        let list = this.state.data;
        axios.post(`${URL.ENDPOINT}${defaultQuery}`, {
            id: this.props.data.uid
        }).then(response => {
            response.data.forEach((item, index) => {
                let testPromise = new Promise( ( resolve, reject ) => {
                    // query tutor's name by tutorID (for display)
                    let tutorName = "";
                    let tutorItem = this.props.firebase.tutor(item[1].tutor);
                    tutorItem.get().then(function (doc) {
                        if (doc.exists) {
                            tutorName = doc.data().userName;
                            resolve(tutorName);
                        } else {
                            console.log("No such document!");
                        }
                    }).catch(err => {
                        console.log('Error getting documents', err);
                    });
                } );
                testPromise.then(result => {
                    let offset = moment_tz().tz(moment_tz.tz.guess(true)).format('Z');
                    let operation = offset.split(":")[0][0];
                    let loacalTime = "";
                    if (operation === '+') {
                        loacalTime = moment(item[1].meetingStartTime).add(parseInt(offset.split(":")[0].substring(1)), 'hours').format("LLL")
                    } else {
                        loacalTime = moment(item[1].meetingStartTime).subtract(parseInt(offset.split(":")[0].substring(1)), 'hours').format("LLL")
                    }
                    let history = { key: index, startTime: loacalTime, tutor: result, topic: item[1].topic, duration: item[1].duration, link: item[1].link};
                    list.push(history);
                    this.setState({ data : list });
                    console.log(history);
                });
            });
        }).catch(err => {
            console.log(err);
        })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        const columns = [
            {
                title: 'startTime(local)',
                dataIndex: 'startTime',
                key: 'startTime',
                ...this.getColumnSearchProps('startTime'),
            },
            {
                title: 'Tutor',
                dataIndex: 'tutor',
                key: 'tutor',
                ...this.getColumnSearchProps('tutor'),
            },
            {
                title: 'Topic',
                dataIndex: 'topic',
                key: 'topic',
                width: '20%',
                ...this.getColumnSearchProps('topic'),
            },
            {
                title: 'Duration',
                dataIndex: 'duration',
                key: 'duration',
                ...this.getColumnSearchProps('duration'),
            },
            {
                title: 'Meeting Link',
                key: 'link',
                width: '30%',
                dataIndex: 'link',
            },
        ];
        return <Table columns={columns} dataSource={this.state.data} />;
    }
}

export default ClassList;