import React, { Component } from 'react';
import { Descriptions } from 'antd';
import Updateuser from './Updateuser'
// import url from 'url'
import axios from 'axios' 
import userServer from '../../service/user'
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid:userServer.id,
            Info: {//员工信息
                phone: '',
                name: '',
                gender: '',
                birthday: '',
                IDcard: '',
                residence: '',
                email: ''
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
    componentDidMount() {
        let surl = '/api/user/info'
        const _this =this
        axios.get(surl, {
            params: {
                id:this.state.userid
            }
          })
          .then(function (response) {
              console.log('get成功', response.data);
              _this.setState({
                Info:{//员工信息
                    phone: response.data.phone,
                    name: response.data.name,
                    gender: response.data.gender,
                    birthday: response.data.birthday,
                    IDcard: response.data.IDcard,
                    residence: response.data.residence,
                    email: response.data.email
                },
              })
          })
          .catch(function (error) {
            console.log('get失败',error);
          })
        //   .finally(function () {
        //     // always executed
        //   });  


    }
    render() {
        console.log('个人信息的id',this.state.userid)
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