import React, { Component } from 'react';
import { Table, Icon, Form, Input, Popconfirm, notification } from 'antd';
import app from "firebase";
import './index.css';
import * as URL from "../../../constants/url";

//const BACKURL = "http://localhost:5009/onlineenglishacademy-eddb3/us-central1/api";
//const ENDPOINT = "https://us-central1-onlineenglishacademy-eddb3.cloudfunctions.net/api";
const ENDPOINT = URL.ENDPOINT;
const CONFIRMREQUEST = "/request/confirm";
const axios = require('axios');

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {

    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

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
            dataIndex: 'studentName',
            width: 100,

        },
        //{
        //    title: 'Gender',
        //    dataIndex: 'gender',
        //    filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
        //    width: 100,
        //},
        {
            title: 'Email',
            dataIndex: 'studentEmail',
            width: 200,
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
        {
            title: 'Action',
            width: 100,
            fixed: 'right',
            render: (text, record)=>(
            <span>
                <Popconfirm title="Sure to confirm?" onConfirm={(e)=>this.handleConfirm(record.id, record.studentId, record.status)}>
                  <a className="reqConfirmBTN">
                  <Icon type="check" />
                  </a>
                </Popconfirm>
                <Popconfirm title="Sure to cancel?" onConfirm={(e)=>this.handleCancel(record.id, record.studentId, record.status)}>
                  <a className="cancelBTN">
                  <Icon type="close" />
                  </a>
                </Popconfirm>

            </span>
            ),
        },
    ];
    refreshTable=()=>{
      axios.get(`${ENDPOINT}`+"/request/getList", {})
        .then(function (response) {
            console.log(response);
            console.log(response.data.content);
            this.setState({ data : response.data.content });
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
    };

    handleConfirm = (requestID, studentID, status)=>{
        //alert("confirmed request from "+requestID);
        if(status != "0"){
            notification.open({
              message: 'Failed!',
              description:'This request has already been confirmed or illegal status',
            });
            return;
        }
        axios.post(`${ENDPOINT}${CONFIRMREQUEST}`, {
                id: requestID
        })
            .then(function (response) {
                console.log(response);
                axios.post(`${URL.ENDPOINT}`+"/cart/tutor/add",{
                    requestID: requestID,
                    studentID: studentID
                }).then(function(response){
                    console.log("all done");
                    notification.open({
                        message: 'Request Confirmed!',
                        description:'This request is confirmed and moved to the shopping cart of the user',
                      });
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

    handleCancel = (requestID, studentID, status)=>{
        if(status == "2"){
            notification.open({
              message: 'Failed!',
              description:'The request can not be removed after the payment is completed',
            });
            return;
        }
        console.log(`${ENDPOINT}`+"/request/cancel");
        console.log(requestID);
        axios.post(`${ENDPOINT}`+"/request/cancel", {
                id: requestID
        })
          .then(function (response) {
              console.log(response);
              axios.post(`${URL.ENDPOINT}`+"/cart/tutor/delete",{
                  requestID: requestID,
                  studentID: studentID
              }).then(function(response){
                  console.log("all done");
                  notification.open({
                      message: 'Request Canceled!',
                    });
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

    handleSave = row => {
        //console.log(this.state.data);
        const newData = [...this.state.data];
        const index = newData.findIndex(item => row.id === item.id);
        const item = newData[index];

        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        //console.log(newData[index]);
        //console.log(newData);
        //validataion
        var validNum = /^\d+(\.\d+)?$/.test(newData[index].price);
        //var res = r.test(newData[index].price);
        if(!validNum){
            notification.open({
              message: 'Illegal price',
            });
            return;
        }
        axios.post(`${ENDPOINT}`+"/request/setPrice", {
                id: item.id,
                price: newData[index].price //? why here mush be newData[index] rather than item
        })
          .then(function (response) {
              console.log(response);
              notification.open({
                  message: 'Price Updated!',
                });
              this.setState({ data: newData });
          }.bind(this))
          .catch(function (error) {
              console.log(error);// todo
              notification.open({
                  message: 'Failed!',
                  description: error
                });
          });

    };

    componentDidMount(){
        //get data
        this.data=null;
        /*let reqRef = app.firestore().collection('request');
        let requests = reqRef.get().then(snapshot => {
            let list = this.state.data;
            snapshot.forEach(doc =>{
                let reqObject = {id:doc.id, student:doc.data().student, availableTime:doc.data().availableTime, status:doc.data().status,
                    numOfS:doc.data().numOfS, note:doc.data().note, preferredT1:doc.data().preferredT1, email:doc.data().email,
                    preferredT2:doc.data().preferredT2, preferredT3:doc.data().preferredT3, price:doc.data().price, timezone:doc.data().timezone};
                list.push(reqObject);
            });
            this.setState({ data : list });
            console.log(list);
        }).catch(err => {
            console.log('Error getting documents', err);
        });*/
        //use ajax to get data
        this.refreshTable();
    }



    render(){
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Table
                components={components}
                rowClassName={() => 'editable-row'}
                columns={columns}
                dataSource={this.state.data}
                scroll={{x:1500}}
            />
            </div>
        );
    }
}

export default RequestManagement;
