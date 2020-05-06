
import React, { Component } from 'react';
// import axios from 'axios' //消息处理
import {
    Form, Input, Tooltip, Icon, Result,
    // Cascader, Row,Col, Checkbox, 
    Select, Button, DatePicker,
} from 'antd';
// import Captcha from './Captcha'
import moment from 'moment';
import { observer } from 'mobx-react'
import userServer from '../service/user'
import 'moment/locale/zh-cn';
// import { Link } from 'react-router-dom';
import {
    // BrowserRouter as Router,
    // Route,
    // Redirect,
    Link
} from "react-router-dom";
// import {  Button } from 'antd';
moment.locale('zh-cn');
// import locale from 'antd/es/date-picker/locale/zh_CN';
// window.callback = function(res){
//     console.log(res)
//     // res（用户主动关闭验证码）= {ret: 2, ticket: null}
//     // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
//     if (res.ret === 0) {
//         console.log(res.ticket)
//         alert('验证成功')   // 票据
//     }
//    }
const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;


class Result1 extends Component {
    updata = () => {
        userServer.reg=false
    }
    render() {
        return (
            <Result
                status="success"
                title="信息注册成功"
                subTitle={`"注册时间：" ${moment().format('MMMM Do , h:mm:ss a')}`}
                extra={[
                    <Button type="primary" key="console">
                        <Link to='/login'>去登陆</Link>
                    </Button>,
                    <Button  type="primary" key="buy" onClick={this.updata}>
                         <Link to='/register'>重新注册</Link>
                    </Button>,
                ]}
            />)
    }
}

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],//
            msg: '我承诺不会乱用注册信息',
            ID: 'TencentCaptcha',
            statusText: ''
        };
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const value = {
                    ...values,
                    'birthday': values['birthday'].format('YYYY-MM-DD'),
                }
                console.log('Received values of form: ', value);
                let name = value.name
                let email = value.email
                let phone = value.phone
                let password = value.password
                let gender = value.gender
                let birthday = value.birthday
                let IDcard = value.IDcard
                let residence = value.residence
                userServer.register(name, email, phone, password, gender, birthday, IDcard, residence)
            }
        });

    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
        /*!!强制将任何值转换为布尔值
            判断输入表单是否有数据，true则将confirmdirty为true
        */
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            /*先判断value是否为空在判断与之前的password不同 */
            callback('您输入的两个密码不一致!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
            /*
            第一次拿到password：信息（用户输入的信息）
            validateFields获取‘confirm’字段，需要验证的字段：confim：password
            fprce:true 表示验证过表单的再次验证
            */

        }
        callback();
    };

    render() {
        if (userServer.reg) {
            return <Result1 />
        }
        const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const config = {
            rules: [{ type: 'object', required: true, message: '请选择时间!' }],
        };
        console.log('是否：：：', this.state.statusText)
        return (
            <div style={{ padding: '10% 30%' }}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form">
                    <Form.Item label="电话号码" hasFeedback>
                        {getFieldDecorator('phone', {
                            rules: [{
                                required: true,
                                message: '请输入您的电话号码!'
                            }, {
                                len: 11,
                                message: '请满足11位号码'
                            }
                            ],
                        })(<Input style={{ width: '100%' }} maxLength={11} />)}
                    </Form.Item>
                    <Form.Item label="Password/密码" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入您的密码!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="确认密码" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: '请确认您的密码!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                Name/姓名&nbsp;
                            <Tooltip title="请核对信息是否正确。">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                        hasFeedback
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入您的姓名!', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>

                    <Form.Item label="性别" hasFeedback>
                        {getFieldDecorator('gender', {
                            rules: [{ required: true, message: '请选择您的性别!' }],
                        })(
                            <Select placeholder="选择性别">
                                <Option value="男">男</Option>
                                <Option value="女">女</Option>
                            </Select>,
                        )}
                    </Form.Item>

                    <Form.Item label="出生日期" >
                        {getFieldDecorator('birthday', config)(<DatePicker />)}
                    </Form.Item>

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
                        })(<Input placeholder='末尾X需要大写' maxLength={18} />)}
                    </Form.Item>
                    <Form.Item label="常住地址" hasFeedback>
                        {getFieldDecorator('residence', {
                            rules: [{
                                required: false,
                                message: '请输入常住地址!'
                            }],
                        })(<Input style={{ width: '100%' }} />)}
                    </Form.Item>
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
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            注册
                    </Button>
                        <br></br>
                        <Link to='/login'>已有账号去登陆</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const RegistrationForm = Form.create({ name: 'register' })(observer(Register));

export default RegistrationForm;