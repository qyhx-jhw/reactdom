import React, { Component } from 'react';
import { Table, InputNumber, DatePicker, Button, notification, Form } from 'antd';
import userServer from '../../../service/userServer'
// import { values } from 'mobx';
import Postpay from './Postpay'
const data = userServer.getalluser();
const expandedRowRender = () => {
    const columns = [
        { title: '序号', dataIndex: 'id', key: 'id' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '部门', dataIndex: 'department', key: 'department' },
        { title: '岗位', dataIndex: 'position', key: 'address' },
        { title: '时间', dataIndex: 'time', key: 'time' },
        { title: '基础工资', dataIndex: 'basic_wage', key: 'basic_wage' },
        { title: '补助', dataIndex: 'subsidy', key: 'subsidy' },
        { title: '扣除部分', dataIndex: 'deduction', key: 'deduction' },
        { title: '实际工资', dataIndex: 'pay', key: 'pay' },

    ];
    const data = [
        {
            id: 1,
            name: '小张',
            department: '技术部',
            position:'网络维护',
            time: '2019-10-01',
            basic_wage: 5000,
            subsidy: 500,
            deduction: 200,
            pay:5300,
        },
        {
            id: 1,
            name: '小张',
            department: '技术部',
            position:'网络维护',
            time: '2019-11-01',
            basic_wage: 5000,
            subsidy: 600,
            deduction: 200,
            pay:5600,
        },
        {
            id: 1,
            name: '小张',
            department: '技术部',
            position:'网络维护',
            time: '2019-09-05',
            basic_wage: 5000,
            subsidy: 500,
            deduction: 200,
            pay:5300,
        }
    ];
    return <Table columns={columns} dataSource={data} pagination={false} />;
}
class Inputpay1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            pay: ''
        };
        // const { getFieldDecorator } = this.props.form;

        this.columns = [
            { title: '序号', dataIndex: 'id', key: 'id', },
            { title: '姓名', dataIndex: 'name', key: 'name' },
            { title: '部门', dataIndex: 'department', key: 'department' },
            { title: '岗位', dataIndex: 'position', key: 'address' },
            {
                title: '添加工资',
                dataIndex: 'up',
                key: 'up',
                render: (text,record) => <Postpay id1={record.id} name1={record.name}></Postpay>,
            },
        ];
    }

    onChange = (value) => {
        console.log('changed', value);
    }
    openNotification = () => {
        const args = {
            message: '添加信息成功',
            description:
                '已将添加的信息发送到数据库',
            duration: 2,
        };
        notification.open(args);
    };
    render() {
        // console.log('//////////', this.state.data)
        // const { getFieldDecorator } = this.props.form;
        return (
            <div>
                输入工资
                <Table
                    rowKey={'id'}
                    columns={this.columns}
                    expandedRowRender={expandedRowRender}
                    dataSource={this.state.data}
                />
            </div>
        );
    }
}
const Inputpay = Form.create()(Inputpay1);
export default Inputpay;