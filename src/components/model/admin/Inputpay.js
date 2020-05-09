import React, { Component } from 'react';
import { Table, InputNumber, DatePicker, Button, notification, Form } from 'antd';
import userServer from '../../../service/user'

const data = userServer.getalluser();
// console.log('*****',userserver.name)
// const tj = () => {
//     return <Button icon="to-top" type="primary" >提交信息</Button>
// }

class Tj extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Button icon="to-top" type="primary" >提交信息</Button>
        );
    }
}



class Inputpay1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
        };
        const { getFieldDecorator } = this.props.form;
        this.columns = [
            {
                title: '序号', dataIndex: 'id', key: 'id',
                render: (text,record) =>
                getFieldDecorator('id', {
                    rules: [{required: true}],
                    initialValue:text
                })(<a>{text}</a>)
                
            },
            { title: '姓名', dataIndex: 'name', key: 'name' },
            { title: '部门', dataIndex: 'department', key: 'department' },
            // { title: 'Address', dataIndex: 'address', key: 'address' },
            {
                title: '时间',
                dataIndex: 'time',
                key: 'time',
                render: () => (<DatePicker />),
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
                render: () =>
                    getFieldDecorator('补助工资', {
                        rules: [{ required: true, message: '请选择您的工资!' }],
                        initialValue:500
                    })
                        (
                        < InputNumber formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } parser={value => value.replace(/\$\s?|(,*)/g, '')} onChange={this.onChange} />)


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
                // render: () => <Button icon="to-top" type="primary" onClick={this.openNotification}>提交信息</Button>,
                render: () => <Tj></Tj>,

            },
        ];
    }

    // handleSubmit = e => {
    //     e.preventDefault();
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //         // if (!err) {
    //         //     const value = {
    //         //         ...values,
    //         //         'birthday': values['birthday'].format('YYYY-MM-DD'),
    //         //     }
    //             console.log('Received values of form: ', values);
    //             // let name=value.name
    //             // let email= value.email
    //             // let phone= value.phone
    //             // let gender= value.gender
    //             // let birthday= value.birthday
    //             // let IDcard= value.IDcard
    //             // let residence= value.residence
    //             // userServer.updateuser(name,email,phone,gender,birthday,IDcard,residence)
                
    //         // }
    //     });
    // };
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
                    columns={this.columns}
                    // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={this.state.data}
                />,
                <Button icon="to-top" type="primary" onClick={this.handleSubmit}>提交信息</Button>,
            </div>
        );
    }
}
const Inputpay = Form.create()(Inputpay1);
export default Inputpay;