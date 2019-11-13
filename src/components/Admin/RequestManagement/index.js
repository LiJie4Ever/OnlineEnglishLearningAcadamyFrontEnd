import React, { Component } from 'react';
import { Table, Icon, Form, Input } from 'antd';
import app from "firebase";
import './index.css';

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
            dataIndex: 'student',
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
            dataIndex: 'email',
            width: 200,
        },
        {
            title: 'Number',
            dataIndex: 'numOfS',
            width: 100,
        },
        {
            title: 'Availability',
            dataIndex: 'availableTime',
            width: 200,
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
            dataIndex: 'status',
            width: 100,
        },
        {
            title: 'Action',
            width: 100,
            fixed: 'right',
            render: (text, record)=>(
                <span>
                <a className="reqConfirmBTN" onClick={(e)=>this.handleConfirm(record.student)}>
                <Icon type="check" />
                </a>

                <a className="cancelBTN" onClick={(e)=>this.handleCancel(record.student)}>
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

    handleSave = row => {
        return;
        const newData = [...this.state.data];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ data: newData });
    };

    componentDidMount(){
        //get data
        this.data=null;
        let reqRef = app.firestore().collection('request');
        let requests = reqRef.get().then(snapshot => {
            let list = this.state.data;
            snapshot.forEach(doc =>{
                let reqObject = {student:doc.data().student, availableTime:doc.data().availableTime, status:doc.data().status,
                    numOfS:doc.data().numOfS, note:doc.data().note, preferredT1:doc.data().preferredT1, email:doc.data().email,
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
                columns={columns}
                dataSource={this.state.data}
                scroll={{x:1500}}
            />
            </div>
        );
    }
}

export default RequestManagement;