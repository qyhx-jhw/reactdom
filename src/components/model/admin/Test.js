import React, { Component } from 'react';
import { Table, Input, Button, Popconfirm, Form, InputNumber ,DatePicker} from 'antd';
import userServer from '../../../service/userServer'
import { values } from 'mobx';
import moment from 'moment';
// const data = userServer.getalluser();
const data = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: i.toString(),
        id:i,
        name: `Edrward ${i}`,
        department: '人事部',
        time:moment('2020-10-01', 'YYYY-MM-DD'),
        // age: 32,
        // pay: 5300,
        // address: `London Park no. ${i}`,
    });
}
const EditableContext = React.createContext();
class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        // return <Input />;
        return <DatePicker />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            // initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}


class Test1 extends Component {
    constructor(props) {
        super(props);
        this.state = { data, editingKey: '' };
        this.columns = [
            {
                title: '序号',
                dataIndex: 'id',
                // width: '25%',
                // editable: true,
            },
            {
                title: '姓名',
                dataIndex: 'name',
                // width: '25%',
                // editable: true,
            },
            {
                title: '部门',
                dataIndex: 'department',
                // width: '40%',
                // editable: true,
            },
            {
                title: '时间',
                dataIndex: 'time',
                // width: '15%',
                editable: true,
            },
            {
                title: 'age',
                dataIndex: 'age',
                // width: '15%',
                editable: true,
            },
            {
                title: '工资',
                dataIndex: 'pay',
                // width: '15%',
                editable: true,
            },
            // {
            //     title: 'operation',
            //     dataIndex: 'operation',
            //     render: (text, record) => {
            //         const { editingKey } = this.state;
            //         const editable = this.isEditing(record);
            //         return editable ? (
            //             <span>
            //                 <EditableContext.Consumer>
            //                     {form => (
            //                         <a
            //                             onClick={() => this.save(form, record.key)}
            //                             style={{ marginRight: 8 }}
            //                         >
            //                             完成
            //                         </a>
            //                     )}
            //                 </EditableContext.Consumer>
            //                 <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
            //                     <a>取消</a>
            //                 </Popconfirm>
            //             </span>
            //         ) : (
            //                 <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
            //                     编辑
            //                 </a>
            //             );
            //     },
            // },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    // const editable = this.isEditing(record);
                    return  (
                        <span>
                            <EditableContext.Consumer>
                                {form => (
                                    <a
                                        onClick={() => this.save(form, record.key)}
                                        style={{ marginRight: 8 }}
                                    >
                                        完成
                                    </a>
                                )}
                            </EditableContext.Consumer>
                            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                                 编辑
                            </a>
                            {/* <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                                <a>取消</a>
                            </Popconfirm> */}
                        </span>
                    ) 
                },
            },
        ];
    }

    isEditing = record => record.key === this.state.editingKey;

    // cancel = () => {
    //     this.setState({ editingKey: '' });
    // };

    handleSubmit = e => {
        // e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            // console.log('Received values of form: ', values);
            if (!err) {
                // let timetype = null
                //判断离职时间知否存在
                // if (values['end_time']) {
                //     timetype = values['end_time'].format('YYYY-MM-DD')
                // }
                const value = {
                    ...values,
                    'time': values['time'].format('YYYY-MM-DD'),
                    // 'end_time': timetype,
                }
                console.log('Received values of form: ', value);
            }
        });
    };
    save(form, key) {
        this.handleSubmit()
        // this.edit(key)
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }
    edit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const components = {
            body: {
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
                    inputType: col.dataIndex !== 'time' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                    // editing: record.key,
                }),
            };
        });

        return (
            <div>
                测试
                <EditableContext.Provider value={this.props.form}>
                    <Table
                        components={components}
                        bordered
                        dataSource={this.state.data}
                        columns={columns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: this.cancel,
                        }}
                    />
                </EditableContext.Provider>
            </div>
        );
    }
}

const Test = Form.create()(Test1);
export default Test;