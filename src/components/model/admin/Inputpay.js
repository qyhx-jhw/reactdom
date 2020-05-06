import React, { Component } from 'react';
import { Table, InputNumber, DatePicker, Button ,notification} from 'antd';
class Inputpay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    key: 1,
                    name: '小蒋',
                    age: '技术部',
                    address: 'New York No. 1 Lake Park',
                    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
                },
                {
                    key: 2,
                    name: '小张',
                    age: "人事部",
                    address: 'London No. 1 Lake Park',
                    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
                },
                {
                    key: 3,
                    name: '小李',
                    age: "销售部",
                    address: 'Sidney No. 1 Lake Park',
                    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
                },
            ]
        };
        this.columns = [
            { title: '姓名', dataIndex: 'name', key: 'name' },
            { title: '部门', dataIndex: 'age', key: 'age' },
            // { title: 'Address', dataIndex: 'address', key: 'address' },
            {
                title: '时间',
                dataIndex: 'time',
                key: 'time',
                render: () => (<DatePicker />) ,
            },
            {
                title: '基础工资',
                dataIndex: 'x1',
                key: 'x1',
                render: () => <InputNumber
                    defaultValue={5000}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.onChange}
                />,
            },
            {
                title: '补助工资',
                dataIndex: 'x2',
                key: 'x2',
                render: () => <InputNumber
                    defaultValue={500}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.onChange}
                />,
            },
            {
                title: '扣除部分',
                dataIndex: 'x3',
                key: 'x3',
                render: () => <InputNumber
                    defaultValue={200}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.onChange}
                />,
            },
            {
                title: '实际工资',
                dataIndex: 'x4',
                key: 'x4',
                render: () => <InputNumber
                    defaultValue={5000}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.onChange}
                />,
            },
            {
                title: '提交',
                dataIndex: 'x5',
                key: 'x5',
                render: () => <Button icon="to-top" type="primary" onClick={this.openNotification}>提交信息</Button>,
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
        return (
            <div>
                输入工资
                <Table
                    columns={this.columns}
                    // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={this.state.data}
                />,
            </div>
        );
    }
}

export default Inputpay;