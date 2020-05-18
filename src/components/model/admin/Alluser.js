import React, { Component } from 'react';
import {
    Table,
    // Button,
    notification
} from 'antd';
// import axios from 'axios'
import userServer from '../../../service/userServer'
import Onboarding from './Onboarding'
const data = userServer.getalluser();

class Alluser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
        };
        this.columns = [
            {
                title: '序号',
                dataIndex: 'id',
                key:'id',
                width: 60,
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key:'name',
                width: 60,
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key:'email',
                width: 200,
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                key:'phone',
                width: 120,
            },
            {
                title: '性别',
                dataIndex: 'gender',
                key:'gender',
                width: 60,
            },
            {
                title: '出生日期',
                dataIndex: 'birthday',
                key:'birthday',
                width: 120,
            },
            {
                title: '身份证',
                dataIndex: 'IDcard',
                key:'IDcard',
                width: 200,
            },
            {
                title: '常住地址',
                dataIndex: 'residence',
                key:'residence',
                width: 200,
            },
            // {
                // title: 'job',
                // dataIndex: 'job_info',
                // key:'job_info'
                // width: 100,
            // },
            {
                title: '提交',
                dataIndex: 'x1',
                key: 'x1',
                // render: () => <Button icon="to-top" type="primary" onClick={this.openNotification}>员工入职</Button>,
                render: (text, record) => <Onboarding id1={record.id} name1={record.name} job={record.job_info}></Onboarding>,
            },
        ]
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
        console.log('state', data)
        return (
            <div>
                所有员工信息
                <Table rowKey={'id'} columns={this.columns} dataSource={this.state.data} pagination={{ pageSize: 50 }} scroll={{ y: 400 }} />
            </div>
        );
    }
}

export default Alluser;