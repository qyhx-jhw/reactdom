import React, { Component } from 'react';
import {
    Drawer, Form, Button, Col, Row,
    // Select,
    DatePicker, Icon, InputNumber
} from 'antd';
// import moment from 'moment';
// import axios from 'axios' 
import userServer from '../../../service/userServer'
// import { changeConfirmLocale } from 'antd/lib/modal/locale';
// const { Option } = Select;

class _Postpay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {
                id: '',
                name: '',
                pay:0,
            }
        };
    }
    //显示抽屉加载初始值
    showDrawer = () => {
        //判断离职时间：没有值测为null，有值测显示为moment的格式
        this.setState({
            visible: true,
            data: {
                id: this.props.id1,
                name: this.props.name1,
                // job: this.props.job,
                // start_time: moment(this.props.job.start_time, 'YYYY-MM-DD'), //显示入职时间的格式moment
                // end_time: endtime,
            }
        });
    };

    //关闭抽屉
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

   
    //提交数据
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const value = {
                    ...values,
                    'time': values['time'].format('YYYY-MM-DD'),
                }
                console.log('Received values of form: ', value);
                let id = this.state.data.id
                let name = this.state.data.name
                let time = value.time
                let basic_wage = value.basic_wage
                let subsidy = value.subsidy
                let deduction = value.deduction
                let pay = value.pay
                userServer.postpay(id, name, time,basic_wage,subsidy,deduction,pay)

            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>
                    <Icon type="form" />
                    添加工资
                </Button>
                <br />
                <Drawer
                    title="添加员工工资"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <h3>序号：{this.state.data.id}</h3>
                            </Col>
                            <Col span={12}>
                                <h3>姓名：{this.state.data.name}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="时间：">
                                    {getFieldDecorator('time', {
                                        rules: [{ type: 'object', required: true, message: '请选择添加时间!' }],
                                    })(<DatePicker />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="基础工资：">
                                  {getFieldDecorator('basic_wage', {
                                    rules: [{ required: true, message: '请输入基础工资' }],
                                    initialValue: 5000
                                })(<InputNumber size="large" min={0} style={{ width: 300 }}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />)}
                                </Form.Item>
                                <Form.Item label="补助：">
                                    {getFieldDecorator('subsidy', {
                                        rules: [{ required: true, message: '请输入补助工资' }],
                                        initialValue: 500
                                    })(<InputNumber size="large" min={0} style={{ width: 300 }}
                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    />)}
                                </Form.Item>
                                <Form.Item label="扣除部分：">
                                    {getFieldDecorator('deduction', {
                                        rules: [{ required: true, message: '请输入补助工资' }],
                                        initialValue: 200
                                    })(<InputNumber size="large" min={0} style={{ width: 300 }}
                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    />)}
                                </Form.Item>
                                <Form.Item label="实际工资：">
                                    {getFieldDecorator('pay', {
                                        rules: [{ required: true, message: '请输入实际工资' }],
                                        initialValue: 5300
                                    })(<InputNumber size="large" min={0} style={{ width: 300 }}
                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    />)}
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                            取消
                        </Button>
                        <Button onClick={this.handleSubmit} type="primary">
                            提交
                        </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}
const Postpay = Form.create()(_Postpay);
export default Postpay;