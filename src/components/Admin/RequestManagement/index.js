import React, { Component } from 'react';
import { Table, Icon } from 'antd';
import app from "firebase";



class RequestManagement extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    columns = [
        {
            title: 'Name',
            dataIndex: 'student',

        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],

        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Number',
            dataIndex: 'numOfS',
        },
        {
            title: 'Availability',
            dataIndex: 'availableTime',
        },
        {
            title: 'Tutor 1',
            dataIndex: 'preferredT1',
        },
        {
            title: 'Tutor 2',
            dataIndex: 'preferredT2',
        },
        {
            title: 'Tutor 3',
            dataIndex: 'preferredT3',
        },
        {
            title: 'Note',
            dataIndex: 'note',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            render: (text, record)=>(
                <span>
                <a onClick={(e)=>this.handleConfirm(record.student)}>
                <Icon type="check" />
                </a>

                <a onClick={(e)=>this.handleCancel(record.student)}>
                <Icon type="close" />
                </a>

            </span>
            ),

        },
    ];

    handleConfirm = (student)=>{
        alert("confirmed request from "+student);
    }

    handleCancel = (student)=>{
        alert("canceled request from "+student);
    }

    componentDidMount(){
        //get data
        this.data=null;
        let reqRef = app.firestore().collection('request');
        let requests = reqRef.get().then(snapshot => {
            let list = this.state.data;
            snapshot.forEach(doc =>{
                let reqObject = {student:doc.data().student, availableTime:doc.data().availableTime,
                    numOfS:doc.data().numOfS, note:doc.data().note, preferredT1:doc.data().preferredT1,
                    preferredT2:doc.data().preferredT2, preferredT3:doc.data().preferredT3, price:doc.data().price, timezone:doc.data().timezone};
                list.push(reqObject);
            });
            this.setState({ data : list });
            console.log(list);
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }



    render(){
        return (
            <div>
                <Table
                columns={this.columns}
                dataSource={this.state.data}
            />
            </div>
        );
    }
}

export default RequestManagement;