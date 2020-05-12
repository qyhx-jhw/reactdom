import React, { Component } from 'react';
import {
    Table, Badge,
    // Menu, Dropdown, Icon,
    Button, Select
} from 'antd';

const expandedRowRender = () => {
    const columns = [
        { title: '序号', dataIndex: 'id', key: 'id' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '提交时间', dataIndex: 'time', key: 'time' },
        { title: '起始时间', dataIndex: 'start_time', key: 'start_time' },
        { title: '结束时间', dataIndex: 'end_time', key: 'end_time' },
        { title: '请假理由', dataIndex: 'reason', key: 'reason' },
        // { title: '状态', dataIndex: 'status', key: 'status' },
        {
            title: '状态',
            key: 'status',
            render: () => (
                <span>
                    <Badge status="success" />
                    同意
                </span>
            )
        },

    ];
    const data = [
        {
            id: 1,
            name: '小张',
            time: '2019-09-05 15:12:00',
            start_time: '2019-09-06',
            end_time: '2019-09-08',
            reason: '家中有事',
            status: 0,
        },
        {
            id: 2,
            name: '小张',
            time: '2019-08-20 15:12:00',
            start_time: '2019-08-21',
            end_time: '2019-08-22',
            reason: '父母来看我',
            status: 0,
        },
        {
            id: 3,
            name: '小张',
            time: '2019-07-20 15:12:00',
            start_time: '2019-07-21',
            end_time: '2019-07-22',
            reason: '和朋友去爬山',
            status: 0,
        }
    ];
    return <Table columns={columns} dataSource={data} pagination={false} />;
}
const { Option } = Select;
const columns = [
    { title: '序号', dataIndex: 'id', key: 'id' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '起始时间', dataIndex: 'start_time', key: 'start_time' },
    { title: '结束时间', dataIndex: 'end_time', key: 'end_time' },
    { title: '请假理由', dataIndex: 'reason', key: 'reason' },
    // { title: '状态', dataIndex: 'status', key: 'status' },
    {
        title: '状态',
        key: 'status',
        render: () => (
            <Select defaultValue="审批中" style={{ width: 120 }} >
                <Option value="同意">同意</Option>
                <Option value="不同意">不同意</Option>
            </Select>
        )
    },
    { title: '操作', key: 'operation', render: () => <Button type="primary" ghost>提交</Button> },
];
const data = [
    {
        id: 1,
        name: '小张',
        time: '2019-10-05 15:12:00',
        start_time: '2019-10-06',
        end_time: '2019-10-08',
        reason: '家中有事',
        status: 0,
    },
    {
        id: 2,
        name: '小李',
        time: '2019-11-20 15:12:00',
        start_time: '2019-11-21',
        end_time: '2019-11-22',
        reason: '朋友结婚',
        status: 0,
    }
];
// for (let i = 0; i < 3; ++i) {
//     data.push({
//         key: i,
//         id: i,
//         name: 'Screem'+i,
//         reason: '家中有事',
//         status: '0',
//         time: '2014-12-24 23:12:00',
//     });
// }

class Makeholiday extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>请假审核处理
                <Table
                    className="components-table-demo-nested"
                    columns={columns}
                    expandedRowRender={expandedRowRender}
                    dataSource={data}
                />
            </div>
        );
    }
}

export default Makeholiday;