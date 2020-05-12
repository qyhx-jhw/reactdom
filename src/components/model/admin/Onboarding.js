import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon } from 'antd';
import moment from 'moment';
// import axios from 'axios' 
import userServer from '../../../service/userServer'
const { Option } = Select;

class _Onboarding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,//是否可见
            data: {
                id: '', //id号码
                name: '', //员姓名
                job: '', //职位信息
                start_time: '', //入职时间，时间控件特殊单独拿出来
                end_time: ''//离职时间

            }
        };
    }
    //显示抽屉加载初始值
    showDrawer = () => {

        //判断离职时间：没有值测为null，有值测显示为moment的格式
        var endtime = this.props.job.end_time
        if (endtime) {
            endtime = moment(this.props.job.end_time, 'YYYY-MM-DD')
        } else {
            endtime = null
        }

        this.setState({
            visible: true,
            data: {
                id: this.props.id1,
                name: this.props.name1,
                job: this.props.job,
                start_time: moment(this.props.job.start_time, 'YYYY-MM-DD'), //显示入职时间的格式moment
                end_time: endtime,
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
                let timetype = null
                //判断离职时间知否存在
                if (values['end_time']) {
                    timetype = values['end_time'].format('YYYY-MM-DD')
                }
                const value = {
                    ...values,
                    'start_time': values['start_time'].format('YYYY-MM-DD'),
                    'end_time': timetype,
                }
                console.log('Received values of form: ', value);
                let id = this.state.data.id
                let name = this.state.data.name
                let start_time = value.start_time
                let end_time = value.end_time
                let department = value.department
                let position = value.position
                let situation = value.situation
                userServer.getjob(id, name, start_time, end_time, department, position, situation)

            }
        });
    };
    render() {
        // console.log('8787878', this.props.id1, this.props.name1, this.props.job.end_time)
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>
                    <Icon type="form" />
                    员工职位信息
                </Button>
                <br />
                <Drawer
                    title="员工入职信息"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="序号：">{this.state.data.id}
                                    {/* {getFieldDecorator('id', {
                                        rules: [{ required: true, message: '请输入手机号码' }],
                                        initialValue:this.state.data.id
                                    })(                                      
                                        <Input
                                            style={{ width: '100%' }}
                                            // addonBefore="http://"
                                            // addonAfter=".com"
                                            placeholder="请输入手机号"
                                        />,
                                    )} */}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="姓名：">
                                    {this.state.data.name}
                                    {/* {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入姓名' }],
                                        initialValue: this.state.data.name
                                    })(<Input placeholder="输入你的姓名" />)} */}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="入职时间：">
                                    {getFieldDecorator('start_time', {
                                        rules: [{ type: 'object', required: true, message: '请选择入职时间!' }],
                                        // rules: [{ type: 'object', required: true, message: '请选择时间!' }],
                                        initialValue: this.state.data.start_time
                                    })(<DatePicker />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="离职时间：">
                                    {getFieldDecorator('end_time', {
                                        rules: [{ type: 'object', required: false }],
                                        initialValue: this.state.data.end_time
                                    })(<DatePicker />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="部门：">
                                    {getFieldDecorator('department', {
                                        rules: [{ required: true, message: '请输入部门' }],
                                        initialValue: this.state.data.job.department
                                    })(<Input placeholder="输入员工部门" />)}
                                </Form.Item>
                                <Form.Item label="岗位：">
                                    {getFieldDecorator('position', {
                                        rules: [{ required: true, message: '请输入岗位' }],
                                        initialValue: this.state.data.job.position
                                    })(<Input placeholder="输入员工部门" />)}
                                </Form.Item>
                                <Form.Item label="在职情况：">
                                    {getFieldDecorator('situation', {
                                        rules: [{ required: true, message: '请选择在职情况!' }],
                                        initialValue: this.state.data.job.situation
                                    })(
                                        <Select placeholder="在职情况">
                                            <Option value="在职">在职</Option>
                                            <Option value="离职">离职</Option>
                                        </Select>,
                                    )}
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
            </div >
        );
    }
}
const Onboarding = Form.create()(_Onboarding);
export default Onboarding;