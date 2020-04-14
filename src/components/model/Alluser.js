import React, { Component } from 'react';
import { Table } from 'antd';
import axios from 'axios'
import userServer from '../../service/user'
const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        width: 50,
    },
    {
        title: '姓名',
        dataIndex: 'name',
        width: 100,
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        width: 100,
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        width: 100,
    },
    {
        title: '性别',
        dataIndex: 'gender',
        width: 100,
    },
    {
        title: '出生日期',
        dataIndex: 'birthday',
        width: 100,
    },
    {
        title: '身份证',
        dataIndex: 'IDcard',
        width: 100,
    },
    {
        title: '常住地址',
        dataIndex: 'residence',
        width: 100,
    },
];

const data = userServer.getalluser();

class Alluser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:data,
        };
    }

    render() {
        console.log('state',this.state.data)
        return (
            <div>
                所有员工信息
                <Table columns={columns} dataSource={this.state.data} pagination={{ pageSize: 50 }} scroll={{ y: 400 }} />
            </div>
        );
    }
}

export default Alluser;