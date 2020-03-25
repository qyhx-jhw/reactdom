import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon } from 'antd';

const { Option } = Select;

class Userinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,//是否可见
        };
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    // handleSubmit = e => {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             console.log('Received values of form: ', values);
    //         }
    //     });
    // };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const value = {
                    ...values,
                    'birthday': values['birthday'].format('YYYY-MM-DD'),
                }
                console.log('Received values of form: ', value);

            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            rules: [{ type: 'object', required: true, message: '请选择时间!' }],
        };
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>
                    {/* <Icon type="plus" />  */}
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
                                    })(<Input placeholder="输入你的姓名" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="手机号：">
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: '请输入手机号码' }],
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
                                    })(<Input />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                {/* <Form.Item label="Type">
                                    {getFieldDecorator('type', {
                                        rules: [{ required: true, message: 'Please choose the type' }],
                                    })(
                                        <Select placeholder="Please choose the type">
                                            <Option value="private">Private</Option>
                                            <Option value="public">Public</Option>
                                        </Select>,
                                    )}
                                </Form.Item> */}
                                <Form.Item label="性别" hasFeedback>
                                    {getFieldDecorator('gender', {
                                        rules: [{ required: true, message: '请选择您的性别!' }],
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
                                {/* <Form.Item label="Approver">
                                    {getFieldDecorator('approver', {
                                        rules: [{ required: true, message: 'Please choose the approver' }],
                                    })(
                                        <Select placeholder="Please choose the approver">
                                            <Option value="jack">Jack Ma</Option>
                                            <Option value="tom">Tom Liu</Option>
                                        </Select>,
                                    )}
                                </Form.Item> */}
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

                            </Col>
                            <Col span={12}>
                                <Form.Item label="出生日期" >
                                    {getFieldDecorator('birthday', config)(<DatePicker />)}
                                </Form.Item>
                                {/* <Form.Item label="DateTime">
                                    {getFieldDecorator('dateTime', {
                                        rules: [{ required: true, message: 'Please choose the dateTime' }],
                                    })(
                                        <DatePicker.RangePicker
                                            style={{ width: '100%' }}
                                            getPopupContainer={trigger => trigger.parentNode}
                                        />,
                                    )}
                                </Form.Item> */}
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
const Updateuser = Form.create()(Userinfo);
export default Updateuser;