import React, { Component } from 'react';
import { Table,Form } from 'antd';
import userServer from '../../../service/userServer'
// import axios from 'axios' //消息处理
// import { values } from 'mobx';
import Postpay from './Postpay'
// import { render } from 'react-dom';
const data = userServer.getalluser();
const aaa = userServer.getpayroll()

const expandedRowRender = (id, data2) => {
    // var aaa=userServer.getpayroll(id)
    var data = []
    let i=1
    for (let index = 0; index < aaa.length; index++) {
        if (id === aaa[index].pid) {
            data.push({
                key: i++,
                time: aaa[index].time,
                basic_wage: aaa[index].basic_wage,
                subsidy: aaa[index].subsidy,
                deduction: aaa[index].deduction,
                pay: aaa[index].pay,
            })
        }
    }
    // console.log('数据',data)
    const columns = [
        { title: '序号', dataIndex: 'key', key: 'key' },
        // { title: '姓名', dataIndex: 'name', key: 'name' },
        // { title: '部门', dataIndex: 'department', key: 'department' },
        // { title: '岗位', dataIndex: 'position', key: 'address' },
        { title: '时间', dataIndex: 'time', key: 'time' },
        { title: '基础工资', dataIndex: 'basic_wage', key: 'basic_wage' },
        { title: '补助', dataIndex: 'subsidy', key: 'subsidy' },
        { title: '扣除部分', dataIndex: 'deduction', key: 'deduction' },
        { title: '实际工资', dataIndex: 'pay', key: 'pay' },
    ];
    return <Table columns={columns} dataSource={data} rowKey={record => record.key} />;
}


class Inputpay1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            pay: '',
            data2: []
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
                render: (text, record) => <Postpay id1={record.id} name1={record.name}></Postpay>,
            },
        ];
        // this.data2=[]
    }

    render() {
        return (
            <div>
                输入工资
                <Table
                    rowKey={record => record.id}
                    columns={this.columns}
                    // expandedRowRender={expandedRowRender}
                    expandedRowRender={record => expandedRowRender(record.id, this.state.data2)}
                    dataSource={this.state.data}
                />
            </div>
        );
    }
}
const Inputpay = Form.create()(Inputpay1);
export default Inputpay;