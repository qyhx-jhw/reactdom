import React, { Component } from 'react';
// import {} from 'antd';
import { Form, DatePicker, TimePicker, Table, Badge, Menu, Dropdown, Icon, Button, Select } from 'antd';

const { MonthPicker } = DatePicker;
const expandedRowRender = () => {
    const columns = [
        { title: '序号', dataIndex: 'id', key: 'id' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '部门', dataIndex: 'department', key: 'department' },
        {
            title: '时间',
            children: element
        },
        { title: '请假', dataIndex: 'late', key: 'late' },
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
var element = []
for (let index = 1; index <= 30; index++) {
    element.push({
        title: index,
        dataIndex: index,
        key: index,
        render: (text, record) => {
            
            if (record.id == 1 && index===15) {
                return (
                    <Badge status="error" />
                )
            }else{
                return (
                    <Badge status="success" />
                )
            }

        }
    })
}
const { Option } = Select;
const columns = [
    { title: '序号', dataIndex: 'id', key: 'id' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '部门', dataIndex: 'department', key: 'department' },
    {
        title: '时间',
        children: element
    },
    { title: '请假', dataIndex: 'late', key: 'late' },
];
const data = [
    {
        id: 1,
        name: '小张',
        department: '人事部',
        late: '有',

    },
    {
        id: 2,
        name: '小李',
        department: '采购部',
        late: '无',
    },
    {
        id: 3,
        name: '小钱',
        department: '技术部',
        late: '无',
    }
];


class Attendance1 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            const values = {
                ...fieldsValue,
                'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
            };
            console.log('Received values of form: ', values);
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 0 },
                sm: { span: 8 },
            },
            wrapperCol: {
                // xs: { span: 24 },
                // sm: { span: 16 },
            },
        };
        const config = {
            rules: [{ type: 'object', required: false, message: '选择时间' }],
        };

        return (
            <div>
                考勤表
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="选择时间">
                        {getFieldDecorator('month-picker', config)(<MonthPicker />)}
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
                <Table
                    className="components-table-demo-nested"
                    columns={columns}
                    // expandedRowRender={expandedRowRender}
                    dataSource={data}
                    bordered
                    size={"small"}
                />

            </div>
        );
    }
}
const Attendance = Form.create({ name: 'time_related_controls' })(Attendance1);
export default Attendance;