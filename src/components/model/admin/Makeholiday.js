import React, { Component } from 'react';
import {
    Table, Badge, Form,
    // Menu, Dropdown, Icon,
    Button, Select
} from 'antd';
import userServer from '../../../service/userServer'
const aaa = userServer.get_holiday()//获得所有请假信息
const { Option } = Select;
//展开项列表
const expandedRowRender = (record) => {
    console.log('个人假期', record)
    var data = []
    let i = 1
    for (let index = 0; index < aaa.length; index++) {
        if (record.hid === aaa[index].hid && aaa[index].status !== '审批中') {
            data.push({
                key: i++,
                id: aaa[index].id,
                name: aaa[index].name,
                start_time: aaa[index].start_time,
                end_time: aaa[index].end_time,
                reason: aaa[index].reason,
                status: aaa[index].status,
                hid: aaa[index].hid
            })
        }
    }
    const columns = [
        { title: '序号', dataIndex: 'key', key: 'key' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '起始时间', dataIndex: 'start_time', key: 'start_time' },
        { title: '结束时间', dataIndex: 'end_time', key: 'end_time' },
        { title: '请假理由', dataIndex: 'reason', key: 'reason' },
        {
            title: '审核状态',
            dataIndex: 'status',
            key: 'status',
            // ellipsis: true,
            render: (text, render) => <div>
                {text === '审批中' && <Badge status="processing" text="审批中" />}
                {text === '同意' && <Badge status="success" text="同意" />}
                {text === '不同意' && <Badge status="error" text="不同意" />}
            </div>
        },
    ];
    return <Table columns={columns} dataSource={data} pagination={false} rowKey={record => record.id} />;
}
//提交审核按钮类
class Tj1 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    //提交函数
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values.status, this.props.user_id);
                let user_id = this.props.user_id
                let status = values.status
                // console.log('请假申请: ', start_time, end_time, reason, status);
                userServer.post_make_holiday(user_id,status)
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('status', {
                            rules: [{ required: true, message: '请输入请假理由' }],
                            // initialValue: '审批中'
                        })(
                            <Select  style={{ width: 120 }} >
                                <Option value="同意">同意</Option>
                                <Option value="不同意">不同意</Option>
                            </Select>
                        )}
                    <Button type="primary" htmlType="submit" >提交</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const Tj = Form.create({ name: 'holiday' })(Tj1);


//审核请假组件
class Makeholiday extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            user_data: []
        };
        let i = 1
        for (let index = 0; index < aaa.length; index++) {
            if (aaa[index].status === '审批中') {
                this.state.data.push({
                    key: i++,
                    id: aaa[index].id,
                    name: aaa[index].name,
                    start_time: aaa[index].start_time,
                    end_time: aaa[index].end_time,
                    reason: aaa[index].reason,
                    status: aaa[index].status,
                    hid: aaa[index].hid
                })
            }
        }
        // const { getFieldDecorator } = this.props.form;
        this.columns = [
            { title: '序号', dataIndex: 'key', key: 'key' },
            { title: '姓名', dataIndex: 'name', key: 'name' },
            { title: '起始时间', dataIndex: 'start_time', key: 'start_time' },
            { title: '结束时间', dataIndex: 'end_time', key: 'end_time' },
            { title: '请假理由', dataIndex: 'reason', key: 'reason' },
            { title: '状态', dataIndex: 'status', key: 'status' },
            {title: '操作', key: 'operation', render: (text, record) => <Tj user_id={record.id}> </Tj>}
        ];
    }
    render() {
        // const { getFieldDecorator } = this.props.form;
        return (
            <div>请假审核处理
                <Table
                    rowKey={record => record.id}
                    // className="components-table-demo-nested"
                    columns={this.columns}
                    expandedRowRender={record => expandedRowRender(record)}
                    dataSource={this.state.data}
                />
            </div>
        );
    }
}
export default Makeholiday;