import React, { Component } from 'react';
import { Descriptions } from 'antd';
import Updateuser from './Updateuser'
// import url from 'url'
// import axios from 'axios' 
import userServer from '../../service/user'
import { observer } from 'mobx-react'
// import { Link, Redirect } from "react-router-dom";
// const info=userServer.getinfo(userServer.id)
// const info = userServer.info
class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            update: userServer.update,
            userid: userServer.id,
            Info: userServer.info,
            // Info: '',
            // job_info: {//职位信息
            //     start: '2019-09-01',
            //     end: '',
            //     pay: '8000',
            //     department: '研发部',
            //     position: '网络维护',
            //     Introduction: '在职'
            // }

        };
        this.setState({
            Info: userServer.info
        })
    }
    // componentDidUpdate() {
    //      userServer.getinfo(this.state.userid)
        
    // }
    componentWillMount() {
        this.setState({
            Info: userServer.info
        })
    }


    render() {
        // console.log('个人信息的id', this.state.userid)
        // console.log('个人', this.state.Info)

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
                    <Descriptions.Item label="入职时间">{this.state.Info.start_time}</Descriptions.Item>
                    <Descriptions.Item label="离职时间" span={2}>{this.state.Info.end_time}</Descriptions.Item>
                    <Descriptions.Item label="所在部门">{this.state.Info.department}</Descriptions.Item>
                    <Descriptions.Item label="所在岗位" span={2}>{this.state.Info.position}</Descriptions.Item>
                    <Descriptions.Item label="在职情况" span={1}>{this.state.Info.situation}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}
export default observer(User);
// export default User;