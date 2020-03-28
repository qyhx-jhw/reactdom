import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from "react-router-dom";
// var React = require('react');
import axios from 'axios' //消息处理
// import Captcha from './Captcha'
var QRCode = require('qrcode.react');//二维码


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mgs: '我是登录界面',
            ID:'TencentCaptcha'
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log('nnnnn:',values.username,values.password)
                let url='api/user/register'
                axios.post(
                    url, {
                    phone: values.username,
                    password: values.password
                  })
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            }
        });
    };

    chenge = () => {
        this.setState({
            ID:''
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div style={{ padding: '15% 35%' }}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入你的用户名!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名：手机号码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入你的密码!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                        
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="dashed"
                            // id='TencentCaptcha'
                            id={this.state.ID}
                            data-appid="2015130461"
                            data-cbfn="callback"
                            className="login-form-button"
                                >获取验证码</Button>
                        {/* <Captcha id={this.state.ID} key='2'></Captcha> */}
                      
                    </Form.Item>
                        
                    
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住账号</Checkbox>)}
                        <a className="login-form-forgot" href="1">
                            忘记密码
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>

                        {/* <a href="">现在去注册</a> */}
                        {/* <Link to="/register">现在去注册</Link> */}
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.chenge}>
                            <Link to="/register">新用户注册</Link>
                            {/* <a href='http://localhost:3000/register'>新用户注册</a> */}
                        </Button>

                    </Form.Item>
                </Form>
                
                 <QRCode value="http://192.168.1.2:3000/" />,
                
            </div>
        );
    }
}
const LoginForm = Form.create({ name: 'normal_login' })(Login);
export default LoginForm;