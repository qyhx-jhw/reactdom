import React, { Component } from 'react';
import { Layout, Menu, Icon, Result } from 'antd';
// import Check_in from './model/Check_in'
import User from './model/User'
import Payroll from './model/Payroll'
import Holiday from './model/Holiday'
import Alluser from './model/admin/Alluser'
import Inputpay from './model/admin/Inputpay'
import IMG from '../assets/images/lt.jpg'
import store from 'store'
import { observer } from 'mobx-react'
import moment from 'moment';
import userServer from '../service/user'
import {
    BrowserRouter as Router, Route,
    Redirect,
    Link
} from "react-router-dom";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

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
            a:1
        };
    }

    // componentWillMount() {
    //     userServer.getinfo(this.state.userid)
    // }

    chenge = () => {
        this.state.open ? this.setState({ open: false }) : this.setState({ open: true })

    }
    returnm = () => {
        if (this.state.a) {
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
            <Menu.Item key="7">请假审核</Menu.Item>
        </SubMenu> 
        }
    }
    render() {
        // const { open } = this.state.open
        // if (!userServer.succeed) {
        //     return <Redirect to='/login' />
        // }
        console.log('时间：', (new Date()).getDay(),moment().format('MMMM Do , h:mm:ss a'))
        if (!store.get('token')) {
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
                            <div className="logo" >
                                <img src={IMG} height='42px' alt='沙漠骆驼'></img>
                            </div>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
                                <Menu.Item key="1">

                                    <Icon type="smile" theme="outlined" />
                                    打卡签到
                                    <Link to={`/check/${this.state.open}`}></Link>

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
                                    {/* <SubMenu
                                    key="sub1"
                                    title={
                                        <span>
                                            <Icon type="database" />
                                            <span>管理信息</span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key="5">
                                        <Link to='/alluser'>所有员工信息</Link>
                                    </Menu.Item>
                                    <Menu.Item key="6">Bill</Menu.Item>
                                    <Menu.Item key="7">Alex</Menu.Item>
                                </SubMenu> */}
                                {this.returnm()}
                                
                            </Menu>

                        </Sider>
                        <Layout>
                            <Header style={{
                                // background: 'rgba(37, 122, 201, 0.2)',
                                background: '#ffff',
                                textAlign: 'center', padding: 0
                            }} >

                            </Header>

                            <Content style={{ margin: '20px 16px 0' }}>

                                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

                                {/* {this.returnm()} */}
                                    {/* {this.state.open?<Route path="/home/check/:open" component={Check_in}></Route>:''} */}
                                    {/* <Route path="/home/check/:open" component={Check_in}></Route> */}
                                    <Route  path="/user" component={User}></Route>
                                    <Route  path="/holiday" component={Holiday}></Route>
                                    <Route  path="/payroll" component={Payroll}></Route>
                                    <Route  path="/alluser" component={Alluser}></Route>
                                    <Route  path="/inputpay" component={Inputpay}></Route>
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