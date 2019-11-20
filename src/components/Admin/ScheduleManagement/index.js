import React, { Component } from 'react';
import { Table, Icon, Form, Input, Button } from 'antd';
import app from "firebase";
import './index.css';

const BACKURL = "http://localhost:5009/onlineenglishacademy-eddb3/us-central1/api";
//const ENDPOINT = "https://us-central1-onlineenglishacademy-eddb3.cloudfunctions.net/api";
const ENDPOINT = "http://localhost:5009/onlineenglishacademy-eddb3/us-central1/api";
const CONFIRMREQUEST = "/request/confirm";
const axios = require('axios');


class ScheduleManagement extends Component{
  columns = [
      {
          title: 'student',
          dataIndex: 'student',
          width: 100,

      },
      {
          title: 'tutor',
          dataIndex: 'tutor',
          width: 200,
      },
      {
          title: 'status',
          dataIndex: 'status',
          width: 100,
      },
      {
          title: 'meetingStartTime',
          dataIndex: 'meetingStartTime',
          width: 200,
      },
      {
          title: 'offset',
          dataIndex: 'offset',
          width: 200,
      },
      {
          title: 'createTime',
          dataIndex: 'createTime',
          width: 120,
      },
      {
          title: 'link',
          dataIndex: 'link',
          width: 120,
      },
      {
          title: 'Action',
          width: 100,
          fixed: 'right',
          render: (text, record)=>(
              <span>
              <a className="scheDeleteBTN" onClick={(e)=>this.handleDelete(record.id)}>
              <Icon type="close" />
              </a>

          </span>
          ),


      },
  ];

    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.state = {
            data: []
        }
    }


    refreshTable=()=>{
      axios.get(`${ENDPOINT}`+"/schedule/getList", {})
        .then(function (response) {
            this.setState({ data : response.data.content });
        }.bind(this))
        .catch(function (error) {
            console.log(error);// todo
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
              this.refreshTable();
          }.bind(this))
          .catch(function (error) {
              console.log(error);// todo
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
                Add a row
                </Button>
                <Table
                columns={columns}
                dataSource={this.state.data}
                scroll={{x:1500}}
            />
            </div>
        );
    }
}

export default ScheduleManagement;
