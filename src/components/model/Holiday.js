import React, { Component } from 'react';
// import { Table, Comment, Avatar, Form, Button, List, Input } from 'antd';
import { Form, Input, Button, Table, DatePicker, Badge } from 'antd';
// import moment from 'moment';
import userServer from '../../service/userServer'
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const columns = [
    {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        defaultSortOrder: 'ascend'

        // render: text => <p>{text}</p>,
        //   width: 150,
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        // render: text => <p>{text}</p>,
        //   width: 150,
    },
    {
        title: '开始时间',
        dataIndex: 'start_time',
        key: 'start_time',
        // width: 80,
        // defaultSortOrder:'descend'
    },
    {
        title: '结束时间',
        dataIndex: 'end_time',
        key: 'end_time',
        // width: 80,
        // defaultSortOrder:'descend'
    },
    {
        title: '请假理由',
        dataIndex: 'reason',
        key: 'reason',
        ellipsis: true,
    },
    {
        title: '审核状态',
        dataIndex: 'status',
        key: 'status',
        // ellipsis: true,
        render: (text, render) => <div>
            {text === '审批中' && <Badge status="success" text="审批中" />}
            {text === '同意' && <Badge status="processing" text="同意" />}
            {text === '不同意' && <Badge status="error" text="不同意" />}
        </div>
    },
];
const aaa = userServer.get_holiday()

class Holiday1 extends Component {
    constructor(props) {
        super(props);
        // const aaa = userServer.get_holiday()
        this.state = {
            data: []
        }
        // var data = []
        let i = 1
        for (let index = 0; index < aaa.length; index++) {
            // console.log('shuju', aaa[index])
            if (userServer.id === aaa[index].hid) {
                // console.log('shuju', aaa[index])
                
                this.state.data.push({
                    key:i++,
                    id:aaa[index].id,
                    name: aaa[index].name,
                    start_time: aaa[index].start_time,
                    end_time: aaa[index].end_time,
                    reason: aaa[index].reason,
                    status: aaa[index].status,
                    hid: aaa[index].hid
                })
            }
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const value = {
                    ...values,
                    'start_time': values['time'][0].format('YYYY-MM-DD'),
                    'end_time': values['time'][1].format('YYYY-MM-DD'),
                }
                userServer.number++
                console.log('Received values of form: ', value);
                let start_time = value.start_time
                let end_time = value.end_time
                let reason = value.reason
                let status = '审批中'
                console.log('请假申请: ', start_time, end_time, reason, status);
                userServer.post_holiday(start_time, end_time, reason, status)
            }
        });
    };
    onChange(date, dateString) {
        console.log(date, dateString);
    }
    render() {
        // const { comments, submitting, value } = this.state;
        const { getFieldDecorator } = this.props.form;
        // Only show error after a field is touched.
        console.log('6988',this.state.data)
        return (
            <div>
                历史记录
                <Table columns={columns} dataSource={this.state.data} pagination={{ defaultPageSize: 5 }} />
                <br />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('time', {
                            rules: [{ required: true, message: '请输入请假理由' }],
                        })(
                            <RangePicker />
                        )}
                    </Form.Item>
                    <Form.Item >
                        {getFieldDecorator('reason', {
                            rules: [{ required: true, message: '请输入请假理由' }],
                        })(
                            <TextArea rows={4} allowClear={true} style={{ width: 500 }} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: 300 }} >
                            提交
                        </Button>
                    </Form.Item>
                   
                </Form>
            </div>
        );
    }
}
const Holiday = Form.create({ name: 'holiday' })(Holiday1);
export default Holiday;