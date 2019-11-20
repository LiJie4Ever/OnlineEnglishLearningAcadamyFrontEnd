import React, { Component} from 'react';
import { Form, Icon, Input, Button, Checkbox,Select, notification } from 'antd';
import * as URL from "../../../constants/url";
import './index.css';
import { withFirebase } from '../../Firebase';
import app from "firebase";
import { DatePicker } from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;
const ADDBLOG = "/blog/add";
const MODIFYBLOG = "/blog/modify";
const axios = require('axios');
const ENDPOINT = URL.ENDPOINT;

class AddSchedule extends Component{
    constructor(props) {
        super(props);
        this.cancelAdd = this.cancelAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
          tutorList:[],
          studentList:[],
          pickD:"",
          pickT:"",
        };
        //console.log(this);
    }

    componentDidMount() {
        let allTutors = app.firestore().collection("users").where("roles","==",{"TUTOR":"TUTOR"}).get().then(snapshot => {
            let tutors = [];
            snapshot.forEach(doc => {
                tutors.push({
                        uid: doc.id,
                        userName: doc.data().userName
                    });
                }
            );
            this.setState({
                tutorList: tutors
            });
            //console.log(tutors);
        });
        let allStudents = app.firestore().collection("users").where("roles","==",{"STUDENT":"STUDENT"}).get().then(snapshot => {
            let students = [];
            snapshot.forEach(doc => {
                students.push({
                        uid: doc.id,
                        userName: doc.data().userName
                    });
                }
            );
            this.setState({
                studentList: students
            });
        });
        //console.log(this.state);
    }
    cancelAdd() {
        this.props.history.push({pathname: '/admin/schedule' , state:{message:"Schedule creation canceled"}});
    }

    handleSubmit = e => {
      // todo, validate the input
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            //console.log(values);
            //return;
            if (!err) {
                var myD = new Date();
                let date = myD.getFullYear()+"-"+(myD.getMonth()+1)+"-"+myD.getDate()
                +" "+myD.getHours()+":"+myD.getMinutes()+":"+myD.getSeconds();
                //console.log(date);
                //return;
                let dataObj = {
                    student: values.selectedStudent,
                    tutor: values.selectedTutor,
                    meetingStartTime: this.state.pickD+" "+this.state.pickT,
                    offset: values.timezone,
                    duration: values.duration,
                    createTime: date,
                    link:"not avaliable",
                    topic:""
                };
                console.log(dataObj);
                //return;
                //create a schedule
                axios.post(`${ENDPOINT}`+"/schedule/add", {
                    fields: dataObj
                })
                    .then(function (response) {
                        this.props.history.push({pathname: '/admin/schedule' , state:{message:"Schedule created successfully!"}});
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                        notification.open({
                            message: 'Failed!',
                            description: error
                          });
                    });
            }
        });
    };
    onChangeD =(date, dateString)=> {
      //console.log(date, dateString);
      //console.log(this.state);
      this.state.pickD=dateString;
    }
    onChangeT=(time, timeString) =>{
      //console.log(time, timeString);
      this.state.pickT=timeString;
    }
    render() {


        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return(
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="blog-edit-form">
                    <Form.Item label="Tutor" hasFeedback>
                        {getFieldDecorator('selectedTutor', {
                            rules: [{ required: true, message: 'Please select the tutor!' }],
                        })(
                            <Select placeholder="Please select a course">
                                {
                                    this.state.tutorList.map((item, index) => {
                                        return(
                                            <Option key={item.uid} value={item.uid}>{item.userName}</Option>
                                        )
                                    })
                                }
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Student" hasFeedback>
                        {getFieldDecorator('selectedStudent', {
                            rules: [{ required: true, message: 'Please select the student!' }],
                        })(
                            <Select placeholder="Please select a course">
                            {
                                this.state.studentList.map((item, index) => {
                                    return(
                                        <Option key={item.uid} value={item.uid}>{item.userName}</Option>
                                    )
                                })
                            }
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="start date">
                        {getFieldDecorator('startDate', {
                            rules: [{ required: true }],
                        })(
                          <DatePicker onChange={this.onChangeD} placeholder="Select date" />
                        )}
                    </Form.Item>
                    <Form.Item label="start time">
                      {getFieldDecorator('startTime', {
                          rules: [{ required: true }],
                      })(
                        <TimePicker onChange={this.onChangeT} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />,

                      )}
                    </Form.Item>
                    <Form.Item label="timezone">
                        {getFieldDecorator('timezone', {
                            rules: [{ required: true, message: 'Please input the author!' }],
                        })(
                            <Input
                                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Time zone of the student"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="duration">
                        {getFieldDecorator('duration', {
                            rules: [{ required: true, message: 'Please input the author!' }],
                        })(
                            <Input
                                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="How long is this session"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}>
                    <Button type="primary" htmlType="submit" className="comfirmBTN">
                        Comfirm
                    </Button>
                    <a className="cancelBTN" onClick={this.cancelAdd}>cancel</a>

                    </Form.Item>

                </Form>
            </div>
        )
    }
}

const WrappedNormalForm = Form.create({ name: 'AddSchedule' })(AddSchedule);

export default WrappedNormalForm;
