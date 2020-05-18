import React, { Component } from 'react';
// import {} from 'antd';
import {
    Form, DatePicker,
    // TimePicker,
    Table, Badge,
    // Menu, Dropdown, Icon,
    Button,
    // Select
} from 'antd';
import userServer from '../../../service/userServer';

const { MonthPicker } = DatePicker;
const aaa = userServer.get_attendance()
const data = userServer.getalluser();
var element = []
for (let index = 1; index <= 30; index++) {
    element.push({
        title: index,
        dataIndex: index,
        key: index,
        render: (text, record) => {
            if (!text) {
                return (
                    // <Badge status="error" />
                    <Badge status="success" />

                )
            } else {
                return (
                    // <Badge status="success" />
                    <Badge status="error" />

                )
            }
        }
    })
}


class Attendance1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.columns = [
            { title: '序号', dataIndex: 'key', key: 'key' },
            { title: '姓名', dataIndex: 'name', key: 'name' },
            { title: '部门', dataIndex: 'department', key: 'department' },
            {
                title: '时间',
                children: element
            },
            { title: '请假', dataIndex: 'late', key: 'late' },
        ];
    }

    onchange = () => {
        let i = 1
        let values = []
        for (let index = 0; index < data.length; index++) {
            // for (let j = 1; j <= 30; j++) {
            values.push({
                key: i++,
                id: data[index].id,
                name: data[index].name,
                department: data[index].department,
                late: data[index].late
                // ...aaa.time
                // j: aaa[j].time,
                // time: aaa[index].time,
                // late: aaa[index].late,
                // aid: aaa[index].Aid_id

                // id: aaa[index].id,
                // name: aaa[index].name,
                // start_time: aaa[index].start_time,
                // end_time: aaa[index].end_time,
                // reason: aaa[index].reason,
                // status: aaa[index].status,
                // hid: aaa[index].hid
            })
            // }
        }
        let v_data = []
        for (let j = 0; j <= values.length; j++) {
            for (let i = 0; i < aaa.length; i++) {
                // const element = array[i];
                if (j+1 === aaa[i].aid) {
                    values[j][i + 1] = aaa[i].time
                }
            }
        }
        console.log('8777', v_data)
        this.setState({
            data: values
        })
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
            this.onchange()
            // userServer.get_attendance()
        });
    };

    render() {
        console.log(this.state.data)
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
                    columns={this.columns}
                    // expandedRowRender={expandedRowRender}
                    dataSource={this.state.data}
                    bordered
                    size={"small"}
                />

            </div>
        );
    }
}
const Attendance = Form.create({ name: 'time_related_controls' })(Attendance1);
export default Attendance;