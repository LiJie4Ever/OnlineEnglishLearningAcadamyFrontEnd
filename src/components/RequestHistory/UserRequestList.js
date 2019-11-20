import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Icon, notification } from 'antd';
import * as URL from '../../constants/url';

const axios = require('axios');

class UserRequestList extends React.Component {
    state = {
        data: []
    };
    columns = [
        {
            title: 'Name',
            dataIndex: 'studentName',
            width: 100,

        },
        {
            title: 'Number',
            dataIndex: 'numOfS',
            width: 100,
        },
        {
            title: 'Availability',
            width: 200,
            render: (text, record)=>{
              var avday="";
              var avtime ="";
              if(record.availableDay!=undefined)
                avday = record.availableDay.join(",");
              if(record.availableTimeSlot!=undefined)
                avtime = record.availableTimeSlot.join(",");
              return(
                <span>
                    {avday}<br/>{avtime}
                </span>
            )},
        },
        {
            title: 'Tutor 1',
            dataIndex: 'preferredT1',
            width: 120,
        },
        {
            title: 'Tutor 2',
            dataIndex: 'preferredT2',
            width: 120,
        },
        {
            title: 'Tutor 3',
            dataIndex: 'preferredT3',
            width: 120,
        },
        {
            title: 'Note',
            dataIndex: 'note',
            width: 200,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: 100,
            editable: true,
        },
        {
            title: 'Status',
            width: 150,
            render: (text, record)=>{
              var displayStatus = "Illegal status";
              if(record.status=="0"){
                displayStatus = "Unconfirmed";
              }else if(record.status=="1"){
                displayStatus = "Confirmed & Unpaid";
              }else if(record.status=="2"){
                displayStatus = "Paid";
              }
              return(
                <span>
                    {displayStatus}
                </span>
            )},
        },
    ];

    componentDidMount() {
        var user = this.props.data;
        axios.get(`${URL.ENDPOINT}`+"/request/getList", {})
          .then(function (response) {
              console.log(response);
              console.log(response.data.content);
              var oldList = response.data.content;
              var newList = [];
              for(var i=0;i<oldList.length;i++){
                  if(oldList[i].studentId==user.uid)
                      newList.push(oldList[i]);
              }
              this.setState({ data : newList });
              notification.open({
                  message: 'Data reloaded!',
                });
          }.bind(this))
          .catch(function (error) {
              console.log(error);// todo
              notification.open({
                  message: 'Failed!',
                  description: error
                });
          });
    }

    render() {
      const columns = this.columns;
      return (
          <div>
              <Table
              columns={columns}
              dataSource={this.state.data}
              //scroll={{x:1000}}
          />
          </div>
      );
    }
}

export default UserRequestList;
