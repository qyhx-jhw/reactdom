import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon } from 'antd';
import moment from 'moment';
import axios from 'axios' 
import userServer from '../../service/user'
const { Option } = Select;
// class Userinfo extends Component {
//     render() {
//         return (
//             <_Userinfo service={userServer} />
//         );
//     }
// }

class _Userinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,//是否可见
            data: {
                name: '',
                phone: '',
                email: '',
                gender: '',
                IDcard: '',
                birthday: '',
                residence:'',
            }
        };
    }

    
    showDrawer = () => {
        this.setState({
            visible: true,
            data: {
                name: this.props.info.name,
                phone: this.props.info.phone,
                email: this.props.info.email,
                gender: this.props.info.gender,
                IDcard: this.props.info.IDcard,
                birthday: moment(this.props.info.birthday, 'YYYY-MM-DD') ,
                residence:this.props.info.residence,
            }
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        const _this = this
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const value = {
                    ...values,
                    'birthday': values['birthday'].format('YYYY-MM-DD'),
                }
                console.log('Received values of form: ', value);
                let name=value.name
                let email= value.email
                let phone= value.phone
                let gender= value.gender
                let birthday= value.birthday
                let IDcard= value.IDcard
                let residence= value.residence
                userServer.updateuser(name,email,phone,gender,birthday,IDcard,residence)
                // this.props.service.updateuser(name,email,phone,gender,birthday,IDcard,residence)
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            rules: [{ type: 'object', required: true, message: '请选择时间!' }],
            initialValue:this.state.data.birthday
        };
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>
                    <Icon type="form" />
                    修改信息
                </Button>
                <br />
                <Drawer
                    title="修改个人信息"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="姓名：">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入姓名' }],
                                        initialValue:this.state.data.name
                                    })(<Input placeholder="输入你的姓名" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="手机号：">
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: '请输入手机号码' }],
                                        initialValue:this.state.data.phone
                                    })(
                                        <Input
                                            style={{ width: '100%' }}
                                            // addonBefore="http://"
                                            // addonAfter=".com"
                                            placeholder="请输入手机号"
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="E-mail/邮箱">
                                    {getFieldDecorator('email', {
                                        rules: [
                                            {
                                                type: 'email',
                                                message: '输入的电子邮箱格式无效!',
                                            },
                                            {
                                                required: true,
                                                message: '请输入电子邮箱!',
                                            },  
                                        ],
                                        initialValue: this.state.data.email
                                    })(<Input placeholder='邮箱地址'/>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                               
                                <Form.Item label="性别" hasFeedback>
                                    {getFieldDecorator('gender', {
                                        rules: [{ required: true, message: '请选择您的性别!' }],
                                        initialValue: this.state.data.gender
                                    })(
                                        <Select placeholder="选择性别">
                                            <Option value="man">男</Option>
                                            <Option value="woman">女</Option>
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label='身份证号码' hasFeedback>
                                    {getFieldDecorator('IDcard', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入您的身份证号码!'
                                            },
                                            {
                                                len: 18,
                                                message: '请输入18位有效字符'
                                            }
                                        ],
                                        initialValue: this.state.data.IDcard
                                    })(<Input placeholder='末尾X需要大写' maxLength={18} />)}
                                </Form.Item>

                            </Col>
                            <Col span={12}>
                                <Form.Item label="出生日期" >
                                    {getFieldDecorator('birthday', config)(<DatePicker />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="常住地址：">
                                    {getFieldDecorator('residence', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入地址',
                                            },
                                        ],
                                        initialValue: this.state.data.residence
                                    })(<Input.TextArea rows={4} placeholder="请输入地址" />)}
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
const Updateuser = Form.create()(_Userinfo);
export default Updateuser;