import React, { Component } from 'react';
import { Descriptions } from 'antd';
import Updateuser from './Updateuser'
// import url from 'url'
// import axios from 'axios' 
import userServer from '../../service/user'
import { observer } from 'mobx-react'
import { Link, Redirect } from "react-router-dom";
class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            update: userServer.update,
            userid: userServer.id,
            Info: userServer.info,
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
    // componentDidMount() {
    //     // userServer.getinfo()
    //     this.setState({
    //         Info: userServer.info
    //     })
    // }

    render() {
        // console.log('个人信息的id', this.state.userid)
        // console.log('个人', this.state.Info)
        // console.log(userServer.update)
        // console.log(this.state.update)
        if (userServer.update !== this.state.update) {
            console.log(userServer.update)
            this.setState({
                update: userServer.update,
                Info: userServer.info
            })
            console.log('bbb',this.state.update)
        }
        return (
            <div>
                <Descriptions title="员工信息" layout="horizontal" bordered="true" size='small'>
                    <Descriptions.Item label="姓名：">{this.state.Info.name}</Descriptions.Item>
                    <Descriptions.Item label="性别：" >{this.state.Info.gender}</Descriptions.Item>
                    <Descriptions.Item label="手机号码：">{this.state.Info.phone}</Descriptions.Item>
                    <Descriptions.Item label="邮箱：">{this.state.Info.email}</Descriptions.Item>
                    <Descriptions.Item label="出生日期：" span={3}>{this.state.Info.birthday}</Descriptions.Item>
                    <Descriptions.Item label="身份证号：" span={3}>{this.state.Info.IDcard}</Descriptions.Item>
                    <Descriptions.Item label="常住地：" span={1}>{this.state.Info.residence}</Descriptions.Item>
                </Descriptions>
                <br />
                <Updateuser info={this.state.Info} userid={this.state.userid} />
                <br />
                {/* <Descriptions title="职位情况" layout="vertical" bordered="true" size='small'>
                    <Descriptions.Item label="入职时间">{this.state.job_info.start}</Descriptions.Item>
                    <Descriptions.Item label="离职时间" span={2}>{this.state.job_info.end}</Descriptions.Item>
                    <Descriptions.Item label="基础工资" span={1}>￥{this.state.job_info.pay}</Descriptions.Item>
                    <Descriptions.Item label="所在部门">{this.state.job_info.department}</Descriptions.Item>
                    <Descriptions.Item label="所在岗位" span={2}>{this.state.job_info.position}</Descriptions.Item>
                    <Descriptions.Item label="个人介绍" span={1}>{this.state.job_info.Introduction}
                    </Descriptions.Item>
                </Descriptions> */}

            </div>
        );
    }
}
// export default observer(User);
export default User;