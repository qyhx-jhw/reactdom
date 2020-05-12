import React, { Component } from 'react';
import {
    Form, Icon, Input, Button,
    // Checkbox
} from 'antd';
import { Link, Redirect } from "react-router-dom";
// var React = require('react');
// import axios from 'axios' //消息处理
// import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import userServer from '../service/userServer'
import store from 'store'
import Captcha from './Captcha'

var QRCode = require('qrcode.react');//二维码

store.addPlugin(require('store/plugins/expire'));

// class Login extends Component {
//     render() {
//         return (
//             <LoginForm service={userServer} />
//         );
//     }
// }




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mgs: '我是登录界面',
            userid: ''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
    
                let phone = values.phone
                let password = values.password
                userServer.login(phone,password)
                
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;

        if (userServer.succeed) {
            console.log('跳转成功')
            return <Redirect to='/home'/>
        }
        return (
            <div style={{ padding: '15% 35%' }}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('phone', {
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
                        <Captcha></Captcha>
                        {/* <Button
                            type="dashed"
                            id='TencentCaptcha'
                            data-appid="2015130461"
                            data-cbfn="callback"
                            className="login-form-button"
                        >获取验证码</Button> */}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                        <Link to="/register">现在去注册</Link>
                    </Form.Item>
                </Form>

                <QRCode value="http://192.168.1.6:3000/" />,

            </div>
        );
    }
}
const LoginForm = Form.create({ name: 'normal_login' })(observer(Login));
export default LoginForm;