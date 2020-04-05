
import React, { Component } from 'react';
import axios from 'axios' //消息处理
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker,
} from 'antd';
import Captcha from './Captcha'
import moment from 'moment';
import 'moment/locale/zh-cn';
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


class Register extends Component {
    constructor(props) {
        super(props);
        // this.state = {};

        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],//
            msg: '我承诺不会乱用注册信息',
            ID: 'TencentCaptcha',
            statusText:''
        };
    }


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
                let url = 'api/register'
                axios.post(
                    url, {
                    name: value.name,
                    email: value.email,
                    phone: value.phone,
                    password: value.password,
                    gender: value.gender,
                    birthday: value.birthday,
                    IDcard: value.IDcard,
                    residence: value.residence
                })
                    .then(function (response) {
                        console.log('response', response);
                        if (response.statusText==='OK') {
                            _this.setState({
                                statusText:'OK'
                            })
                        alert('注册成功')
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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

    // handleWebsiteChange = value => {
    //     let autoCompleteResult;
    //     if (!value) {
    //         autoCompleteResult = [];
    //     } else {
    //         autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    //     }
    //     this.setState({ autoCompleteResult });
    // };
    render() {
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
        // const prefixSelector = getFieldDecorator('prefix', {
        //     initialValue: '86',
        // })(
        //     <Select style={{ width: 70 }}>
        //         <Option value="86">+86</Option>
        //         <Option value="87">+87</Option>
        //     </Select>,
        // );
        const config = {
            rules: [{ type: 'object', required: true, message: '请选择时间!' }],
        };
        console.log('是否：：：',this.state.statusText)
        // const websiteOptions = autoCompleteResult.map(website => (
        //     <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        // ));
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




                    {/* <Form.Item label="DatePicker[showTime]">
                    {getFieldDecorator('date-time-picker', config)(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
                    )}
                </Form.Item> */}

                    {/* 姓名 */}
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

                    {/* <Form.Item label="常住地址">
                        {getFieldDecorator('residence', {
                            initialValue: ['宁夏', '中卫', '沙坡头'],
                            rules: [
                                { type: 'array', required: true, message: '请选择您的惯常住所!' },
                            ],
                        })(<Cascader options={residences} />)}
                    </Form.Item> */}

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
                    {/* <Form.Item label="Website">
                    {getFieldDecorator('website', {
                        rules: [{ required: true, message: 'Please input website!' }],
                    })(
                        <AutoComplete
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                            placeholder="website"
                        >
                            <Input />
                        </AutoComplete>,
                    )}
                </Form.Item> */}
                    {/* <Form.Item label="Captcha/验证码" extra="我们必须确保您正常注册.">
                        <Row gutter={8}>
                            <Col span={12}>

                                <Captcha id={this.state.ID} key='1'></Captcha>

                            </Col>
                        </Row>
                    </Form.Item> */}
                    {/* <Form.Item {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>
                                我已同意
                            <Tooltip title={this.state.msg}>
                                    
                                    <a href='111'>协议</a>
                                </Tooltip>
                            </Checkbox>,
                        )}
                    </Form.Item> */}
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            注册
                    </Button>
                    </Form.Item>

                </Form>
            </div>
        );
    }
}
const RegistrationForm = Form.create({ name: 'register' })(Register);

export default RegistrationForm;