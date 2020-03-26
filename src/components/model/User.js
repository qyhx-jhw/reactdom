import React, { Component } from 'react';
import { Descriptions } from 'antd';
import Updateuser from './Updateuser'
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            Info: {//员工信息
                phone: '15716619548',
                name: '蒋浩文',
                gender: '男',
                date_picker: '1997-11-17',
                IDcard: '640321199711170312',
                residence: '中卫市沙坡头区新墩东区',
                email: '419266148@qq.com'
            },
            job_info: {//职位信息
                start: '2019-6-1',
                end: '',
                pay: '8000',
                department: '研发部',
                position: 'Python开发实习生',
                Introduction: '天天开心'
            }

        };
    }
    render() {
        return (
            <div>
                <Descriptions title="员工信息" layout="horizontal" bordered="true" size='small'>
                    <Descriptions.Item label="姓名：">{this.state.Info.name}</Descriptions.Item>
                    <Descriptions.Item label="性别：" >{this.state.Info.gender}</Descriptions.Item>
                    <Descriptions.Item label="手机号码：">{this.state.Info.phone}</Descriptions.Item>
                    <Descriptions.Item label="邮箱：">{this.state.Info.email}</Descriptions.Item>
                    <Descriptions.Item label="出生日期：" span={3}>{this.state.Info.date_picker}</Descriptions.Item>
                    <Descriptions.Item label="身份证号：" span={3}>{this.state.Info.IDcard}</Descriptions.Item>
                    <Descriptions.Item label="常住地：" span={1}>{this.state.Info.residence}</Descriptions.Item>
                </Descriptions>
                <br />
                <Updateuser/>
                <br />
                <Descriptions title="职位情况" layout="vertical" bordered="true" size='small'>
                    <Descriptions.Item label="入职时间">{this.state.job_info.start}</Descriptions.Item>
                    <Descriptions.Item label="离职时间" span={2}>{this.state.job_info.end}</Descriptions.Item>
                    <Descriptions.Item label="基础工资" span={1}>￥{this.state.job_info.pay}</Descriptions.Item>
                    <Descriptions.Item label="所在部门">{this.state.job_info.department}</Descriptions.Item>
                    <Descriptions.Item label="所在岗位" span={2}>{this.state.job_info.position}</Descriptions.Item>
                    <Descriptions.Item label="个人介绍" span={1}>{this.state.job_info.Introduction}
                    </Descriptions.Item>
                </Descriptions>

            </div>
        );
    }
}
export default User;