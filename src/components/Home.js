import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
// import Check_in from './model/Check_in'
import User from './model/User'
import Payroll from './model/Payroll'
import IMG from '../assets/images/lt.jpg'

import {
    BrowserRouter as Router, Route,
    Link
} from "react-router-dom";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    chenge = () => {
        this.state.open ? this.setState({ open: false }) : this.setState({ open: true })

    }
    render() {
        // const { open } = this.state.open
        console.log('open', this.state.open)
        return (
            <div>
                <Router>
                    <Layout>
                        <Sider
                            theme='dark'
                            collapsible='true'
                            width={256}
                            style={{ minHeight: '100vh'  }}
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
                                <img src={IMG} height='42px'></img>
                            </div>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} >
                                <Menu.Item key="1">
                                   
                                    <Icon type="smile" theme="outlined" />
                                    打卡签到
                                    <Link to={`/home/check/${this.state.open}`}></Link>
                                    
                                </Menu.Item>

                                <Menu.Item key="2" >
                                    <Icon type="user" />
                                    个人信息
                                    <Link to="/home/user"></Link>

                                </Menu.Item>

                                <Menu.Item key="3" >
                                    <Icon type="account-book" />
                                    薪资查询
                                    <Link to="/home/payroll"></Link>
                                </Menu.Item>
                                
                                <SubMenu
                                    key="sub1"
                                    title={
                                        <span>
                                            <Icon type="user" />
                                            <span>个人信息</span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key="4">
                                    <Link to='/home/Tom'>Tom</Link>
                                    </Menu.Item>
                                    <Menu.Item key="5">Bill</Menu.Item>
                                    <Menu.Item key="6">Alex</Menu.Item>
                                </SubMenu>
                            </Menu>

                        </Sider>
                        <Layout>
                            <Header style={{ background: 'rgba(37, 122, 201, 0.2)', textAlign: 'center', padding: 0 }} >
                                header
                            </Header>

                            <Content style={{ margin: '20px 16px 0' }}>
                                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

                                    {/* <h1>hello world</h1> */}

                                    {/* {this.state.open?<Route path="/home/check/:open" component={Check_in}></Route>:''} */}
                                    {/* <Route path="/home/check/:open" component={Check_in}></Route> */}
                                    <Route exact path="/home/user" component={User}></Route>
                                    <Route exact path="/home/payroll" component={Payroll}></Route>

                                    {/* {this.state.open ? <Check_in></Check_in> : ''} */}

                                </div>
                            </Content>

                            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                        </Layout>
                    </Layout>,
                    </Router>
            </div>
        );
    }
}

export default Home;