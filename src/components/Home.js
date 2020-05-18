import React, { Component } from 'react';
import { Layout, Menu, Icon, Result } from 'antd';
// import Check_in from './model/Check_in'
import User from './model/User'
import Payroll from './model/Payroll'
import Holiday from './model/Holiday'
import Alluser from './model/admin/Alluser'
import Inputpay from './model/admin/Inputpay'
import Check from './model/Check'
import Makeholiday from './model/admin/Makeholiday'
import Attendance from './model/admin/Attendance'
// import IMG from '../assets/images/lt.jpg'
// import store from 'store'
import { observer } from 'mobx-react'
import moment from 'moment';
import userServer from '../service/userServer'
import {
    BrowserRouter as Router, Route,
    Redirect,
    Link
} from "react-router-dom";
const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

class result extends Component {
    render() {
        return (<Result
            status="success"
            title="成功登录人事管理系统"
            subTitle={`"登录时间：" ${moment().format('MMMM Do , h:mm:ss a')}`}
            extra={[
            ]}
        />)
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            userid: userServer.id,
        };
    }
    chenge = () => {
        this.state.open ? this.setState({ open: false }) : this.setState({ open: true })

    }
    returnm = () => {
        if (userServer.info.department === '人事部') {
            return <SubMenu
                key="sub1"
                title={
                    <span>
                        <Icon type="database" />
                        <span>管理信息</span>
                    </span>
                }
            >
                <Menu.Item key="5"><Link to='/alluser'>所有员工信息</Link></Menu.Item>
                <Menu.Item key="6"><Link to='/inputpay'>工资处理</Link> </Menu.Item>
                <Menu.Item key="7"><Link to='/makeholiday'>请假审核</Link> </Menu.Item>
                <Menu.Item key="8"><Link to='/attendance'>考勤查询</Link></Menu.Item>
            </SubMenu>
        }
    }

    render() {
        // if (!store.get('token')) {
        //     return <Redirect to='/login' />
        // }
        if (!userServer.succeed) {
            return <Redirect to='/login' />
        }
        return (
            <div>
                <Router>
                    <Layout>
                        <Sider
                            theme='dark'
                            collapsible='true'
                            width={256}
                            style={{ minHeight: '100vh' }}
                            breakpoint="sm"
                            collapsedWidth="0"
                            onBreakpoint={broken => {
                                console.log(broken);
                            }}
                            onCollapse={(collapsed, type) => {
                                console.log(collapsed, type);
                            }}
                        >
                            {/* <div className="logo" >
                                <img src={IMG} height='42px' alt='沙漠骆驼'></img>
                            </div> */}
                            <Menu theme="dark" mode="inline"
                                // defaultSelectedKeys={['1']}
                            >
                                <Menu.Item key="1">

                                    <Icon type="smile" theme="outlined" />
                                    打卡签到
                                    <Link to='/check'></Link>

                                </Menu.Item>

                                <Menu.Item key="2" >
                                    <Icon type="user" />
                                    个人信息
                                    <Link to='/user'></Link>

                                </Menu.Item>

                                <Menu.Item key="3" >
                                    <Icon type="account-book" />
                                    薪资查询
                                    <Link to="/payroll"></Link>
                                </Menu.Item>

                                <Menu.Item key="4" >
                                    <Icon type="account-book" />
                                    请假申请
                                    <Link to="/holiday"></Link>
                                </Menu.Item>
                                {this.returnm()}

                            </Menu>
                        </Sider>
                        <Layout>
                            <Content style={{ margin: '20px 16px 0' }}>
                                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

                                    {/* {this.returnm()} */}
                                    {/* {this.state.open?<Route path="/home/check/:open" component={Check_in}></Route>:''} */}
                                    {/* <Route path="/home/check/:open" component={Check_in}></Route> */}
                                    <Route path="/user" component={User}></Route>
                                    <Route path="/holiday" component={Holiday}></Route>
                                    <Route path="/check" component={Check}></Route>
                                    <Route path="/payroll" component={Payroll}></Route>
                                    <Route path="/alluser" component={Alluser}></Route>
                                    <Route path="/inputpay" component={Inputpay}></Route>
                                    <Route path="/makeholiday" component={Makeholiday}></Route>
                                    <Route path="/attendance" component={Attendance}></Route>
                                    <Route exact path="/" component={result}></Route>
                                    {/* {this.state.open ? <Check_in></Check_in> : ''} */}
                                </div>
                            </Content>

                            <Footer style={{ textAlign: 'center' }}>人事管理系统 ©2020 宁夏快乐西游</Footer>
                        </Layout>
                    </Layout>,
                    </Router>
            </div>
        );
    }
}

export default observer(Home);