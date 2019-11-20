import React, { Component } from 'react';
import { Table, Icon, Form, Input, Button, notification, Popconfirm } from 'antd';
import app from "firebase";
import './index.css';
import * as URL from "../../../constants/url";
//const BACKURL = "http://localhost:5009/onlineenglishacademy-eddb3/us-central1/api";
//const ENDPOINT = "https://us-central1-onlineenglishacademy-eddb3.cloudfunctions.net/api";
const ENDPOINT = URL.ENDPOINT
const CONFIRMREQUEST = "/request/confirm";
const axios = require('axios');


class ScheduleManagement extends Component{
  columns = [
      {
          title: 'student',
          dataIndex: 'student',
          width: 120,
      },
      {
          title: 'tutor',
          dataIndex: 'tutor',
          width: 120,
      },
      {
          title: 'meetingStartTime',
          dataIndex: 'meetingStartTime',
          width: 150,
      },
      {
          title: 'duration',
          dataIndex: 'duration',
          width: 80,
      },
      {
          title: 'offset',
          dataIndex: 'offset',
          width: 80,
      },
      {
          title: 'createTime',
          dataIndex: 'createTime',
          width: 150,
      },
      {
          title: 'link',
          dataIndex: 'link',
          width: 120,
      },
      {
          title: 'Action',
          width: 100,
          //fixed: 'right',
          render: (text, record)=>(
          <span>
              <Popconfirm title="Sure to confirm?" onConfirm={(e)=>this.handleDelete(record.id)}>
                <a className="scheDeleteBTN">
                <Icon type="close" />
                </a>
              </Popconfirm>
          </span>
          ),


      },
  ];

    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        console.log("____");
        //console.log(this.props.location.state);
        if(this.props.location.state!=undefined && this.props.location.state.message!=undefined){
          notification.open({
              message: this.props.location.state.message,
            });
        }
        //console.log(this.props.location.state.message);
        this.state = {
            data: []
        }
    }


    refreshTable=()=>{
      axios.get(`${ENDPOINT}`+"/schedule/getList", {})
        .then(function (response) {
            notification.open({
              message: 'Data reloaded!',
            });
            this.setState({ data : response.data.content });
        }.bind(this))
        .catch(function (error) {
            console.log(error);// todo
            notification.open({
                message: 'Failed!',
                description: error
              });
        });
    };


    handleDelete = (scheduleID)=>{
        console.log(`${ENDPOINT}`+"/schedule/delete");
        console.log(scheduleID);
        axios.post(`${ENDPOINT}`+"/schedule/delete", {
                id: scheduleID
        })
          .then(function (response) {
              console.log(response);
              notification.open({
                message: 'Schedule deleted!',
              });
              this.refreshTable();
          }.bind(this))
          .catch(function (error) {
              console.log(error);// todo
              notification.open({
                  message: 'Failed!',
                  description: error
                });
          });
    }
    handleAdd (){
      var item = null;
      this.props.history.push({pathname:'/admin/addSchedule'});
    };

    componentDidMount(){
        //get data
        this.data=null;
        this.refreshTable();
    }



    render(){
        const columns = this.columns;
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                Add schedule
                </Button>
                <Table
                columns={columns}
                dataSource={this.state.data}
                //scroll={{x:1000}}
            />
            </div>
        );
    }
}

export default ScheduleManagement;
